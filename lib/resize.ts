/**
 * @miconvert/browser-image-compression
 * Image resize logic — preserves aspect ratio
 */

import { fileToImage, createCanvas } from './utils';

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
 */
export async function drawImageToCanvas(
    file: Blob,
    maxWidthOrHeight?: number
): Promise<ResizeResult> {
    const img = await fileToImage(file);

    let targetWidth = img.naturalWidth;
    let targetHeight = img.naturalHeight;
    let wasResized = false;

    if (maxWidthOrHeight && maxWidthOrHeight > 0) {
        const dims = calculateResizedDimensions(
            img.naturalWidth,
            img.naturalHeight,
            maxWidthOrHeight
        );
        targetWidth = dims.width;
        targetHeight = dims.height;
        wasResized = dims.resized;
    }

    const { canvas, ctx } = createCanvas(targetWidth, targetHeight);
    ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

    return {
        canvas,
        width: targetWidth,
        height: targetHeight,
        wasResized,
    };
}
