/**
 * @miconvert/browser-image-compression
 * Image resize logic — preserves aspect ratio, applies EXIF orientation fix
 */

import { fileToImage, createCanvas } from './utils';
import { getExifOrientation, applyExifOrientation, needsSwapDimensions } from './exif';

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

    return canvas;
}

/**
 * Load an image file and draw it onto a canvas,
 * optionally resizing to fit maxWidthOrHeight.
 * Automatically fixes EXIF orientation if fixOrientation is true.
 */
export async function drawImageToCanvas(
    file: Blob,
    maxWidthOrHeight?: number,
    fixOrientation: boolean = true
): Promise<ResizeResult> {
    const img = await fileToImage(file);

    // Read EXIF orientation
    const orientation = fixOrientation ? await getExifOrientation(file) : 1;
    const swapDims = needsSwapDimensions(orientation);

    // Get visual dimensions (after orientation is applied)
    let sourceWidth = img.naturalWidth;
    let sourceHeight = img.naturalHeight;

    // For 90°/270° rotations, the visual dimensions are swapped
    let visualWidth = swapDims ? sourceHeight : sourceWidth;
    let visualHeight = swapDims ? sourceWidth : sourceHeight;

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

    // Create canvas with final visual size
    const { canvas, ctx } = createCanvas(visualWidth, visualHeight);

    if (orientation !== 1) {
        // Apply EXIF orientation transform
        applyExifOrientation(ctx, visualWidth, visualHeight, orientation);
    }

    // Draw the image — the transform will fix the orientation
    // We need to draw at the source's original dimensions, scaled to fit
    const drawWidth = swapDims ? visualHeight : visualWidth;
    const drawHeight = swapDims ? visualWidth : visualHeight;
    ctx.drawImage(img, 0, 0, drawWidth, drawHeight);

    return {
        canvas,
        width: visualWidth,
        height: visualHeight,
        wasResized,
    };
}
