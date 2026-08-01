# @miconvert/browser-image-compression

> 🖼️ Smart bildkomprimering i webbläsaren — ange en målstorlek och låt biblioteket göra resten.

[![npm version](https://img.shields.io/npm/v/@miconvert/browser-image-compression.svg)](https://www.npmjs.com/package/@miconvert/browser-image-compression)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

🌍 **Andra språk:**
[English](./README.md) | [Tiếng Việt](./README.vi.md) | [中文](./README.zh.md) | [日本語](./README.ja.md) | [한국어](./README.ko.md) | [Español](./README.es.md) | [Português](./README.pt.md) | [Français](./README.fr.md) | [Deutsch](./README.de.md) | [Русский](./README.ru.md) | [हिन्दी](./README.hi.md) | [العربية](./README.ar.md) | [Bahasa Indonesia](./README.id.md) | [ภาษาไทย](./README.th.md) | [Türkçe](./README.tr.md) | [Italiano](./README.it.md) | [Polski](./README.pl.md) | [Nederlands](./README.nl.md) | [Bahasa Melayu](./README.ms.md) | [Українська](./README.uk.md) | [বাংলা](./README.bn.md)

## Funktioner

- 🎯 **Smart komprimering** — Ange målstorlek (t.ex. 500KB), biblioteket hittar automatiskt bästa kvalitet
- 📐 **Automatisk storleksändring** — Ändra storlek till max bredd/höjd med bibehållet bildförhållande
- 🔄 **EXIF-korrigering** — Korrigerar automatiskt roterade foton från iPhone/Samsung
- 🖼️ **WebP-konvertering** — Konvertera till moderna format för mindre filer
- ⚡ **Web Worker** — Icke-blockerande komprimering i bakgrundstråd
- 📊 **Framstegscallback** — Visa komprimeringsframsteg i realtid
- 💧 **Vattenstämpel** — Lägg till text- eller bildvattenstämplar
- 📝 **Base64-utdata** — Hämta Data URL för omedelbar förhandsgranskning

## Installation

```bash
npm install @miconvert/browser-image-compression
```

## Snabbstart

```typescript
import imageCompression from '@miconvert/browser-image-compression';

const compressedFile = await imageCompression(file, {
  maxSizeMB: 1,              // Mål ≤ 1MB
  maxWidthOrHeight: 1920,    // Ändra storlek om större
  useWebWorker: true,        // Bakgrundstråd
  onProgress: (p) => console.log(`${p}%`),
});
```

## API-alternativ

| Alternativ         | Typ        | Standard  | Beskrivning                              |
|--------------------|------------|-----------|------------------------------------------|
| `maxSizeMB`        | `number`   | —         | Maximal filstorlek (MB)                  |
| `maxWidthOrHeight` | `number`   | —         | Maximal bredd eller höjd (px)            |
| `initialQuality`   | `number`   | `1`       | Initialkvalitet (0–1)                    |
| `fileType`         | `string`   | samma     | Utdata MIME-typ                          |
| `useWebWorker`     | `boolean`  | `true`    | Kör i Web Worker                         |
| `onProgress`       | `function` | —         | Framstegscallback `(%) => void`          |
| `outputType`       | `string`   | `'file'`  | `'file'` → File, `'base64'` → Data URL  |
| `exifOrientation`  | `boolean`  | `true`    | Automatisk EXIF-korrigering              |
| `watermark`        | `object`   | —         | Vattenstämpelkonfiguration               |

## Webbläsarstöd

Chrome 64+, Firefox 62+, Safari 12+, Edge 79+

## 🆘 Support & Felrapportering

> **Om du hittar buggar, problem eller behöver hjälp, kontakta oss på:**
>
> ### 👉 [miconvert.com/en/contact](https://miconvert.com/en/contact?utm_source=npm&utm_medium=readme&utm_campaign=browser-image-compression)
>
> Vi svarar på alla förfrågningar inom 24 timmar. Du kan också skapa en issue på [GitHub](https://github.com/huuhuybn/miconvert-browser-image-compression/issues), men för snabbast svar, använd vår kontaktsida.

## Licens

MIT © [Miconvert](https://miconvert.com?utm_source=npm&utm_medium=readme&utm_campaign=browser-image-compression)
