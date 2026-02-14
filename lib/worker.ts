/**
 * @miconvert/browser-image-compression
 * Web Worker module — runs compression off the main thread.
 *
 * Strategy:
 * - Creates an inline worker via Blob URL (no separate file needed)
 * - Worker uses OffscreenCanvas when available
 * - Falls back to main-thread compression if Worker/OffscreenCanvas unavailable
 * - Reports progress via postMessage
 */

import { Options } from './types';

/** Message sent from main thread to worker */
export interface WorkerInput {
    id: string;
    imageData: ArrayBuffer;
    fileName: string;
    fileType: string;
    options: {
        maxSizeMB?: number;
        maxWidthOrHeight?: number;
        initialQuality?: number;
        fileType?: string;
        exifOrientation?: boolean;
    };
}

/** Message sent from worker to main thread */
export interface WorkerOutput {
    id: string;
    type: 'progress' | 'result' | 'error';
    progress?: number;
    result?: ArrayBuffer;
    resultType?: string;
    error?: string;
}

/**
 * Inline worker code as a string.
 * This code runs inside the Web Worker context.
 * It uses OffscreenCanvas for image processing.
 */
function getWorkerCode(): string {
    return `
'use strict';

// BUG-02: iOS Safe canvas pixel limit
var MAX_CANVAS_PIXELS = 16777216;

// Worker-side compression using OffscreenCanvas
self.onmessage = async function(e) {
    var data = e.data;
    var id = data.id;
    var imageData = data.imageData;
    var fileType = data.fileType;
    var options = data.options;

    try {
        // Report: started
        self.postMessage({ id: id, type: 'progress', progress: 5 });

        // Create ImageBitmap from the array buffer
        var blob = new Blob([imageData], { type: fileType });

        // BUG-03: Apply EXIF orientation via createImageBitmap options
        var bitmapOptions = {};
        if (options.exifOrientation !== false) {
            bitmapOptions.imageOrientation = 'from-image';
        }

        var bitmap;
        try {
            bitmap = await createImageBitmap(blob, bitmapOptions);
        } catch (e2) {
            // Fallback: createImageBitmap without options (older browsers)
            bitmap = await createImageBitmap(blob);
        }

        self.postMessage({ id: id, type: 'progress', progress: 15 });

        // Calculate target dimensions
        var targetWidth = bitmap.width;
        var targetHeight = bitmap.height;

        if (options.maxWidthOrHeight && options.maxWidthOrHeight > 0) {
            if (targetWidth > options.maxWidthOrHeight || targetHeight > options.maxWidthOrHeight) {
                var ratio = Math.min(
                    options.maxWidthOrHeight / targetWidth,
                    options.maxWidthOrHeight / targetHeight
                );
                targetWidth = Math.round(targetWidth * ratio);
                targetHeight = Math.round(targetHeight * ratio);
            }
        }

        // BUG-02: Enforce canvas pixel limit
        var totalPixels = targetWidth * targetHeight;
        if (totalPixels > MAX_CANVAS_PIXELS) {
            var pixelScale = Math.sqrt(MAX_CANVAS_PIXELS / totalPixels);
            targetWidth = Math.floor(targetWidth * pixelScale);
            targetHeight = Math.floor(targetHeight * pixelScale);
        }

        self.postMessage({ id: id, type: 'progress', progress: 25 });

        // Draw to OffscreenCanvas
        var canvas = new OffscreenCanvas(targetWidth, targetHeight);
        var ctx = canvas.getContext('2d');

        // Determine output type
        var outputType = options.fileType || fileType || 'image/jpeg';

        // BUG-01: Fill white background for non-transparent output formats
        var transparentTypes = ['image/png', 'image/webp', 'image/gif'];
        if (transparentTypes.indexOf(outputType) === -1) {
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, targetWidth, targetHeight);
        }

        ctx.drawImage(bitmap, 0, 0, targetWidth, targetHeight);
        bitmap.close();

        self.postMessage({ id: id, type: 'progress', progress: 35 });

        var initialQuality = options.initialQuality || 1.0;
        var maxSizeMB = options.maxSizeMB;

        // BUG-05: Check if output is lossless (quality ignored by browser)
        var losslessTypes = ['image/png', 'image/bmp', 'image/gif'];
        var isLossless = losslessTypes.indexOf(outputType) !== -1;

        if (!maxSizeMB || maxSizeMB <= 0) {
            // No size constraint — just compress at initialQuality
            var resultBlob = await canvas.convertToBlob({ type: outputType, quality: initialQuality });
            var buffer = await resultBlob.arrayBuffer();
            self.postMessage({ id: id, type: 'progress', progress: 95 });
            self.postMessage({ id: id, type: 'result', result: buffer, resultType: resultBlob.type }, [buffer]);
            return;
        }

        var targetBytes = maxSizeMB * 1024 * 1024;
        var MIN_QUALITY = 0.05;
        var MAX_ITERATIONS = 10;

        // Check if already small enough
        var resultBlob = await canvas.convertToBlob({ type: outputType, quality: initialQuality });
        if (resultBlob.size <= targetBytes) {
            var buffer = await resultBlob.arrayBuffer();
            self.postMessage({ id: id, type: 'progress', progress: 100 });
            self.postMessage({ id: id, type: 'result', result: buffer, resultType: resultBlob.type }, [buffer]);
            return;
        }

        self.postMessage({ id: id, type: 'progress', progress: 45 });

        var bestBlob = resultBlob;

        // BUG-05: Skip quality binary search for lossless formats
        if (!isLossless) {
            // Binary search for quality
            var low = MIN_QUALITY;
            var high = initialQuality;

            for (var i = 0; i < MAX_ITERATIONS; i++) {
                var mid = (low + high) / 2;
                resultBlob = await canvas.convertToBlob({ type: outputType, quality: mid });

                if (resultBlob.size <= targetBytes) {
                    bestBlob = resultBlob;
                    low = mid;
                } else {
                    high = mid;
                }

                // Progress: 45% to 75% during binary search
                var searchProgress = 45 + Math.round((i / MAX_ITERATIONS) * 30);
                self.postMessage({ id: id, type: 'progress', progress: searchProgress });

                if (resultBlob.size <= targetBytes && resultBlob.size >= targetBytes * 0.9) {
                    break;
                }
            }

            if (bestBlob.size <= targetBytes) {
                var buffer = await bestBlob.arrayBuffer();
                self.postMessage({ id: id, type: 'progress', progress: 100 });
                self.postMessage({ id: id, type: 'result', result: buffer, resultType: bestBlob.type }, [buffer]);
                return;
            }
        }

        // Fallback: scale down dimensions
        self.postMessage({ id: id, type: 'progress', progress: 80 });

        for (var i = 0; i < MAX_ITERATIONS; i++) {
            var scale = 0.8;
            var newW = Math.max(1, Math.round(canvas.width * scale));
            var newH = Math.max(1, Math.round(canvas.height * scale));
            var newCanvas = new OffscreenCanvas(newW, newH);
            var newCtx = newCanvas.getContext('2d');

            // BUG-01: Fill white for non-transparent output
            if (transparentTypes.indexOf(outputType) === -1) {
                newCtx.fillStyle = '#ffffff';
                newCtx.fillRect(0, 0, newW, newH);
            }

            newCtx.drawImage(canvas, 0, 0, newW, newH);
            canvas = newCanvas;

            var compressQuality = isLossless ? 1.0 : MIN_QUALITY;
            resultBlob = await canvas.convertToBlob({ type: outputType, quality: compressQuality });
            if (resultBlob.size <= targetBytes) {
                if (!isLossless) {
                    // Refine quality at this dimension
                    low = MIN_QUALITY;
                    high = initialQuality;
                    for (var j = 0; j < MAX_ITERATIONS; j++) {
                        var mid = (low + high) / 2;
                        var tryBlob = await canvas.convertToBlob({ type: outputType, quality: mid });
                        if (tryBlob.size <= targetBytes) {
                            bestBlob = tryBlob;
                            low = mid;
                        } else {
                            high = mid;
                        }
                    }
                } else {
                    bestBlob = resultBlob;
                }
                break;
            }

            var scaleProgress = 80 + Math.round((i / MAX_ITERATIONS) * 15);
            self.postMessage({ id: id, type: 'progress', progress: scaleProgress });
        }

        var buffer = await bestBlob.arrayBuffer();
        self.postMessage({ id: id, type: 'progress', progress: 100 });
        self.postMessage({ id: id, type: 'result', result: buffer, resultType: bestBlob.type }, [buffer]);

    } catch (err) {
        self.postMessage({ id: id, type: 'error', error: err.message || String(err) });
    }
};
`;
}

