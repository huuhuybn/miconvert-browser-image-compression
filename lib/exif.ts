/**
 * @miconvert/browser-image-compression
 * EXIF Orientation parser — reads orientation tag from JPEG EXIF data
 * and applies correct canvas transform.
 *
 * EXIF Orientation values:
 *   1 = Normal
 *   2 = Flipped horizontally
 *   3 = Rotated 180°
 *   4 = Flipped vertically
 *   5 = Rotated 90° CW + flipped horizontally
 *   6 = Rotated 90° CW
 *   7 = Rotated 90° CCW + flipped horizontally
 *   8 = Rotated 90° CCW
 */

/**
 * Read the EXIF orientation tag from a JPEG file.
 * Returns 1 (normal) if no EXIF data found or not JPEG.
 *
 * Only reads the first 64KB to find EXIF data — very fast.
 */
export async function getExifOrientation(file: Blob): Promise<number> {
    // Only JPEG has EXIF orientation issues
    if (file.type && file.type !== 'image/jpeg') {
        return 1;
    }

    try {
        // Read first 64KB — EXIF header is always near the start
        const slice = file.slice(0, 65536);
        const buffer = await readBlobAsArrayBuffer(slice);
        return parseExifOrientation(buffer);
    } catch {
        return 1;
    }
}

/**
 * Read a Blob as ArrayBuffer.
 */
function readBlobAsArrayBuffer(blob: Blob): Promise<ArrayBuffer> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as ArrayBuffer);
        reader.onerror = () => reject(reader.error);
        reader.readAsArrayBuffer(blob);
    });
}

/**
 * Parse EXIF orientation from raw ArrayBuffer.
 * Follows JPEG/EXIF spec: find APP1 marker → TIFF header → IFD0 → tag 0x0112.
 */
function parseExifOrientation(buffer: ArrayBuffer): number {
    const view = new DataView(buffer);

    // Check for JPEG SOI marker (0xFFD8)
    if (view.byteLength < 2 || view.getUint16(0) !== 0xFFD8) {
        return 1;
    }

    let offset = 2;
    const length = view.byteLength;

    while (offset < length - 1) {
        // Each marker starts with 0xFF
        if (view.getUint8(offset) !== 0xFF) {
            return 1;
        }

        const marker = view.getUint8(offset + 1);

        // APP1 marker (0xE1) contains EXIF data
        if (marker === 0xE1) {
            return parseApp1(view, offset + 2);
        }

        // Skip over other markers
        if (marker === 0xD8 || marker === 0xD9) {
            // SOI or EOI — no length field
            offset += 2;
        } else {
            // Other markers have a 2-byte length field
            if (offset + 3 >= length) return 1;
            const segLength = view.getUint16(offset + 2);
            offset += 2 + segLength;
        }
    }

    return 1;
}

/**
 * Parse APP1 segment to find EXIF orientation.
 */
function parseApp1(view: DataView, offset: number): number {
    if (offset + 2 >= view.byteLength) return 1;

    // const segLength = view.getUint16(offset);
    offset += 2;

    // Check for "Exif\0\0" identifier (6 bytes)
    if (offset + 6 >= view.byteLength) return 1;

    const exifId =
        String.fromCharCode(view.getUint8(offset)) +
        String.fromCharCode(view.getUint8(offset + 1)) +
        String.fromCharCode(view.getUint8(offset + 2)) +
        String.fromCharCode(view.getUint8(offset + 3));

    if (exifId !== 'Exif') return 1;

    // Skip "Exif\0\0"
    offset += 6;

    // TIFF header starts here
    const tiffStart = offset;

    // Byte order: 0x4949 = little-endian, 0x4D4D = big-endian
    if (offset + 2 >= view.byteLength) return 1;
    const byteOrder = view.getUint16(offset);
    const littleEndian = byteOrder === 0x4949;

    // TIFF magic number (42)
    if (offset + 4 >= view.byteLength) return 1;
    const magic = view.getUint16(offset + 2, littleEndian);
    if (magic !== 0x002A) return 1;

    // Offset to first IFD
    if (offset + 8 >= view.byteLength) return 1;
    const ifdOffset = view.getUint32(offset + 4, littleEndian);
    offset = tiffStart + ifdOffset;

    // Parse IFD0
    if (offset + 2 >= view.byteLength) return 1;
    const numEntries = view.getUint16(offset, littleEndian);
    offset += 2;

    for (let i = 0; i < numEntries; i++) {
        if (offset + 12 > view.byteLength) return 1;

        const tag = view.getUint16(offset, littleEndian);

        // Tag 0x0112 = Orientation
        if (tag === 0x0112) {
            const value = view.getUint16(offset + 8, littleEndian);
            return value >= 1 && value <= 8 ? value : 1;
        }

        offset += 12; // Each IFD entry is 12 bytes
    }

    return 1;
}

/**
 * Apply EXIF orientation transform to a canvas context.
 * Must be called BEFORE drawing the image.
 *
 * @param ctx - Canvas 2D rendering context
 * @param width - Original image width
 * @param height - Original image height
 * @param orientation - EXIF orientation value (1-8)
 */
export function applyExifOrientation(
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number,
    orientation: number
): void {
    switch (orientation) {
        case 2:
            // Flip horizontal
            ctx.transform(-1, 0, 0, 1, width, 0);
            break;
        case 3:
            // Rotate 180°
            ctx.transform(-1, 0, 0, -1, width, height);
            break;
        case 4:
            // Flip vertical
            ctx.transform(1, 0, 0, -1, 0, height);
            break;
        case 5:
            // Rotate 90° CW + flip horizontal
            ctx.transform(0, 1, 1, 0, 0, 0);
            break;
        case 6:
            // Rotate 90° CW
            ctx.transform(0, 1, -1, 0, height, 0);
            break;
        case 7:
            // Rotate 90° CCW + flip horizontal
            ctx.transform(0, -1, -1, 0, height, width);
            break;
        case 8:
            // Rotate 90° CCW
            ctx.transform(0, -1, 1, 0, 0, width);
            break;
        default:
            // Orientation 1 = normal, no transform needed
            break;
    }
}

/**
 * Check if orientation requires swapping width and height.
 * Orientations 5, 6, 7, 8 involve 90° rotation → swap dimensions.
 */
export function needsSwapDimensions(orientation: number): boolean {
    return orientation >= 5 && orientation <= 8;
}
