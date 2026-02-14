/**
 * Phase 2 Tests — EXIF Orientation, Format conversion
 */
import { describe, it, expect } from 'vitest';
import { needsSwapDimensions } from '../lib/exif';

// ============================================
// EXIF ORIENTATION TESTS
// ============================================
describe('needsSwapDimensions', () => {
    it('should NOT swap for orientations 1-4', () => {
        expect(needsSwapDimensions(1)).toBe(false);
        expect(needsSwapDimensions(2)).toBe(false);
        expect(needsSwapDimensions(3)).toBe(false);
        expect(needsSwapDimensions(4)).toBe(false);
    });

    it('should swap for orientations 5-8 (90°/270° rotations)', () => {
        expect(needsSwapDimensions(5)).toBe(true);
        expect(needsSwapDimensions(6)).toBe(true);
        expect(needsSwapDimensions(7)).toBe(true);
        expect(needsSwapDimensions(8)).toBe(true);
    });
});

describe('getExifOrientation', () => {
    it('should return 1 for non-JPEG files', async () => {
        const { getExifOrientation } = await import('../lib/exif');
        const pngFile = new Blob(['PNG data'], { type: 'image/png' });
        const result = await getExifOrientation(pngFile);
        expect(result).toBe(1);
    });

    it('should return 1 for JPEG without EXIF data', async () => {
        const { getExifOrientation } = await import('../lib/exif');
        // A blob that doesn't start with JPEG SOI marker
        const fakeJpeg = new Blob(['not a real jpeg'], { type: 'image/jpeg' });
        const result = await getExifOrientation(fakeJpeg);
        expect(result).toBe(1);
    });

    it('should return 1 for valid JPEG SOI but no APP1', async () => {
        const { getExifOrientation } = await import('../lib/exif');
        // Create a minimal JPEG: SOI marker (FFD8) + EOI marker (FFD9)
        const buffer = new ArrayBuffer(4);
        const view = new DataView(buffer);
        view.setUint16(0, 0xFFD8); // SOI
        view.setUint16(2, 0xFFD9); // EOI
        const jpegBlob = new Blob([buffer], { type: 'image/jpeg' });
        const result = await getExifOrientation(jpegBlob);
        expect(result).toBe(1);
    });

    it('should parse orientation from valid EXIF data', async () => {
        const { getExifOrientation } = await import('../lib/exif');

        // Build a minimal JPEG with EXIF orientation = 6 (rotated 90° CW)
        const exifData = buildExifWithOrientation(6);
        const jpegBlob = new Blob([exifData], { type: 'image/jpeg' });
        const result = await getExifOrientation(jpegBlob);
        expect(result).toBe(6);
    });

    it('should parse orientation = 3 (180° rotated)', async () => {
        const { getExifOrientation } = await import('../lib/exif');

        const exifData = buildExifWithOrientation(3);
        const jpegBlob = new Blob([exifData], { type: 'image/jpeg' });
        const result = await getExifOrientation(jpegBlob);
        expect(result).toBe(3);
    });
});

/**
 * Helper: Build a minimal JPEG buffer with EXIF orientation tag.
 *
 * Structure:
 * [FFD8]                    - JPEG SOI
 * [FFE1] [length]           - APP1 marker
 * [Exif\0\0]                - EXIF identifier
 * [4949]                    - Little-endian byte order (II)
 * [002A]                    - TIFF magic number
 * [00000008]                - Offset to IFD0
 * [0001]                    - 1 IFD entry
 * [0112] [0003] [00000001] [orientation << 16] - Orientation tag
 * [FFD9]                    - JPEG EOI
 */
function buildExifWithOrientation(orientation: number): ArrayBuffer {
    const buffer = new ArrayBuffer(40);
    const view = new DataView(buffer);
    let offset = 0;

    // JPEG SOI
    view.setUint16(offset, 0xFFD8); offset += 2;

    // APP1 marker
    view.setUint16(offset, 0xFFE1); offset += 2;

    // APP1 length (from here to end of EXIF data)
    view.setUint16(offset, 32); offset += 2;

    // "Exif\0\0"
    view.setUint8(offset++, 0x45); // E
    view.setUint8(offset++, 0x78); // x
    view.setUint8(offset++, 0x69); // i
    view.setUint8(offset++, 0x66); // f
    view.setUint8(offset++, 0x00); // \0
    view.setUint8(offset++, 0x00); // \0

    const tiffStart = offset;

    // TIFF Header — Little-endian (II)
    view.setUint16(offset, 0x4949); offset += 2;

    // TIFF magic number (42)
    view.setUint16(offset, 0x002A, true); offset += 2;

    // Offset to IFD0 (8 bytes from TIFF start)
    view.setUint32(offset, 8, true); offset += 4;

    // IFD0: 1 entry
    view.setUint16(offset, 1, true); offset += 2;

    // IFD Entry: Orientation tag
    view.setUint16(offset, 0x0112, true); offset += 2; // Tag: Orientation
    view.setUint16(offset, 0x0003, true); offset += 2; // Type: SHORT
    view.setUint32(offset, 1, true); offset += 4;       // Count: 1
    view.setUint16(offset, orientation, true); offset += 2; // Value
    view.setUint16(offset, 0, true); offset += 2;       // Padding

    // JPEG EOI
    view.setUint16(offset, 0xFFD9);

    return buffer;
}

// ============================================
// FORMAT TESTS
// ============================================
describe('output format options', () => {
    it('should accept image/webp as fileType', async () => {
        const { SUPPORTED_TYPES } = await import('../lib/types');
        expect(SUPPORTED_TYPES).toContain('image/webp');
    });

    it('should accept image/jpeg as fileType', async () => {
        const { SUPPORTED_TYPES } = await import('../lib/types');
        expect(SUPPORTED_TYPES).toContain('image/jpeg');
    });

    it('should accept image/png as fileType', async () => {
        const { SUPPORTED_TYPES } = await import('../lib/types');
        expect(SUPPORTED_TYPES).toContain('image/png');
    });
});
