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

// Worker-side compression using OffscreenCanvas
self.onmessage = async function(e) {
    const { id, imageData, fileName, fileType, options } = e.data;

    try {
        // Report: started
        self.postMessage({ id, type: 'progress', progress: 5 });

        // Create ImageBitmap from the array buffer
        const blob = new Blob([imageData], { type: fileType });
        const bitmap = await createImageBitmap(blob);

        self.postMessage({ id, type: 'progress', progress: 15 });

        // Calculate target dimensions
        let targetWidth = bitmap.width;
        let targetHeight = bitmap.height;

        if (options.maxWidthOrHeight && options.maxWidthOrHeight > 0) {
            if (targetWidth > options.maxWidthOrHeight || targetHeight > options.maxWidthOrHeight) {
                const ratio = Math.min(
                    options.maxWidthOrHeight / targetWidth,
                    options.maxWidthOrHeight / targetHeight
                );
                targetWidth = Math.round(targetWidth * ratio);
                targetHeight = Math.round(targetHeight * ratio);
            }
        }

        self.postMessage({ id, type: 'progress', progress: 25 });

        // Draw to OffscreenCanvas
        let canvas = new OffscreenCanvas(targetWidth, targetHeight);
        let ctx = canvas.getContext('2d');
        ctx.drawImage(bitmap, 0, 0, targetWidth, targetHeight);
        bitmap.close();

        self.postMessage({ id, type: 'progress', progress: 35 });

        // Determine output type
        const outputType = options.fileType || fileType || 'image/jpeg';
        const initialQuality = options.initialQuality || 1.0;
        const maxSizeMB = options.maxSizeMB;

        if (!maxSizeMB || maxSizeMB <= 0) {
            // No size constraint — just compress at initialQuality
            const resultBlob = await canvas.convertToBlob({ type: outputType, quality: initialQuality });
            const buffer = await resultBlob.arrayBuffer();
            self.postMessage({ id, type: 'progress', progress: 95 });
            self.postMessage({ id, type: 'result', result: buffer, resultType: resultBlob.type }, [buffer]);
            return;
        }

        const targetBytes = maxSizeMB * 1024 * 1024;
        const MIN_QUALITY = 0.05;
        const MAX_ITERATIONS = 10;

        // Check if already small enough
        let resultBlob = await canvas.convertToBlob({ type: outputType, quality: initialQuality });
        if (resultBlob.size <= targetBytes) {
            const buffer = await resultBlob.arrayBuffer();
            self.postMessage({ id, type: 'progress', progress: 100 });
            self.postMessage({ id, type: 'result', result: buffer, resultType: resultBlob.type }, [buffer]);
            return;
        }

        self.postMessage({ id, type: 'progress', progress: 45 });

        // Binary search for quality
        let low = MIN_QUALITY;
        let high = initialQuality;
        let bestBlob = resultBlob;

        for (let i = 0; i < MAX_ITERATIONS; i++) {
            const mid = (low + high) / 2;
            resultBlob = await canvas.convertToBlob({ type: outputType, quality: mid });

            if (resultBlob.size <= targetBytes) {
                bestBlob = resultBlob;
                low = mid;
            } else {
                high = mid;
            }

            // Progress: 45% to 75% during binary search
            const searchProgress = 45 + Math.round((i / MAX_ITERATIONS) * 30);
            self.postMessage({ id, type: 'progress', progress: searchProgress });

            if (resultBlob.size <= targetBytes && resultBlob.size >= targetBytes * 0.9) {
                break;
            }
        }

        if (bestBlob.size <= targetBytes) {
            const buffer = await bestBlob.arrayBuffer();
            self.postMessage({ id, type: 'progress', progress: 100 });
            self.postMessage({ id, type: 'result', result: buffer, resultType: bestBlob.type }, [buffer]);
            return;
        }

        // Fallback: scale down dimensions
        self.postMessage({ id, type: 'progress', progress: 80 });

        for (let i = 0; i < MAX_ITERATIONS; i++) {
            const scale = 0.8;
            const newW = Math.max(1, Math.round(canvas.width * scale));
            const newH = Math.max(1, Math.round(canvas.height * scale));
            const newCanvas = new OffscreenCanvas(newW, newH);
            const newCtx = newCanvas.getContext('2d');
            newCtx.drawImage(canvas, 0, 0, newW, newH);
            canvas = newCanvas;

            resultBlob = await canvas.convertToBlob({ type: outputType, quality: MIN_QUALITY });
            if (resultBlob.size <= targetBytes) {
                // Refine quality at this dimension
                low = MIN_QUALITY;
                high = initialQuality;
                for (let j = 0; j < MAX_ITERATIONS; j++) {
                    const mid = (low + high) / 2;
                    const tryBlob = await canvas.convertToBlob({ type: outputType, quality: mid });
                    if (tryBlob.size <= targetBytes) {
                        bestBlob = tryBlob;
                        low = mid;
                    } else {
                        high = mid;
                    }
                }
                break;
            }

            const scaleProgress = 80 + Math.round((i / MAX_ITERATIONS) * 15);
            self.postMessage({ id, type: 'progress', progress: scaleProgress });
        }

        const buffer = await bestBlob.arrayBuffer();
        self.postMessage({ id, type: 'progress', progress: 100 });
        self.postMessage({ id, type: 'result', result: buffer, resultType: bestBlob.type }, [buffer]);

    } catch (err) {
        self.postMessage({ id, type: 'error', error: err.message || String(err) });
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
                    reject(new Error(e.data.error || 'Worker compression failed'));
                    break;
            }
        };

        const onError = (e: ErrorEvent) => {
            worker.removeEventListener('message', onMessage);
            worker.removeEventListener('error', onError);
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
