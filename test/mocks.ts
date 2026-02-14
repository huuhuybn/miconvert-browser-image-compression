/**
 * Browser API mocks for Vitest/jsdom environment.
 * jsdom doesn't have Canvas, Image, URL.createObjectURL, etc. — we mock them.
 */

// --- Mock HTMLCanvasElement ---
export function createMockCanvas(width = 100, height = 100) {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;

    // Mock getContext
    const ctx = {
        drawImage: vi.fn(),
        transform: vi.fn(),
        save: vi.fn(),
        restore: vi.fn(),
        fillText: vi.fn(),
        measureText: vi.fn(() => ({ width: 50 })),
        globalAlpha: 1,
        font: '',
        fillStyle: '',
        shadowColor: '',
        shadowBlur: 0,
        shadowOffsetX: 0,
        shadowOffsetY: 0,
    } as unknown as CanvasRenderingContext2D;

    vi.spyOn(canvas, 'getContext').mockReturnValue(ctx);

    // Mock toBlob
    vi.spyOn(canvas, 'toBlob').mockImplementation((cb, type, quality) => {
        // Simulate blob size based on quality
        const q = typeof quality === 'number' ? quality : 0.92;
        const size = Math.round(width * height * 3 * q * 0.1); // rough estimation
        const blob = new Blob(['x'.repeat(size)], { type: type || 'image/jpeg' });
        if (cb) cb(blob);
    });

    return { canvas, ctx };
}

// --- Mock URL.createObjectURL / revokeObjectURL ---
export function mockURL() {
    const createObjectURL = vi.fn(() => 'blob:mock-url');
    const revokeObjectURL = vi.fn();
    globalThis.URL.createObjectURL = createObjectURL;
    globalThis.URL.revokeObjectURL = revokeObjectURL;
    return { createObjectURL, revokeObjectURL };
}

// --- Mock Image ---
export function mockImage(naturalWidth = 1000, naturalHeight = 800) {
    const origImage = globalThis.Image;

    class MockImage {
        naturalWidth = naturalWidth;
        naturalHeight = naturalHeight;
        src = '';
        crossOrigin = '';
        onload: (() => void) | null = null;
        onerror: ((e: unknown) => void) | null = null;

        constructor() {
            // Trigger onload asynchronously
            setTimeout(() => {
                if (this.onload) this.onload();
            }, 0);
        }
    }

    globalThis.Image = MockImage as unknown as typeof Image;

    return {
        restore: () => { globalThis.Image = origImage; },
        MockImage,
    };
}

// --- Create a mock File ---
export function createMockFile(
    sizeBytes: number = 1024 * 1024,
    type: string = 'image/jpeg',
    name: string = 'test.jpg'
): File {
    const content = 'x'.repeat(sizeBytes);
    return new File([content], name, { type });
}

// --- Mock document.createElement to return mock canvas ---
export function mockCreateElement() {
    const origCreate = document.createElement.bind(document);
    const { canvas, ctx } = createMockCanvas();

    vi.spyOn(document, 'createElement').mockImplementation((tag: string) => {
        if (tag === 'canvas') {
            return canvas;
        }
        return origCreate(tag);
    });

    return { canvas, ctx };
}
