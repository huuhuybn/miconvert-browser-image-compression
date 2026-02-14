/**
 * @miconvert/browser-image-compression
 * Utility functions for canvas/blob/file operations
 */

/**
 * Load a File/Blob into an HTMLImageElement.
 */
export function fileToImage(file: Blob): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        const url = URL.createObjectURL(file);

        img.onload = () => {
            URL.revokeObjectURL(url);
            resolve(img);
        };
        img.onerror = (e) => {
            URL.revokeObjectURL(url);
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
        canvas.toBlob(
            (blob) => {
                if (blob) {
                    resolve(blob);
                } else {
                    reject(new Error('Canvas toBlob failed — output is null'));
                }
            },
            type,
            quality
        );
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

    const ext = targetType.split('/')[1] || 'jpg';
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
