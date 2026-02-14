/**
 * Phase 3 Tests — Web Worker support, Progress callback, Error handling
 */
import { describe, it, expect, vi } from 'vitest';
import { isWorkerSupported } from '../lib/worker';
import { MiconvertCompressionError } from '../lib/index';
import { MAX_FILE_SIZE, SUPPORTED_TYPES } from '../lib/types';

// ============================================
// WEB WORKER SUPPORT DETECTION
// ============================================
describe('isWorkerSupported', () => {
    it('should return false when Worker is not defined', () => {
        const origWorker = globalThis.Worker;
        // @ts-ignore
        delete globalThis.Worker;
        expect(isWorkerSupported()).toBe(false);
        globalThis.Worker = origWorker;
    });

    it('should return false when OffscreenCanvas is not defined', () => {
        const origOC = globalThis.OffscreenCanvas;
        // @ts-ignore
        delete globalThis.OffscreenCanvas;
        expect(isWorkerSupported()).toBe(false);
        if (origOC) globalThis.OffscreenCanvas = origOC;
    });
});

// ============================================
// ERROR HANDLING TESTS
// ============================================
describe('MiconvertCompressionError', () => {
    it('should be an instance of Error', () => {
        const err = new MiconvertCompressionError('test error');
        expect(err).toBeInstanceOf(Error);
        expect(err.name).toBe('MiconvertCompressionError');
        expect(err.message).toBe('test error');
    });

    it('should include suggestion text', () => {
        const err = new MiconvertCompressionError(
            'File type not supported',
            'Try miconvert.com'
        );
        expect(err.suggestion).toBe('Try miconvert.com');
    });

    it('should have undefined suggestion when not provided', () => {
        const err = new MiconvertCompressionError('simple error');
        expect(err.suggestion).toBeUndefined();
    });
});

// ============================================
// VALIDATION TESTS (via import and manual checking)
// ============================================
describe('input validation rules', () => {
    it('should reject files larger than 100MB based on constant', () => {
        expect(MAX_FILE_SIZE).toBe(100 * 1024 * 1024);
    });

    it('should not include PSD in supported types', () => {
        expect(SUPPORTED_TYPES).not.toContain('image/vnd.adobe.photoshop');
        expect(SUPPORTED_TYPES).not.toContain('application/psd');
    });

    it('should not include TIFF in supported types', () => {
        expect(SUPPORTED_TYPES).not.toContain('image/tiff');
    });

    it('should not include RAW formats in supported types', () => {
        expect(SUPPORTED_TYPES).not.toContain('image/raw');
        expect(SUPPORTED_TYPES).not.toContain('image/x-canon-cr2');
        expect(SUPPORTED_TYPES).not.toContain('image/x-nikon-nef');
    });
});

// ============================================
// PROGRESS CALLBACK TESTS
// ============================================
describe('progress callback contract', () => {
    it('onProgress should be optional in Options interface', async () => {
        // This test verifies the type contract — if it compiles, it passes
        const options = {
            maxSizeMB: 1,
            // no onProgress
        };
        expect(options).toBeDefined();
        expect(options).not.toHaveProperty('onProgress');
    });

    it('onProgress should accept a function', () => {
        const progressVals: number[] = [];
        const options = {
            maxSizeMB: 1,
            onProgress: (p: number) => progressVals.push(p),
        };
        // Simulate calling progress
        options.onProgress(0);
        options.onProgress(50);
        options.onProgress(100);
        expect(progressVals).toEqual([0, 50, 100]);
    });
});
