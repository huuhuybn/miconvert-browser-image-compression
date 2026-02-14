/**
 * @miconvert/browser-image-compression
 * Core compression engine — quality-based & smart binary-search compress
 */

import { Options, MAX_ITERATIONS, MIN_QUALITY } from './types';
import { canvasToBlob, fileSizeMB } from './utils';
import { drawImageToCanvas, scaleCanvas } from './resize';

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
 * Smart compress: uses binary search to find the highest quality
 * that produces output ≤ maxSizeMB.
 *
 * Strategy:
 * 1. Draw image to canvas (with optional resize via maxWidthOrHeight)
 * 2. Binary search quality 1.0 → MIN_QUALITY
 * 3. If still too large after quality floor, scale down dimensions and retry
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
    } = options;

    // Determine output MIME type
    const outputType = fileType || file.type || 'image/jpeg';

    // Step 1: Draw to canvas (resize if maxWidthOrHeight set, fix EXIF orientation)
    let { canvas } = await drawImageToCanvas(file, maxWidthOrHeight, exifOrientation);

    // If no maxSizeMB constraint, just compress at initialQuality
    if (!maxSizeMB || maxSizeMB <= 0) {
        return compressCanvasToBlob(canvas, outputType, initialQuality);
    }

    const targetBytes = maxSizeMB * 1024 * 1024;

    // First, check if uncompressed at initial quality already meets target
    let blob = await compressCanvasToBlob(canvas, outputType, initialQuality);

    if (blob.size <= targetBytes) {
        return blob;
    }

    // Step 2: Binary search for optimal quality
    let low = MIN_QUALITY;
    let high = initialQuality;
    let bestBlob = blob;

    for (let i = 0; i < MAX_ITERATIONS; i++) {
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

        // If we're close enough (within 5% of target), stop early
        if (
            blob.size <= targetBytes &&
            blob.size >= targetBytes * 0.9
        ) {
            return blob;
        }
    }

    // If binary search on quality succeeded
    if (bestBlob.size <= targetBytes) {
        return bestBlob;
    }

    // Step 3: Fallback — progressive dimension downscale
    // If quality reduction alone isn't enough, reduce dimensions
    let scale = 0.9;
    for (let i = 0; i < MAX_ITERATIONS; i++) {
        canvas = scaleCanvas(canvas, scale);
        blob = await compressCanvasToBlob(canvas, outputType, MIN_QUALITY);

        if (blob.size <= targetBytes) {
            // Found a size that works, now binary search quality at this dimension
            low = MIN_QUALITY;
            high = initialQuality;

            for (let j = 0; j < MAX_ITERATIONS; j++) {
                const mid = (low + high) / 2;
                const tryBlob = await compressCanvasToBlob(canvas, outputType, mid);

                if (tryBlob.size <= targetBytes) {
                    bestBlob = tryBlob;
                    low = mid;
                } else {
                    high = mid;
                }
            }

            return bestBlob;
        }

        // Reduce more aggressively each step
        scale = 0.8;
    }

    // Last resort: return whatever we got
    return bestBlob.size <= targetBytes ? bestBlob : blob;
}
