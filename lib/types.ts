/**
 * @miconvert/browser-image-compression
 * Configuration options and type definitions
 */

import { WatermarkOptions } from './watermark';

export interface Options {
    /** Target maximum file size in MB (e.g. 0.5 = 500KB) */
    maxSizeMB?: number;

    /** Maximum width or height in pixels. Aspect ratio is preserved. */
    maxWidthOrHeight?: number;

    /** Starting quality for compression (0–1). Default: 1 */
    initialQuality?: number;

    /** Output MIME type (e.g. 'image/webp', 'image/jpeg'). Default: same as input */
    fileType?: string;

    /** Run compression in a Web Worker. Default: true */
    useWebWorker?: boolean;

    /** Progress callback. Receives percentage 0–100. */
    onProgress?: (progress: number) => void;

    /** Output type: 'file' returns File/Blob, 'base64' returns Data URL string. Default: 'file' */
    outputType?: 'file' | 'base64';

    /** Whether to auto-fix EXIF orientation (iPhone rotation fix). Default: true */
    exifOrientation?: boolean;

    /** Watermark configuration. Disabled by default. */
    watermark?: WatermarkOptions;

    /** AbortSignal to cancel compression. */
    signal?: AbortSignal;
}

/** Maximum number of binary search iterations for smart compress */
export const MAX_ITERATIONS = 10;

/** Minimum quality floor to avoid unusable output */
export const MIN_QUALITY = 0.05;

/** Maximum file size the library will attempt to process (100MB) */
export const MAX_FILE_SIZE = 100 * 1024 * 1024;

/**
 * Maximum canvas pixel count — safe limit for iOS Safari.
 * iOS limits canvas to ~16.7 million pixels; we use 16MP as a safe cap.
 */
export const MAX_CANVAS_PIXELS = 16_777_216;

/** Supported input MIME types */
export const SUPPORTED_TYPES = [
    'image/jpeg',
    'image/png',
    'image/bmp',
    'image/webp',
    'image/gif',
];

/** Lossless formats where quality parameter is ignored by canvas.toBlob */
export const LOSSLESS_TYPES = ['image/png', 'image/bmp', 'image/gif'];

/** MIME type to file extension mapping for special cases */
export const MIME_EXTENSION_MAP: Record<string, string> = {
    'image/jpeg': 'jpg',
    'image/svg+xml': 'svg',
    'image/x-icon': 'ico',
    'image/vnd.microsoft.icon': 'ico',
};
