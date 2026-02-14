/**
 * @miconvert/browser-image-compression
 * Image resize logic — preserves aspect ratio, applies EXIF orientation fix
 */

import { fileToImage, createCanvas, fillWhiteBackground, supportsTransparency, releaseCanvas } from './utils';
import { getExifOrientation, applyExifOrientation, needsSwapDimensions } from './exif';
import { MAX_CANVAS_PIXELS } from './types';

export interface ResizeResult {
    canvas: HTMLCanvasElement;
    width: number;
    height: number;
    wasResized: boolean;
}

/**
 * Calculate new dimensions that fit within maxWidthOrHeight
 * while preserving aspect ratio.
 */
export function calculateResizedDimensions(
    originalWidth: number,
    originalHeight: number,
    maxWidthOrHeight: number
): { width: number; height: number; resized: boolean } {
    if (
        originalWidth <= maxWidthOrHeight &&
        originalHeight <= maxWidthOrHeight
    ) {
        return { width: originalWidth, height: originalHeight, resized: false };
    }

    const ratio = Math.min(
        maxWidthOrHeight / originalWidth,
        maxWidthOrHeight / originalHeight
    );

    return {
        width: Math.round(originalWidth * ratio),
        height: Math.round(originalHeight * ratio),
        resized: true,
    };
}

/**
 * BUG-02: Enforce canvas pixel limit to prevent iOS Safari black/blank images.
 * If width*height exceeds MAX_CANVAS_PIXELS, scale down proportionally.
 */
export function enforceCanvasPixelLimit(
    width: number,
    height: number
): { width: number; height: number; wasLimited: boolean } {
    const pixels = width * height;
    if (pixels <= MAX_CANVAS_PIXELS) {
        return { width, height, wasLimited: false };
    }

    const scale = Math.sqrt(MAX_CANVAS_PIXELS / pixels);
    return {
        width: Math.floor(width * scale),
        height: Math.floor(height * scale),
        wasLimited: true,
    };
}

/**
 * Resize an image by a scale factor (0-1).
 * Used for progressive downscaling in smart compress.
 */
export function scaleCanvas(
    sourceCanvas: HTMLCanvasElement,
    scale: number
): HTMLCanvasElement {
    const newWidth = Math.max(1, Math.round(sourceCanvas.width * scale));
    const newHeight = Math.max(1, Math.round(sourceCanvas.height * scale));

    const { canvas, ctx } = createCanvas(newWidth, newHeight);
    ctx.drawImage(sourceCanvas, 0, 0, newWidth, newHeight);

    // BUG-12: Release old canvas to free GPU/memory
    releaseCanvas(sourceCanvas);

    return canvas;
}

/**
 * Load an image file and draw it onto a canvas,
 * optionally resizing to fit maxWidthOrHeight.
 * Automatically fixes EXIF orientation if fixOrientation is true.
 *
 * @param outputType - Target MIME type; used to determine if white fill is needed
 */
export async function drawImageToCanvas(
    file: Blob,
    maxWidthOrHeight?: number,
    fixOrientation: boolean = true,
    outputType?: string,
): Promise<ResizeResult> {
    const img = await fileToImage(file);

    // Read EXIF orientation
    const orientation = fixOrientation ? await getExifOrientation(file) : 1;
    const swapDims = needsSwapDimensions(orientation);

    // Get visual dimensions (after orientation is applied)
    let sourceWidth = img.naturalWidth;
    let sourceHeight = img.naturalHeight;

    // BUG-04: Detect if the browser already auto-applied EXIF orientation.
    // Modern browsers (Chrome 81+, Safari 13.4+, Firefox 77+) auto-apply EXIF.
    // If orientation says swap but image already looks swapped, skip manual transform.
    let effectiveOrientation = orientation;
    if (orientation !== 1 && swapDims) {
        // For 90°/270° rotations: if naturalWidth > naturalHeight for a portrait EXIF,
        // the browser has NOT applied EXIF. If naturalHeight > naturalWidth, it HAS.
        // We detect by checking if image dimensions already match the expected orientation.
        // A simple heuristic: try to draw a test image with createImageBitmap and check.
        // Safer approach: assume modern browsers auto-apply, and check via a feature detect.
        if (typeof createImageBitmap !== 'undefined') {
            try {
                const testBitmap = await createImageBitmap(file, {
                    imageOrientation: 'none',
                } as ImageBitmapOptions);
                // If loading with 'none' gives different dimensions from img.natural*,
                // the browser auto-applied orientation
                if (
                    testBitmap.width !== img.naturalWidth ||
                    testBitmap.height !== img.naturalHeight
                ) {
                    // Browser auto-applied EXIF — skip manual transform
                    effectiveOrientation = 1;
                }
                testBitmap.close();
            } catch {
                // createImageBitmap with options not supported — proceed with manual fix
            }
        }
    }

    const effectiveSwap = needsSwapDimensions(effectiveOrientation);

    // For 90°/270° rotations, the visual dimensions are swapped
    let visualWidth = effectiveSwap ? sourceHeight : sourceWidth;
    let visualHeight = effectiveSwap ? sourceWidth : sourceHeight;

    let wasResized = false;

    // Apply maxWidthOrHeight constraint on visual dimensions
    if (maxWidthOrHeight && maxWidthOrHeight > 0) {
        const dims = calculateResizedDimensions(
            visualWidth,
            visualHeight,
            maxWidthOrHeight
        );
        visualWidth = dims.width;
        visualHeight = dims.height;
        wasResized = dims.resized;
    }

    // BUG-02: Enforce canvas pixel limit for iOS Safari
    const limited = enforceCanvasPixelLimit(visualWidth, visualHeight);
    if (limited.wasLimited) {
        visualWidth = limited.width;
        visualHeight = limited.height;
        wasResized = true;
    }

    // Create canvas with final visual size
    const { canvas, ctx } = createCanvas(visualWidth, visualHeight);

    // BUG-01: Fill white background when converting to non-transparent format
    const inputType = file.type || '';
    const effectiveOutputType = outputType || inputType || 'image/jpeg';
    if (!supportsTransparency(effectiveOutputType)) {
        fillWhiteBackground(ctx, visualWidth, visualHeight);
    }

    if (effectiveOrientation !== 1) {
        // Apply EXIF orientation transform
        applyExifOrientation(ctx, visualWidth, visualHeight, effectiveOrientation);
    }

    // Draw the image — the transform will fix the orientation
    // We need to draw at the source's original dimensions, scaled to fit
    const drawWidth = effectiveSwap ? visualHeight : visualWidth;
    const drawHeight = effectiveSwap ? visualWidth : visualHeight;
    ctx.drawImage(img, 0, 0, drawWidth, drawHeight);

    return {
        canvas,
        width: visualWidth,
        height: visualHeight,
        wasResized,
    };
}
