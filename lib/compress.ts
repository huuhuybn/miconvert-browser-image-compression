/**
 * @miconvert/browser-image-compression
 * Core compression engine — quality-based & smart binary-search compress
 * with progress callback support
 */

import { Options, MAX_ITERATIONS, MIN_QUALITY, LOSSLESS_TYPES } from './types';
import { canvasToBlob, releaseCanvas } from './utils';
import { drawImageToCanvas, scaleCanvas } from './resize';
import { applyWatermark } from './watermark';

/**
 * Compress a canvas to a Blob at a given quality level.
 */
export async function compressCanvasToBlob(
    canvas: HTMLCanvasElement,
    fileType: string,
    quality: number
): Promise<Blob> {
    return canvasToBlob(canvas, fileType, quality);
}

/**
 * BUG-07: Check if an AbortSignal has been aborted, throw if so.
 */
function checkAborted(signal?: AbortSignal): void {
    if (signal?.aborted) {
        throw new DOMException('Compression aborted by user.', 'AbortError');
    }
}

/**
 * Smart compress: uses binary search to find the highest quality
 * that produces output ≤ maxSizeMB.
 *
 * Strategy:
 * 1. Draw image to canvas (with optional resize via maxWidthOrHeight)
 * 1b. Apply watermark if configured
 * 2. Binary search quality 1.0 → MIN_QUALITY
 *    - BUG-05: Skip binary search for lossless formats (PNG/BMP/GIF)
 * 3. If still too large after quality floor, scale down dimensions and retry
 * 4. Reports progress via onProgress callback throughout
 * 5. BUG-07: Checks AbortSignal before each expensive step
 */
export async function smartCompress(
    file: Blob,
    options: Options
): Promise<Blob> {
    const {
        maxSizeMB,
        maxWidthOrHeight,
        initialQuality = 1.0,
        fileType,
        exifOrientation = true,
        onProgress,
        watermark,
        signal,
    } = options;

    // Helper to safely report progress
    const report = (pct: number) => {
        if (onProgress) {
            onProgress(Math.min(100, Math.max(0, Math.round(pct))));
        }
    };

    // Determine output MIME type
    const outputType = fileType || file.type || 'image/jpeg';

    // BUG-05: Check if output is a lossless format (quality param is ignored by canvas)
    const isLossless = LOSSLESS_TYPES.includes(outputType);

    checkAborted(signal);
    report(5);

    // Step 1: Draw to canvas (resize if maxWidthOrHeight set, fix EXIF orientation)
    // Pass outputType so drawImageToCanvas can fill white background if needed (BUG-01)
    let { canvas } = await drawImageToCanvas(file, maxWidthOrHeight, exifOrientation, outputType);

    // Step 1b: Apply watermark if configured
    if (watermark) {
        await applyWatermark(canvas, watermark);
    }

    checkAborted(signal);
    report(20);

    // If no maxSizeMB constraint, just compress at initialQuality
    if (!maxSizeMB || maxSizeMB <= 0) {
        const result = await compressCanvasToBlob(canvas, outputType, initialQuality);
        report(100);
        return result;
    }

    const targetBytes = maxSizeMB * 1024 * 1024;

    // First, check if uncompressed at initial quality already meets target
    let blob = await compressCanvasToBlob(canvas, outputType, initialQuality);

    report(30);

    if (blob.size <= targetBytes) {
        report(100);
        return blob;
    }

    // BUG-05: For lossless formats, skip quality binary search entirely
    // (quality parameter has no effect on PNG/BMP/GIF).
    // Jump straight to dimension downscaling.
    if (!isLossless) {
        // Step 2: Binary search for optimal quality
        let low = MIN_QUALITY;
        let high = initialQuality;
        let bestBlob = blob;

        for (let i = 0; i < MAX_ITERATIONS; i++) {
            checkAborted(signal);

            const mid = (low + high) / 2;
            blob = await compressCanvasToBlob(canvas, outputType, mid);

            if (blob.size <= targetBytes) {
                // Quality is acceptable, try to find higher quality
                bestBlob = blob;
                low = mid;
            } else {
                // Still too large, reduce quality
                high = mid;
            }

            // Progress: 30% to 70% during binary search
            report(30 + ((i + 1) / MAX_ITERATIONS) * 40);

            // If we're close enough (within 10% of target), stop early
            if (
                blob.size <= targetBytes &&
                blob.size >= targetBytes * 0.9
            ) {
                report(100);
                return blob;
            }
        }

        // If binary search on quality succeeded
        if (bestBlob.size <= targetBytes) {
            report(100);
            return bestBlob;
        }
    }

    checkAborted(signal);
    report(75);

    // Step 3: Fallback — progressive dimension downscale
    // If quality reduction alone isn't enough (or lossless), reduce dimensions
    let bestBlob = blob;
    let scale = 0.9;
    for (let i = 0; i < MAX_ITERATIONS; i++) {
        checkAborted(signal);

        // BUG-12: scaleCanvas now releases the old canvas internally
        canvas = scaleCanvas(canvas, scale);
        blob = await compressCanvasToBlob(canvas, outputType, isLossless ? 1.0 : MIN_QUALITY);

        if (blob.size <= targetBytes) {
            if (!isLossless) {
                // Found a size that works, now binary search quality at this dimension
                let low = MIN_QUALITY;
                let high = initialQuality;

                for (let j = 0; j < MAX_ITERATIONS; j++) {
                    checkAborted(signal);
                    const mid = (low + high) / 2;
                    const tryBlob = await compressCanvasToBlob(canvas, outputType, mid);

                    if (tryBlob.size <= targetBytes) {
                        bestBlob = tryBlob;
                        low = mid;
                    } else {
                        high = mid;
                    }
                }
            } else {
                bestBlob = blob;
            }

            report(100);
            return bestBlob;
        }

        // Progress: 75% to 95% during scale-down
        report(75 + ((i + 1) / MAX_ITERATIONS) * 20);

        // Reduce more aggressively each step
        scale = 0.8;
    }

    report(100);
    // Last resort: return whatever we got
    return bestBlob.size <= targetBytes ? bestBlob : blob;
}
