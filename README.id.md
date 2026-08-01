# @miconvert/browser-image-compression

> 🖼️ Kompresi gambar pintar di browser — atur ukuran target dan library yang mengerjakan sisanya.

[![npm version](https://img.shields.io/npm/v/@miconvert/browser-image-compression.svg)](https://www.npmjs.com/package/@miconvert/browser-image-compression)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

🌍 **Bahasa lain:**
[English](./README.md) | [Tiếng Việt](./README.vi.md) | [中文](./README.zh.md) | [日本語](./README.ja.md) | [한국어](./README.ko.md) | [Español](./README.es.md) | [Português](./README.pt.md) | [Français](./README.fr.md) | [Deutsch](./README.de.md) | [Русский](./README.ru.md) | [हिन्दी](./README.hi.md) | [العربية](./README.ar.md) | [ภาษาไทย](./README.th.md) | [Türkçe](./README.tr.md) | [Italiano](./README.it.md) | [Polski](./README.pl.md) | [Nederlands](./README.nl.md) | [Bahasa Melayu](./README.ms.md) | [Українська](./README.uk.md) | [Svenska](./README.sv.md) | [বাংলা](./README.bn.md)

## Fitur

- 🎯 **Kompresi Pintar** — Atur ukuran target (misal 500KB), library otomatis mencari kualitas terbaik
- 📐 **Resize Otomatis** — Resize ke lebar/tinggi maksimal dengan mempertahankan rasio aspek
- 🔄 **Perbaikan EXIF** — Otomatis memperbaiki foto yang diputar dari iPhone/Samsung
- 🖼️ **Konversi WebP** — Konversi ke format modern untuk file lebih kecil
- ⚡ **Web Worker** — Kompresi non-blocking di background thread
- 📊 **Callback Progres** — Tampilkan progres kompresi secara real-time
- 💧 **Watermark** — Tambahkan watermark teks atau gambar
- 📝 **Output Base64** — Dapatkan Data URL untuk preview instan

## Instalasi

```bash
npm install @miconvert/browser-image-compression
```

## Mulai Cepat

```typescript
import imageCompression from '@miconvert/browser-image-compression';

const compressedFile = await imageCompression(file, {
  maxSizeMB: 1,              // Target ≤ 1MB
  maxWidthOrHeight: 1920,    // Resize jika lebih besar
  useWebWorker: true,        // Background thread
  onProgress: (p) => console.log(`${p}%`),
});
```

## Opsi API

| Opsi               | Tipe       | Default   | Deskripsi                                |
|--------------------|------------|-----------|------------------------------------------|
| `maxSizeMB`        | `number`   | —         | Ukuran file maksimal (MB)                |
| `maxWidthOrHeight` | `number`   | —         | Lebar atau tinggi maksimal (px)          |
| `initialQuality`   | `number`   | `1`       | Kualitas awal (0–1)                      |
| `fileType`         | `string`   | sama      | Tipe MIME output                         |
| `useWebWorker`     | `boolean`  | `true`    | Jalankan di Web Worker                   |
| `onProgress`       | `function` | —         | Callback progres `(%) => void`           |
| `outputType`       | `string`   | `'file'`  | `'file'` → File, `'base64'` → Data URL  |
| `exifOrientation`  | `boolean`  | `true`    | Perbaikan EXIF otomatis                  |
| `watermark`        | `object`   | —         | Konfigurasi watermark                    |

## Dukungan Browser

Chrome 64+, Firefox 62+, Safari 12+, Edge 79+

## 🆘 Dukungan & Laporan Bug

> **Jika Anda menemukan bug, masalah, atau butuh bantuan, silakan hubungi kami di:**
>
> ### 👉 [miconvert.com/en/contact](https://miconvert.com/en/contact?utm_source=npm&utm_medium=readme&utm_campaign=browser-image-compression)
>
> Kami merespons semua pertanyaan dalam 24 jam. Anda juga bisa membuat issue di [GitHub](https://github.com/huuhuybn/miconvert-browser-image-compression/issues), tetapi untuk respons tercepat, gunakan halaman kontak kami.

## Lisensi

MIT © [Miconvert](https://miconvert.com?utm_source=npm&utm_medium=readme&utm_campaign=browser-image-compression)
