# @miconvert/browser-image-compression

> 🖼️ Smart browser-side image compression — target a file size and let the library do the rest.

[![npm version](https://img.shields.io/npm/v/@miconvert/browser-image-compression.svg)](https://www.npmjs.com/package/@miconvert/browser-image-compression)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

🌍 **README in other languages:**
[English](./README.md) | [Tiếng Việt](./README.vi.md) | [中文](./README.zh.md) | [日本語](./README.ja.md) | [한국어](./README.ko.md) | [Español](./README.es.md) | [Português](./README.pt.md) | [Français](./README.fr.md) | [Deutsch](./README.de.md) | [Русский](./README.ru.md) | [हनद](./README.hi.md) | [العربية](./README.ar.md) | [Bahasa Indonesia](./README.id.md) | [ภาษาไทย](./README.th.md) | [Türkçe](./README.tr.md) | [Italiano](./README.it.md) | [Polski](./README.pl.md) | [Nederlands](./README.nl.md) | [Bahasa Melayu](./README.ms.md) | [Українська](./README.uk.md) | [Svenska](./README.sv.md) | [বল](./README.bn.md)

## Features

- 🎯 **Smart Compress** — Set a target file size (e.g. 500KB), library auto-finds the best quality
- 📐 **Auto Resize** — Resize to max width/height while keeping aspect ratio
- 🔄 **EXIF Orientation Fix** — Automatically fix rotated iPhone/Samsung photos
- 🖼️ **WebP Conversion** — Convert to modern formats for smaller files
- ⚡ **Web Worker** — Non-blocking compression in background thread
- 📊 **Progress Callback** — Show real-time compression progress
- 💧 **Watermark** — Add text or image watermarks with position control
- 📝 **Base64 Output** — Get Data URL string for instant previews

## Install

```bash
npm install @miconvert/browser-image-compression
```

## Quick Start

```typescript
import imageCompression from '@miconvert/browser-image-compression';

const compressedFile = await imageCompression(file, {
  maxSizeMB: 1,              // Target ≤ 1MB
  maxWidthOrHeight: 1920,    // Resize if larger
  useWebWorker: true,        // Background thread
  onProgress: (p) => console.log(`${p}%`),
});
```

## Full Options

```typescript
const result = await imageCompression(file, {
  maxSizeMB: 0.5,              // Target file size in MB
  maxWidthOrHeight: 1920,      // Max width or height (px)
  initialQuality: 1,           // Starting quality (0–1)
  fileType: 'image/webp',      // Output format
  useWebWorker: true,          // Use Web Worker (default: true)
  exifOrientation: true,       // Fix EXIF rotation (default: true)
  outputType: 'base64',        // 'file' or 'base64'
  onProgress: (p) => {},       // Progress callback (0–100)
  watermark: {                 // Optional watermark
    text: '© My Brand',
    position: 'bottom-right',  // top-left | top-right | bottom-left | bottom-right | center
    opacity: 0.3,
    fontSize: 24,
    fontColor: '#ffffff',
    margin: 16,
  },
});
```

## API Reference

### `imageCompression(file, options?): Promise<File | string>`

| Option             | Type       | Default   | Description                              |
|--------------------|------------|-----------|------------------------------------------|
| `maxSizeMB`        | `number`   | —         | Target max file size in MB               |
| `maxWidthOrHeight` | `number`   | —         | Max width or height in pixels            |
| `initialQuality`   | `number`   | `1`       | Starting quality (0–1)                   |
| `fileType`         | `string`   | same      | Output MIME type (`image/webp`, etc.)    |
| `useWebWorker`     | `boolean`  | `true`    | Run in Web Worker                        |
| `onProgress`       | `function` | —         | Progress callback `(percent) => void`    |
| `outputType`       | `string`   | `'file'`  | `'file'` returns File, `'base64'` returns Data URL |
| `exifOrientation`  | `boolean`  | `true`    | Auto-fix EXIF orientation                |
| `watermark`        | `object`   | —         | Watermark config (see above)             |

### Additional Exports

```typescript
import { terminateWorker, getExifOrientation, applyExifOrientation } from '@miconvert/browser-image-compression';

// Clean up Worker when done
terminateWorker();
```

## Browser Support

Chrome 64+, Firefox 62+, Safari 12+, Edge 79+

## 🆘 Support & Bug Reports

> **If you encounter any bugs, issues, or need help, please contact us at:**
>
> ### 👉 [miconvert.com/en/contact](https://miconvert.com/en/contact?utm_source=npm&utm_medium=readme&utm_campaign=browser-image-compression)
>
> We respond to all inquiries within 24 hours. You can also open an issue on [GitHub](https://github.com/huuhuybn/miconvert-browser-image-compression/issues), but for the fastest response, please use our contact page.

## License

MIT © [Miconvert](https://miconvert.com?utm_source=npm&utm_medium=readme&utm_campaign=browser-image-compression)
