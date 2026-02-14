# @miconvert/browser-image-compression

> 🖼️ スマートなブラウザ側画像圧縮 — ファイルサイズを指定するだけで、ライブラリが最適な圧縮を実行します。

[![npm version](https://img.shields.io/npm/v/@miconvert/browser-image-compression.svg)](https://www.npmjs.com/package/@miconvert/browser-image-compression)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

🌍 **他の言語:**
[English](./README.md) | [Tiếng Việt](./README.vi.md) | [中文](./README.zh.md) | [日本語](./README.ja.md) | [한국어](./README.ko.md) | [Español](./README.es.md) | [Português](./README.pt.md) | [Français](./README.fr.md) | [Deutsch](./README.de.md) | [Русский](./README.ru.md) | [हिन्दी](./README.hi.md) | [العربية](./README.ar.md) | [Bahasa Indonesia](./README.id.md) | [ภาษาไทย](./README.th.md) | [Türkçe](./README.tr.md) | [Italiano](./README.it.md) | [Polski](./README.pl.md) | [Nederlands](./README.nl.md) | [Bahasa Melayu](./README.ms.md) | [Українська](./README.uk.md) | [Svenska](./README.sv.md) | [বাংলা](./README.bn.md)

## 機能

- 🎯 **スマート圧縮** — 目標サイズ（例：500KB）を設定、ライブラリが最適な品質を自動検出
- 📐 **自動リサイズ** — 最大幅/高さに合わせてアスペクト比を維持
- 🔄 **EXIF方向修正** — iPhone/Samsung写真の自動回転修正
- 🖼️ **WebP変換** — モダンフォーマットへの変換でファイルサイズ削減
- ⚡ **Web Worker** — バックグラウンドスレッドでの非ブロッキング圧縮
- 📊 **進捗コールバック** — リアルタイムの圧縮進捗表示
- 💧 **ウォーターマーク** — テキストまたは画像のウォーターマークを追加
- 📝 **Base64出力** — プレビュー用のData URL取得

## インストール

```bash
npm install @miconvert/browser-image-compression
```

## クイックスタート

```typescript
import imageCompression from '@miconvert/browser-image-compression';

const compressedFile = await imageCompression(file, {
  maxSizeMB: 1,              // 目標 ≤ 1MB
  maxWidthOrHeight: 1920,    // 超過時にリサイズ
  useWebWorker: true,        // バックグラウンド
  onProgress: (p) => console.log(`${p}%`),
});
```

## 全オプション

| オプション         | 型         | デフォルト | 説明                                     |
|--------------------|------------|-----------|------------------------------------------|
| `maxSizeMB`        | `number`   | —         | 最大ファイルサイズ（MB）                 |
| `maxWidthOrHeight` | `number`   | —         | 最大幅または高さ（px）                   |
| `initialQuality`   | `number`   | `1`       | 初期品質（0–1）                          |
| `fileType`         | `string`   | 入力と同じ| 出力MIMEタイプ                           |
| `useWebWorker`     | `boolean`  | `true`    | Web Workerで実行                         |
| `onProgress`       | `function` | —         | 進捗コールバック `(%) => void`            |
| `outputType`       | `string`   | `'file'`  | `'file'`でFile、`'base64'`でData URL返却 |
| `exifOrientation`  | `boolean`  | `true`    | EXIF方向の自動修正                       |
| `watermark`        | `object`   | —         | ウォーターマーク設定                     |

## ブラウザサポート

Chrome 64+, Firefox 62+, Safari 12+, Edge 79+

## 🆘 サポート＆バグ報告

> **バグ、問題点、またはサポートが必要な場合は、以下からお問い合わせください：**
>
> ### 👉 [miconvert.com/en/contact](https://miconvert.com/en/contact)
>
> 全てのお問い合わせに24時間以内に回答します。[GitHub](https://github.com/huuhuybn/miconvert-browser-image-compression/issues)でissueを作成することもできますが、最速の対応をご希望の場合はお問い合わせページをご利用ください。

## ライセンス

MIT © [Miconvert](https://miconvert.com)
