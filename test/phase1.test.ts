/**
 * Phase 1 Tests — Resize, Compress, Smart Compress
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { calculateResizedDimensions } from '../lib/resize';
import { fileSizeMB, getOutputFileName } from '../lib/utils';

// ============================================
// RESIZE TESTS
// ============================================
describe('calculateResizedDimensions', () => {
    it('should not resize if image is smaller than limit', () => {
        const result = calculateResizedDimensions(800, 600, 1920);
        expect(result.resized).toBe(false);
        expect(result.width).toBe(800);
        expect(result.height).toBe(600);
    });

    it('should not resize if image equals limit', () => {
        const result = calculateResizedDimensions(1920, 1080, 1920);
        expect(result.resized).toBe(false);
        expect(result.width).toBe(1920);
        expect(result.height).toBe(1080);
    });

    it('should resize landscape image — width is longer', () => {
        const result = calculateResizedDimensions(4000, 3000, 1920);
        expect(result.resized).toBe(true);
        expect(result.width).toBeLessThanOrEqual(1920);
        expect(result.height).toBeLessThanOrEqual(1920);
        // Aspect ratio preserved
        const originalRatio = 4000 / 3000;
        const newRatio = result.width / result.height;
        expect(Math.abs(originalRatio - newRatio)).toBeLessThan(0.02);
    });

    it('should resize portrait image — height is longer', () => {
        const result = calculateResizedDimensions(2000, 4000, 1920);
        expect(result.resized).toBe(true);
        expect(result.height).toBeLessThanOrEqual(1920);
        expect(result.width).toBeLessThanOrEqual(1920);
    });

    it('should resize square image', () => {
        const result = calculateResizedDimensions(3000, 3000, 1920);
        expect(result.resized).toBe(true);
        expect(result.width).toBe(1920);
        expect(result.height).toBe(1920);
    });

    it('should handle very small maxWidthOrHeight', () => {
        const result = calculateResizedDimensions(1000, 500, 100);
        expect(result.resized).toBe(true);
        expect(result.width).toBeLessThanOrEqual(100);
        expect(result.height).toBeLessThanOrEqual(100);
    });
});

// ============================================
// UTILS TESTS
// ============================================
describe('fileSizeMB', () => {
    it('should convert bytes to MB', () => {
        const blob = new Blob(['x'.repeat(1024 * 1024)]);
        expect(fileSizeMB(blob)).toBeCloseTo(1, 0);
    });

    it('should handle small files', () => {
        const blob = new Blob(['hello']);
        expect(fileSizeMB(blob)).toBeLessThan(0.001);
    });

    it('should handle empty files', () => {
        const blob = new Blob([]);
        expect(fileSizeMB(blob)).toBe(0);
    });
});

describe('getOutputFileName', () => {
    it('should return original name when no targetType', () => {
        expect(getOutputFileName('photo.jpg')).toBe('photo.jpg');
    });

    it('should change extension for webp', () => {
        expect(getOutputFileName('photo.jpg', 'image/webp')).toBe('photo.webp');
    });

    it('should change extension for png', () => {
        expect(getOutputFileName('photo.jpeg', 'image/png')).toBe('photo.png');
    });

    it('should handle filenames without extension', () => {
        expect(getOutputFileName('photo', 'image/webp')).toBe('photo.webp');
    });

    it('should handle filenames with multiple dots', () => {
        expect(getOutputFileName('my.photo.original.jpg', 'image/webp')).toBe('my.photo.original.webp');
    });
});

// ============================================
// TYPES / CONSTANTS TESTS
// ============================================
describe('types and constants', () => {
    it('should have correct constants', async () => {
        const { MAX_ITERATIONS, MIN_QUALITY, MAX_FILE_SIZE, SUPPORTED_TYPES } = await import('../lib/types');
        expect(MAX_ITERATIONS).toBe(10);
        expect(MIN_QUALITY).toBe(0.05);
        expect(MAX_FILE_SIZE).toBe(100 * 1024 * 1024);
        expect(SUPPORTED_TYPES).toContain('image/jpeg');
        expect(SUPPORTED_TYPES).toContain('image/png');
        expect(SUPPORTED_TYPES).toContain('image/webp');
    });
});
