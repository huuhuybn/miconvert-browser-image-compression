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
import { blobToFile, getOutputFileName, fileSizeMB } from './utils';

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
 * Compress an image file in the browser.
 *
 * @param file - The input image File object
 * @param options - Compression options
 * @returns Compressed File object
 *
 * @example
 * ```ts
 * import imageCompression from '@miconvert/browser-image-compression';
 *
 * const options = {
 *   maxSizeMB: 1,
 *   maxWidthOrHeight: 1920,
 * };
 *
 * const compressed = await imageCompression(file, options);
 * console.log(`${file.size} → ${compressed.size}`);
 * ```
 */
async function imageCompression(
    file: File,
    options: Options = {}
): Promise<File> {
    validateInput(file);

    try {
        const blob = await smartCompress(file, options);

        const outputName = getOutputFileName(file.name, options.fileType);
        return blobToFile(blob, outputName);
    } catch (error) {
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
export { imageCompression, Options };

// Default export for simple usage
export default imageCompression;
