/**
 * @miconvert/browser-image-compression
 * Utility functions for canvas/blob/file operations
 */

import { MIME_EXTENSION_MAP } from './types';

/**
 * Load a File/Blob into an HTMLImageElement.
 */
export function fileToImage(file: Blob): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        const url = URL.createObjectURL(file);
        let settled = false;

        const cleanup = () => {
            URL.revokeObjectURL(url);
        };

        // BUG-09: 30s timeout to prevent hanging forever
        const timer = setTimeout(() => {
            if (!settled) {
                settled = true;
                cleanup();
                reject(new Error('Image load timed out after 30 seconds.'));
            }
        }, 30_000);

        img.onload = () => {
            if (settled) return;
            settled = true;
            clearTimeout(timer);
            cleanup();
            resolve(img);
        };
        img.onerror = (e) => {
            if (settled) return;
            settled = true;
            clearTimeout(timer);
            cleanup();
            reject(new Error(`Failed to load image: ${e}`));
        };

        img.src = url;
    });
}

/**
 * Promisify canvas.toBlob().
 */
export function canvasToBlob(
    canvas: HTMLCanvasElement,
    type: string = 'image/jpeg',
    quality?: number
): Promise<Blob> {
    return new Promise((resolve, reject) => {
        try {
            canvas.toBlob(
                (blob) => {
                    if (blob) {
                        resolve(blob);
                    } else {
                        // BUG-06: More descriptive error with canvas info
                        reject(new Error(
                            `Canvas toBlob returned null (${canvas.width}×${canvas.height}, type: ${type}). ` +
                            `This may happen if the canvas is too large for this browser. ` +
                            `Try reducing maxWidthOrHeight.`
                        ));
                    }
                },
                type,
                quality
            );
        } catch (e) {
            reject(new Error(
                `Canvas toBlob threw an error (${canvas.width}×${canvas.height}): ${e}`
            ));
        }
    });
}

/**
 * Convert a Blob to a File object, preserving the original filename.
 */
export function blobToFile(blob: Blob, fileName: string): File {
    return new File([blob], fileName, {
        type: blob.type,
        lastModified: Date.now(),
    });
}

/**
 * Get file size in MB.
 */
export function fileSizeMB(file: Blob): number {
    return file.size / (1024 * 1024);
}

/**
 * Generate output filename based on original name and target type.
 */
export function getOutputFileName(
    originalName: string,
    targetType?: string
): string {
    if (!targetType) return originalName;

    // BUG-08: Use MIME extension map for special cases (jpeg→jpg, svg+xml→svg)
    const ext = MIME_EXTENSION_MAP[targetType] || targetType.split('/')[1] || 'jpg';
    const baseName = originalName.replace(/\.[^.]+$/, '');
    return `${baseName}.${ext}`;
}

/**
 * Create a canvas with the given dimensions.
 */
export function createCanvas(
    width: number,
    height: number
): { canvas: HTMLCanvasElement; ctx: CanvasRenderingContext2D } {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext('2d');
    if (!ctx) {
        throw new Error('Failed to get 2D canvas context');
    }

    return { canvas, ctx };
}

/**
 * Convert a Blob to a Base64 Data URL string.
 */
export function blobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = () => reject(new Error('Failed to convert blob to base64'));
        reader.readAsDataURL(blob);
    });
}

/**
 * BUG-12: Release a canvas to free GPU/memory resources.
 * Setting width/height to 0 signals the browser to release the backing store.
 */
export function releaseCanvas(canvas: HTMLCanvasElement): void {
    canvas.width = 0;
    canvas.height = 0;
}

/**
 * BUG-01: Fill canvas with white background.
 * Needed when converting from transparency-supporting formats (PNG, GIF, WebP)
 * to non-transparent formats (JPEG, BMP) to avoid black background.
 */
export function fillWhiteBackground(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
): void {
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);
}

/**
 * Check if a MIME type supports transparency.
 */
export function supportsTransparency(mimeType: string): boolean {
    return ['image/png', 'image/webp', 'image/gif'].includes(mimeType);
}
