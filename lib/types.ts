/**
 * @miconvert/browser-image-compression
 * Configuration options and type definitions
 */

export interface Options {
    /** Target maximum file size in MB (e.g. 0.5 = 500KB) */
    maxSizeMB?: number;

    /** Maximum width or height in pixels. Aspect ratio is preserved. */
    maxWidthOrHeight?: number;

    /** Starting quality for compression (0–1). Default: 1 */
    initialQuality?: number;

    /** Output MIME type (e.g. 'image/webp', 'image/jpeg'). Default: same as input */
    fileType?: string;

    /** Run compression in a Web Worker. Default: true (Phase 3) */
    useWebWorker?: boolean;

    /** Progress callback. Receives percentage 0–100. (Phase 3) */
    onProgress?: (progress: number) => void;
}

/** Maximum number of binary search iterations for smart compress */
export const MAX_ITERATIONS = 10;

/** Minimum quality floor to avoid unusable output */
export const MIN_QUALITY = 0.05;

/** Maximum file size the library will attempt to process (100MB) */
export const MAX_FILE_SIZE = 100 * 1024 * 1024;

/** Supported input MIME types */
export const SUPPORTED_TYPES = [
    'image/jpeg',
    'image/png',
    'image/bmp',
    'image/webp',
    'image/gif',
];
