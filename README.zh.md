# @miconvert/browser-image-compression

> 🖼️ 智能浏览器端图片压缩 — 设定目标文件大小，库自动完成压缩。

[![npm version](https://img.shields.io/npm/v/@miconvert/browser-image-compression.svg)](https://www.npmjs.com/package/@miconvert/browser-image-compression)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

🌍 **其他语言:**
[English](./README.md) | [Tiếng Việt](./README.vi.md) | [中文](./README.zh.md) | [日本語](./README.ja.md) | [한국어](./README.ko.md) | [Español](./README.es.md) | [Português](./README.pt.md) | [Français](./README.fr.md) | [Deutsch](./README.de.md) | [Русский](./README.ru.md) | [हिन्दी](./README.hi.md) | [العربية](./README.ar.md) | [Bahasa Indonesia](./README.id.md) | [ภาษาไทย](./README.th.md) | [Türkçe](./README.tr.md) | [Italiano](./README.it.md) | [Polski](./README.pl.md) | [Nederlands](./README.nl.md) | [Bahasa Melayu](./README.ms.md) | [Українська](./README.uk.md) | [Svenska](./README.sv.md) | [বাংলা](./README.bn.md)

## 功能特性

- 🎯 **智能压缩** — 设定目标大小（如500KB），自动寻找最优质量
- 📐 **自动缩放** — 按最大宽高缩放，保持纵横比
- 🔄 **EXIF方向修正** — 自动修复iPhone/Samsung照片旋转问题
- 🖼️ **WebP转换** — 转换为现代格式，文件更小
- ⚡ **Web Worker** — 后台线程压缩，不阻塞UI
- 📊 **进度回调** — 实时显示压缩进度
- 💧 **水印** — 添加文字或图片水印
- 📝 **Base64输出** — 获取Data URL用于即时预览

## 安装

```bash
npm install @miconvert/browser-image-compression
```

## 快速开始

```typescript
import imageCompression from '@miconvert/browser-image-compression';

const compressedFile = await imageCompression(file, {
  maxSizeMB: 1,              // 目标 ≤ 1MB
  maxWidthOrHeight: 1920,    // 超过则缩放
  useWebWorker: true,        // 后台线程
  onProgress: (p) => console.log(`${p}%`),
});
```

## 完整选项

```typescript
const result = await imageCompression(file, {
  maxSizeMB: 0.5,              // 目标文件大小（MB）
  maxWidthOrHeight: 1920,      // 最大宽度或高度（px）
  initialQuality: 1,           // 初始质量（0–1）
  fileType: 'image/webp',      // 输出格式
  useWebWorker: true,          // 使用Web Worker（默认：true）
  exifOrientation: true,       // 修正EXIF方向（默认：true）
  outputType: 'base64',        // 'file' 或 'base64'
  onProgress: (p) => {},       // 进度回调（0–100）
  watermark: {                 // 可选水印
    text: '© 品牌名称',
    position: 'bottom-right',
    opacity: 0.3,
  },
});
```

## API参考

| 选项               | 类型       | 默认值    | 说明                                     |
|--------------------|------------|-----------|------------------------------------------|
| `maxSizeMB`        | `number`   | —         | 目标最大文件大小（MB）                   |
| `maxWidthOrHeight` | `number`   | —         | 最大宽度或高度（px）                     |
| `initialQuality`   | `number`   | `1`       | 初始质量（0–1）                          |
| `fileType`         | `string`   | 同输入    | 输出MIME类型                             |
| `useWebWorker`     | `boolean`  | `true`    | 在Web Worker中运行                       |
| `onProgress`       | `function` | —         | 进度回调 `(百分比) => void`              |
| `outputType`       | `string`   | `'file'`  | `'file'`返回File，`'base64'`返回Data URL |
| `exifOrientation`  | `boolean`  | `true`    | 自动修正EXIF方向                         |
| `watermark`        | `object`   | —         | 水印配置                                 |

## 浏览器支持

Chrome 64+, Firefox 62+, Safari 12+, Edge 79+

## 🆘 技术支持与Bug反馈

> **如果您遇到任何Bug、问题或需要帮助，请通过以下方式联系我们：**
>
> ### 👉 [miconvert.com/en/contact](https://miconvert.com/en/contact?utm_source=npm&utm_medium=readme&utm_campaign=browser-image-compression)
>
> 我们会在24小时内回复所有咨询。您也可以在[GitHub](https://github.com/huuhuybn/miconvert-browser-image-compression/issues)上提交issue，但为了获得最快的响应，推荐使用我们的联系页面。

## 许可证

MIT © [Miconvert](https://miconvert.com?utm_source=npm&utm_medium=readme&utm_campaign=browser-image-compression)
