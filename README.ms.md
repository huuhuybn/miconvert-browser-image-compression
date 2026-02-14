# @miconvert/browser-image-compression

> 🖼️ Pemampatan imej pintar di pelayar — tetapkan saiz fail sasaran dan perpustakaan akan mengendalikan selebihnya.

[![npm version](https://img.shields.io/npm/v/@miconvert/browser-image-compression.svg)](https://www.npmjs.com/package/@miconvert/browser-image-compression)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

🌍 **Bahasa lain:**
[English](./README.md) | [Tiếng Việt](./README.vi.md) | [中文](./README.zh.md) | [日本語](./README.ja.md) | [한국어](./README.ko.md) | [Español](./README.es.md) | [Português](./README.pt.md) | [Français](./README.fr.md) | [Deutsch](./README.de.md) | [Русский](./README.ru.md) | [हिन्दी](./README.hi.md) | [العربية](./README.ar.md) | [Bahasa Indonesia](./README.id.md) | [ภาษาไทย](./README.th.md) | [Türkçe](./README.tr.md) | [Italiano](./README.it.md) | [Polski](./README.pl.md) | [Nederlands](./README.nl.md) | [Українська](./README.uk.md) | [Svenska](./README.sv.md) | [বাংলা](./README.bn.md)

## Ciri-ciri

- 🎯 **Pemampatan Pintar** — Tetapkan saiz sasaran (cth. 500KB), perpustakaan cari kualiti terbaik secara automatik
- 📐 **Saiz Semula Automatik** — Ubah saiz ke lebar/tinggi maksimum sambil kekalkan nisbah aspek
- 🔄 **Pembaikan EXIF** — Betulkan foto yang diputar dari iPhone/Samsung secara automatik
- 🖼️ **Penukaran WebP** — Tukar ke format moden untuk fail yang lebih kecil
- ⚡ **Web Worker** — Pemampatan tanpa sekatan dalam thread latar belakang
- 📊 **Callback Kemajuan** — Papar kemajuan pemampatan masa nyata
- 💧 **Tera Air** — Tambah tera air teks atau imej
- 📝 **Output Base64** — Dapatkan Data URL untuk pratonton segera

## Pemasangan

```bash
npm install @miconvert/browser-image-compression
```

## Mula Pantas

```typescript
import imageCompression from '@miconvert/browser-image-compression';

const compressedFile = await imageCompression(file, {
  maxSizeMB: 1,              // Sasaran ≤ 1MB
  maxWidthOrHeight: 1920,    // Ubah saiz jika lebih besar
  useWebWorker: true,        // Thread latar belakang
  onProgress: (p) => console.log(`${p}%`),
});
```

## Pilihan API

| Pilihan            | Jenis      | Lalai     | Penerangan                               |
|--------------------|------------|-----------|------------------------------------------|
| `maxSizeMB`        | `number`   | —         | Saiz fail maksimum (MB)                  |
| `maxWidthOrHeight` | `number`   | —         | Lebar atau tinggi maksimum (px)          |
| `initialQuality`   | `number`   | `1`       | Kualiti awal (0–1)                       |
| `fileType`         | `string`   | sama      | Jenis MIME output                        |
| `useWebWorker`     | `boolean`  | `true`    | Jalankan dalam Web Worker                |
| `onProgress`       | `function` | —         | Callback kemajuan `(%) => void`          |
| `outputType`       | `string`   | `'file'`  | `'file'` → File, `'base64'` → Data URL  |
| `exifOrientation`  | `boolean`  | `true`    | Pembaikan EXIF automatik                 |
| `watermark`        | `object`   | —         | Konfigurasi tera air                     |

## Sokongan Pelayar

Chrome 64+, Firefox 62+, Safari 12+, Edge 79+

## 🆘 Sokongan & Laporan Pepijat

> **Jika anda menemui pepijat, masalah atau memerlukan bantuan, sila hubungi kami di:**
>
> ### 👉 [miconvert.com/en/contact](https://miconvert.com/en/contact)
>
> Kami menjawab semua pertanyaan dalam masa 24 jam. Anda juga boleh membuat issue di [GitHub](https://github.com/huuhuybn/miconvert-browser-image-compression/issues), tetapi untuk respons terpantas, sila gunakan halaman hubungi kami.

## Lesen

MIT © [Miconvert](https://miconvert.com)