/** Cached worker instance */
let cachedWorker: Worker | null = null;
let cachedWorkerUrl: string | null = null;

/**
 * Check if Web Worker with OffscreenCanvas is supported.
 */
export function isWorkerSupported(): boolean {
    return (
        typeof Worker !== 'undefined' &&
        typeof OffscreenCanvas !== 'undefined'
    );
}

/**
 * Get or create a reusable Worker instance.
 */
function getWorker(): Worker {
    if (cachedWorker) return cachedWorker;

    const code = getWorkerCode();
    const blob = new Blob([code], { type: 'application/javascript' });
    cachedWorkerUrl = URL.createObjectURL(blob);
    cachedWorker = new Worker(cachedWorkerUrl);

    return cachedWorker;
}

/**
 * Terminate the cached worker and clean up.
 */
export function terminateWorker(): void {
    if (cachedWorker) {
        cachedWorker.terminate();
        cachedWorker = null;
    }
    if (cachedWorkerUrl) {
        URL.revokeObjectURL(cachedWorkerUrl);
        cachedWorkerUrl = null;
    }
}

/** Counter for unique message IDs */
let messageIdCounter = 0;

/**
 * Run image compression in a Web Worker.
 *
 * @returns Compressed image as a Blob
 */
export async function compressInWorker(
    file: File,
    options: Options
): Promise<Blob> {
    const worker = getWorker();
    const id = `compress_${++messageIdCounter}_${Date.now()}`;

    // Read file as ArrayBuffer to transfer to worker
    const arrayBuffer = await file.arrayBuffer();

    return new Promise<Blob>((resolve, reject) => {
        // BUG-07: Support AbortSignal in worker compression
        if (options.signal?.aborted) {
            reject(new DOMException('Compression aborted by user.', 'AbortError'));
            return;
        }

        const onAbort = () => {
            worker.removeEventListener('message', onMessage);
            worker.removeEventListener('error', onError);
            reject(new DOMException('Compression aborted by user.', 'AbortError'));
        };

        if (options.signal) {
            options.signal.addEventListener('abort', onAbort, { once: true });
        }

        const onMessage = (e: MessageEvent<WorkerOutput>) => {
            if (e.data.id !== id) return;

            switch (e.data.type) {
                case 'progress':
                    if (options.onProgress && e.data.progress !== undefined) {
                        options.onProgress(e.data.progress);
                    }
                    break;

                case 'result':
                    worker.removeEventListener('message', onMessage);
                    worker.removeEventListener('error', onError);
                    if (options.signal) options.signal.removeEventListener('abort', onAbort);
                    if (e.data.result) {
                        const resultBlob = new Blob([e.data.result], {
                            type: e.data.resultType || 'image/jpeg',
                        });
                        resolve(resultBlob);
                    } else {
                        reject(new Error('Worker returned empty result'));
                    }
                    break;

                case 'error':
                    worker.removeEventListener('message', onMessage);
                    worker.removeEventListener('error', onError);
                    if (options.signal) options.signal.removeEventListener('abort', onAbort);
                    reject(new Error(e.data.error || 'Worker compression failed'));
                    break;
            }
        };

        const onError = (e: ErrorEvent) => {
            worker.removeEventListener('message', onMessage);
            worker.removeEventListener('error', onError);
            if (options.signal) options.signal.removeEventListener('abort', onAbort);
            reject(new Error(`Worker error: ${e.message}`));
        };

        worker.addEventListener('message', onMessage);
        worker.addEventListener('error', onError);

        // Transfer the ArrayBuffer to the worker (zero-copy)
        const input: WorkerInput = {
            id,
            imageData: arrayBuffer,
            fileName: file.name,
            fileType: file.type || 'image/jpeg',
            options: {
                maxSizeMB: options.maxSizeMB,
                maxWidthOrHeight: options.maxWidthOrHeight,
                initialQuality: options.initialQuality,
                fileType: options.fileType,
                exifOrientation: options.exifOrientation,
            },
        };

        worker.postMessage(input, [arrayBuffer]);
    });
}
