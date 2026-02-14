/**
 * @miconvert/browser-image-compression
 * Watermark module — draws text or image watermark onto canvas
 */

export interface WatermarkOptions {
    /** Text to render as watermark */
    text?: string;

    /** URL of an image to use as watermark logo */
    imageUrl?: string;

    /** Position of the watermark on the image */
    position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center';

    /** Opacity of the watermark (0–1). Default: 0.3 */
    opacity?: number;

    /** Font size for text watermark in pixels. Default: 24 */
    fontSize?: number;

    /** Font color for text watermark. Default: '#ffffff' */
    fontColor?: string;

    /** Margin from edge in pixels. Default: 16 */
    margin?: number;
}

/**
 * Apply a watermark (text or image) onto a canvas.
 * Modifies the canvas in-place.
 */
export async function applyWatermark(
    canvas: HTMLCanvasElement,
    options: WatermarkOptions
): Promise<void> {
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Failed to get 2D canvas context for watermark');

    const {
        text,
        imageUrl,
        position = 'bottom-right',
        opacity = 0.3,
        fontSize = 24,
        fontColor = '#ffffff',
        margin = 16,
    } = options;

    // Save context state
    ctx.save();
    ctx.globalAlpha = opacity;

    if (imageUrl) {
        await drawImageWatermark(ctx, canvas, imageUrl, position, margin);
    } else if (text) {
        drawTextWatermark(ctx, canvas, text, position, margin, fontSize, fontColor);
    }

    // Restore context state
    ctx.restore();
}

/**
 * Draw an image watermark on the canvas.
 */
async function drawImageWatermark(
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    imageUrl: string,
    position: string,
    margin: number
): Promise<void> {
    const img = await loadImage(imageUrl);

    // Scale watermark to max 15% of the shorter canvas dimension
    const maxSize = Math.min(canvas.width, canvas.height) * 0.15;
    let wmWidth = img.naturalWidth;
    let wmHeight = img.naturalHeight;

    if (wmWidth > maxSize || wmHeight > maxSize) {
        const scale = maxSize / Math.max(wmWidth, wmHeight);
        wmWidth = Math.round(wmWidth * scale);
        wmHeight = Math.round(wmHeight * scale);
    }

    const { x, y } = calculatePosition(
        canvas.width, canvas.height,
        wmWidth, wmHeight,
        position, margin
    );

    ctx.drawImage(img, x, y, wmWidth, wmHeight);
}

/**
 * Draw a text watermark on the canvas.
 */
function drawTextWatermark(
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    text: string,
    position: string,
    margin: number,
    fontSize: number,
    fontColor: string
): void {
    // Scale font size proportionally to canvas
    const scaledFontSize = Math.max(12, Math.round(fontSize * (canvas.width / 1920)));
    ctx.font = `${scaledFontSize}px 'Segoe UI', Arial, sans-serif`;
    ctx.fillStyle = fontColor;

    const metrics = ctx.measureText(text);
    const textWidth = metrics.width;
    const textHeight = scaledFontSize;

    const { x, y } = calculatePosition(
        canvas.width, canvas.height,
        textWidth, textHeight,
        position, margin
    );

    // Add subtle text shadow for readability
    ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
    ctx.shadowBlur = 4;
    ctx.shadowOffsetX = 1;
    ctx.shadowOffsetY = 1;

    ctx.fillText(text, x, y + textHeight);
}

/**
 * Calculate x,y position for watermark based on position preset.
 */
function calculatePosition(
    canvasW: number, canvasH: number,
    wmW: number, wmH: number,
    position: string, margin: number
): { x: number; y: number } {
    switch (position) {
        case 'top-left':
            return { x: margin, y: margin };
        case 'top-right':
            return { x: canvasW - wmW - margin, y: margin };
        case 'bottom-left':
            return { x: margin, y: canvasH - wmH - margin };
        case 'center':
            return { x: (canvasW - wmW) / 2, y: (canvasH - wmH) / 2 };
        case 'bottom-right':
        default:
            return { x: canvasW - wmW - margin, y: canvasH - wmH - margin };
    }
}

/**
 * Load an external image by URL.
 */
function loadImage(url: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        let settled = false;

        // BUG-11: 15s timeout for watermark image
        const timer = setTimeout(() => {
            if (!settled) {
                settled = true;
                reject(new Error(
                    `Watermark image load timed out (15s): ${url}. ` +
                    `Check that the URL is accessible and CORS-enabled.`
                ));
            }
        }, 15_000);

        img.onload = () => {
            if (settled) return;
            settled = true;
            clearTimeout(timer);
            resolve(img);
        };
        img.onerror = () => {
            if (settled) return;
            settled = true;
            clearTimeout(timer);
            reject(new Error(
                `Failed to load watermark image: ${url}. ` +
                `This is often caused by CORS restrictions. ` +
                `Ensure the image server sends Access-Control-Allow-Origin headers, ` +
                `or use a same-origin URL or data URL.`
            ));
        };
        img.src = url;
    });
}
