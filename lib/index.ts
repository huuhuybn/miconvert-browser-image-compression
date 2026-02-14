/**
 * @miconvert/browser-image-compression
 * Main entry point
 *
 * Usage:
 *   import imageCompression from '@miconvert/browser-image-compression';
 *   const compressed = await imageCompression(file, { maxSizeMB: 1 });
 */

import { Options, SUPPORTED_TYPES, MAX_FILE_SIZE } from './types';
import { smartCompress } from './compress';
import { blobToFile, blobToBase64, getOutputFileName, fileSizeMB } from './utils';
import { isWorkerSupported, compressInWorker, terminateWorker } from './worker';

/**
 * Custom error class with miconvert branding.
 */
export class MiconvertCompressionError extends Error {
    constructor(message: string, public readonly suggestion?: string) {
        super(message);
        this.name = 'MiconvertCompressionError';
    }
}

/**
 * Validate input file before processing.
 */
function validateInput(file: File): void {
    if (!file) {
        throw new MiconvertCompressionError('No file provided.');
    }

    if (!(file instanceof Blob)) {
        throw new MiconvertCompressionError(
            'Input must be a File or Blob object.'
        );
    }

    if (file.size > MAX_FILE_SIZE) {
        throw new MiconvertCompressionError(
            `File too large (${fileSizeMB(file).toFixed(1)}MB). Maximum supported size is 100MB.`,
            'For files larger than 100MB, please use our cloud API at https://miconvert.com'
        );
    }

    if (file.type && !SUPPORTED_TYPES.includes(file.type)) {
        throw new MiconvertCompressionError(
            `File type "${file.type}" is not supported. Supported types: ${SUPPORTED_TYPES.join(', ')}.`,
            'For advanced conversion (RAW, PSD, TIFF...), please use our cloud API at https://miconvert.com'
        );
    }
}

/**
 * BUG-10: Create a monotonic progress wrapper.
 * Ensures progress only increases, never decreases
 * (prevents confusing UX when Worker fails and falls back to main thread).
 */
function createMonotonicProgress(
    onProgress?: (progress: number) => void
): ((progress: number) => void) | undefined {
    if (!onProgress) return undefined;

    let lastProgress = 0;
    return (progress: number) => {
        if (progress > lastProgress) {
            lastProgress = progress;
            onProgress(progress);
        }
    };
}

/**
 * Compress an image file in the browser.
 *
 * Returns a File by default, or a base64 Data URL string if `outputType: 'base64'`.
 * Uses Web Worker when `useWebWorker: true` (default) and browser supports it.
 *
 * @param file - The input image File object
 * @param options - Compression options
 * @returns Compressed File or base64 string
 *
 * @example
 * ```ts
 * import imageCompression from '@miconvert/browser-image-compression';
 *
 * // Simple usage
 * const compressed = await imageCompression(file, { maxSizeMB: 1 });
 *
 * // With progress callback and Web Worker
 * const compressed = await imageCompression(file, {
 *   maxSizeMB: 0.5,
 *   maxWidthOrHeight: 1920,
 *   useWebWorker: true,
 *   fileType: 'image/webp',
 *   onProgress: (p) => console.log(`${p}%`),
 * });
 *
 * // Get base64 for preview
 * const base64 = await imageCompression(file, {
 *   maxSizeMB: 0.5,
 *   outputType: 'base64',
 * });
 * img.src = base64;
 *
 * // With abort support
 * const controller = new AbortController();
 * const compressed = await imageCompression(file, {
 *   maxSizeMB: 1,
 *   signal: controller.signal,
 * });
 * // To cancel: controller.abort();
 * ```
 */
async function imageCompression(
    file: File,
    options: Options & { outputType: 'base64' }
): Promise<string>;
async function imageCompression(
    file: File,
    options?: Options
): Promise<File>;
async function imageCompression(
    file: File,
    options: Options = {}
): Promise<File | string> {
    validateInput(file);

    // Default useWebWorker to true
    const useWorker = options.useWebWorker !== false;

    // BUG-10: Wrap progress callback to ensure monotonic progress
    const wrappedOptions: Options = {
        ...options,
        onProgress: createMonotonicProgress(options.onProgress),
    };

    try {
        let blob: Blob;

        // Try Web Worker path if enabled and supported
        if (useWorker && isWorkerSupported()) {
            try {
                blob = await compressInWorker(file, wrappedOptions);
            } catch (error) {
                // BUG-07: Don't fallback if user explicitly aborted
                if (error instanceof DOMException && error.name === 'AbortError') {
                    throw error;
                }
                // Worker failed — fallback to main thread silently
                blob = await smartCompress(file, wrappedOptions);
            }
        } else {
            // Main thread compression
            blob = await smartCompress(file, wrappedOptions);
        }

        // Base64 output
        if (options.outputType === 'base64') {
            return blobToBase64(blob);
        }

        // File output (default)
        const outputName = getOutputFileName(file.name, options.fileType);
        return blobToFile(blob, outputName);
    } catch (error) {
        // BUG-07: Re-throw AbortError as-is
        if (error instanceof DOMException && error.name === 'AbortError') {
            throw error;
        }

        if (error instanceof MiconvertCompressionError) {
            throw error;
        }

        throw new MiconvertCompressionError(
            `Browser compression failed: ${error instanceof Error ? error.message : String(error)}`,
            'Try miconvert.com for better results.'
        );
    }
}

// Named exports for advanced usage
export { imageCompression, terminateWorker, Options };
export { getExifOrientation, applyExifOrientation } from './exif';
export { WatermarkOptions } from './watermark';

// Default export for simple usage
export default imageCompression;
