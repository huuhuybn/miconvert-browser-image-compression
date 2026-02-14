# @miconvert/browser-image-compression

> 🖼️ Smart browser-side image compression — target a file size and let the library do the rest.

[![npm version](https://img.shields.io/npm/v/@miconvert/browser-image-compression.svg)](https://www.npmjs.com/package/@miconvert/browser-image-compression)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Features

- 🎯 **Smart Compress** — Set a target file size (e.g. 500KB), library auto-finds the best quality
- 📐 **Auto Resize** — Resize to max width/height while keeping aspect ratio
- 🔄 **EXIF Orientation Fix** — Automatically fix rotated iPhone/Samsung photos *(v0.2.0)*
- 🖼️ **WebP Conversion** — Convert to modern formats for smaller files *(v0.2.0)*
- ⚡ **Web Worker** — Non-blocking compression in background thread *(v1.0.0)*
- 📊 **Progress Callback** — Show real-time compression progress *(v1.0.0)*

## Install

```bash
npm install @miconvert/browser-image-compression
```

## Usage

```typescript
import imageCompression from '@miconvert/browser-image-compression';

const options = {
  maxSizeMB: 1,            // Target file size in MB
  maxWidthOrHeight: 1920,  // Max dimension in pixels
};

const compressedFile = await imageCompression(file, options);
```

## API

### `imageCompression(file: File, options?: Options): Promise<File>`

| Option             | Type       | Default | Description                              |
|--------------------|------------|---------|------------------------------------------|
| `maxSizeMB`        | `number`   | —       | Target max file size in MB               |
| `maxWidthOrHeight` | `number`   | —       | Max width or height in pixels            |
| `initialQuality`   | `number`   | `1`     | Starting quality (0–1)                   |
| `fileType`         | `string`   | —       | Output MIME type (`image/webp`, etc.)    |
| `useWebWorker`     | `boolean`  | `true`  | Run in Web Worker (v1.0.0)              |
| `onProgress`       | `function` | —       | Progress callback `(percent) => void`    |

## License

MIT © [Miconvert](https://miconvert.com)
