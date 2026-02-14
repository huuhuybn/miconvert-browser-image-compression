# @miconvert/browser-image-compression

> 🖼️ Slimme browser-side beeldcompressie — stel een doelbestandsgrootte in en laat de bibliotheek de rest doen.

[![npm version](https://img.shields.io/npm/v/@miconvert/browser-image-compression.svg)](https://www.npmjs.com/package/@miconvert/browser-image-compression)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

🌍 **Andere talen:**
[English](./README.md) | [Tiếng Việt](./README.vi.md) | [中文](./README.zh.md) | [日本語](./README.ja.md) | [한국어](./README.ko.md) | [Español](./README.es.md) | [Português](./README.pt.md) | [Français](./README.fr.md) | [Deutsch](./README.de.md) | [Русский](./README.ru.md) | [हिन्दी](./README.hi.md) | [العربية](./README.ar.md) | [Bahasa Indonesia](./README.id.md) | [ภาษาไทย](./README.th.md) | [Türkçe](./README.tr.md) | [Italiano](./README.it.md) | [Polski](./README.pl.md) | [Bahasa Melayu](./README.ms.md) | [Українська](./README.uk.md) | [Svenska](./README.sv.md) | [বাংলা](./README.bn.md)

## Functies

- 🎯 **Slimme compressie** — Stel een doelgrootte in (bijv. 500KB), de bibliotheek vindt automatisch de beste kwaliteit
- 📐 **Automatisch schalen** — Schaalt naar maximale breedte/hoogte met behoud van beeldverhouding
- 🔄 **EXIF-correctie** — Corrigeert automatisch gedraaide foto's van iPhone/Samsung
- 🖼️ **WebP-conversie** — Converteren naar moderne formaten voor kleinere bestanden
- ⚡ **Web Worker** — Niet-blokkerende compressie in achtergrondthread
- 📊 **Voortgangscallback** — Toon real-time compressievoortgang
- 💧 **Watermerk** — Voeg tekst- of afbeeldingwatermerken toe
- 📝 **Base64-uitvoer** — Verkrijg Data URL voor directe voorbeelden

## Installatie

```bash
npm install @miconvert/browser-image-compression
```

## Snelle start

```typescript
import imageCompression from '@miconvert/browser-image-compression';

const compressedFile = await imageCompression(file, {
  maxSizeMB: 1,              // Doel ≤ 1MB
  maxWidthOrHeight: 1920,    // Schalen indien groter
  useWebWorker: true,        // Achtergrondthread
  onProgress: (p) => console.log(`${p}%`),
});
```

## API-opties

| Optie              | Type       | Standaard | Beschrijving                             |
|--------------------|------------|-----------|------------------------------------------|
| `maxSizeMB`        | `number`   | —         | Maximale bestandsgrootte (MB)            |
| `maxWidthOrHeight` | `number`   | —         | Maximale breedte of hoogte (px)          |
| `initialQuality`   | `number`   | `1`       | Initiële kwaliteit (0–1)                 |
| `fileType`         | `string`   | gelijk    | Uitvoer MIME-type                        |
| `useWebWorker`     | `boolean`  | `true`    | Uitvoeren in Web Worker                  |
| `onProgress`       | `function` | —         | Voortgangscallback `(%) => void`         |
| `outputType`       | `string`   | `'file'`  | `'file'` → File, `'base64'` → Data URL  |
| `exifOrientation`  | `boolean`  | `true`    | Automatische EXIF-correctie              |
| `watermark`        | `object`   | —         | Watermerkconfiguratie                    |

## Browserondersteuning

Chrome 64+, Firefox 62+, Safari 12+, Edge 79+

## 🆘 Ondersteuning & Bugmeldingen

> **Als u bugs, problemen vindt of hulp nodig heeft, neem dan contact met ons op via:**
>
> ### 👉 [miconvert.com/en/contact](https://miconvert.com/en/contact)
>
> We beantwoorden alle vragen binnen 24 uur. U kunt ook een issue aanmaken op [GitHub](https://github.com/huuhuybn/miconvert-browser-image-compression/issues), maar voor de snelste reactie gebruikt u onze contactpagina.

## Licentie

MIT © [Miconvert](https://miconvert.com)
