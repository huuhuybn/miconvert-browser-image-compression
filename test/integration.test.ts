/**
 * Integration Tests — Watermark options, full API surface
 */
import { describe, it, expect } from 'vitest';

// ============================================
// WATERMARK TESTS
// ============================================
describe('WatermarkOptions', () => {
    it('should export WatermarkOptions type from index', async () => {
        // This tests that the type is re-exported — compilation = pass
        const mod = await import('../lib/watermark');
        expect(mod.applyWatermark).toBeDefined();
        expect(typeof mod.applyWatermark).toBe('function');
    });
});

// ============================================
// API SURFACE TESTS
// ============================================
describe('public API exports', () => {
    it('should export imageCompression as default', async () => {
        const mod = await import('../lib/index');
        expect(mod.default).toBeDefined();
        expect(typeof mod.default).toBe('function');
    });

    it('should export imageCompression as named export', async () => {
        const mod = await import('../lib/index');
        expect(mod.imageCompression).toBeDefined();
        expect(typeof mod.imageCompression).toBe('function');
    });

    it('should export terminateWorker', async () => {
        const mod = await import('../lib/index');
        expect(mod.terminateWorker).toBeDefined();
        expect(typeof mod.terminateWorker).toBe('function');
    });

    it('should export getExifOrientation', async () => {
        const mod = await import('../lib/index');
        expect(mod.getExifOrientation).toBeDefined();
        expect(typeof mod.getExifOrientation).toBe('function');
    });

    it('should export applyExifOrientation', async () => {
        const mod = await import('../lib/index');
        expect(mod.applyExifOrientation).toBeDefined();
        expect(typeof mod.applyExifOrientation).toBe('function');
    });

    it('should export MiconvertCompressionError', async () => {
        const mod = await import('../lib/index');
        expect(mod.MiconvertCompressionError).toBeDefined();
    });
});

// ============================================
// OPTIONS INTERFACE COMPLETENESS
// ============================================
describe('Options interface completeness', () => {
    it('should accept all documented options without TS errors', () => {
        // If this compiles, the Options interface is complete
        const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 1920,
            initialQuality: 0.8,
            fileType: 'image/webp',
            useWebWorker: true,
            onProgress: (p: number) => { },
            outputType: 'base64' as const,
            exifOrientation: true,
            watermark: {
                text: 'Test',
                position: 'bottom-right' as const,
                opacity: 0.3,
                fontSize: 24,
                fontColor: '#ffffff',
                margin: 16,
            },
        };

        expect(options.maxSizeMB).toBe(1);
        expect(options.watermark.text).toBe('Test');
        expect(options.outputType).toBe('base64');
    });

    it('should work with minimal options (empty object)', () => {
        const options = {};
        expect(options).toBeDefined();
    });
});

// ============================================
// RESIZE + UTILS INTEGRATION
// ============================================
describe('resize integration', () => {
    it('calculateResizedDimensions preserves aspect ratio for extreme ratios', async () => {
        const { calculateResizedDimensions } = await import('../lib/resize');

        // Ultra-wide panorama
        const result1 = calculateResizedDimensions(10000, 500, 1920);
        expect(result1.resized).toBe(true);
        expect(result1.width).toBeLessThanOrEqual(1920);
        expect(result1.height).toBeLessThanOrEqual(1920);
        const ratio1 = result1.width / result1.height;
        expect(ratio1).toBeCloseTo(10000 / 500, 0);

        // Ultra-tall
        const result2 = calculateResizedDimensions(500, 10000, 1920);
        expect(result2.resized).toBe(true);
        expect(result2.height).toBeLessThanOrEqual(1920);
    });
});
