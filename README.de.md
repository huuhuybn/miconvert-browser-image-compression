# @miconvert/browser-image-compression

> 🖼️ Intelligente Browser-Bildkomprimierung — Zielgröße festlegen und die Bibliothek erledigt den Rest.

[![npm version](https://img.shields.io/npm/v/@miconvert/browser-image-compression.svg)](https://www.npmjs.com/package/@miconvert/browser-image-compression)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

🌍 **Andere Sprachen:**
[English](./README.md) | [Tiếng Việt](./README.vi.md) | [中文](./README.zh.md) | [日本語](./README.ja.md) | [한국어](./README.ko.md) | [Español](./README.es.md) | [Português](./README.pt.md) | [Français](./README.fr.md) | [Deutsch](./README.de.md) | [Русский](./README.ru.md) | [हिन्दी](./README.hi.md) | [العربية](./README.ar.md) | [Bahasa Indonesia](./README.id.md) | [ภาษาไทย](./README.th.md) | [Türkçe](./README.tr.md) | [Italiano](./README.it.md) | [Polski](./README.pl.md) | [Nederlands](./README.nl.md) | [Bahasa Melayu](./README.ms.md) | [Українська](./README.uk.md) | [Svenska](./README.sv.md) | [বাংলা](./README.bn.md)

## Funktionen

- 🎯 **Intelligente Komprimierung** — Zielgröße festlegen (z.B. 500KB), Bibliothek findet optimale Qualität
- 📐 **Automatische Größenanpassung** — Skalierung auf max. Breite/Höhe unter Beibehaltung des Seitenverhältnisses
- 🔄 **EXIF-Korrektur** — Automatische Korrektur gedrehter iPhone/Samsung-Fotos
- 🖼️ **WebP-Konvertierung** — Konvertierung in moderne Formate für kleinere Dateien
- ⚡ **Web Worker** — Nicht-blockierende Komprimierung im Hintergrund-Thread
- 📊 **Fortschritts-Callback** — Echtzeit-Komprimierungsfortschritt
- 💧 **Wasserzeichen** — Text- oder Bild-Wasserzeichen hinzufügen
- 📝 **Base64-Ausgabe** — Data URL für sofortige Vorschau

## Installation

```bash
npm install @miconvert/browser-image-compression
```

## Schnellstart

```typescript
import imageCompression from '@miconvert/browser-image-compression';

const compressedFile = await imageCompression(file, {
  maxSizeMB: 1,              // Ziel ≤ 1MB
  maxWidthOrHeight: 1920,    // Bei Überschreitung skalieren
  useWebWorker: true,        // Hintergrund-Thread
  onProgress: (p) => console.log(`${p}%`),
});
```

## API-Optionen

| Option             | Typ        | Standard  | Beschreibung                             |
|--------------------|------------|-----------|------------------------------------------|
| `maxSizeMB`        | `number`   | —         | Maximale Dateigröße (MB)                 |
| `maxWidthOrHeight` | `number`   | —         | Maximale Breite oder Höhe (px)           |
| `initialQuality`   | `number`   | `1`       | Anfangsqualität (0–1)                    |
| `fileType`         | `string`   | gleich    | Ausgabe-MIME-Typ                         |
| `useWebWorker`     | `boolean`  | `true`    | In Web Worker ausführen                  |
| `onProgress`       | `function` | —         | Fortschritts-Callback `(%) => void`      |
| `outputType`       | `string`   | `'file'`  | `'file'` gibt File, `'base64'` Data URL zurück |
| `exifOrientation`  | `boolean`  | `true`    | Automatische EXIF-Korrektur              |
| `watermark`        | `object`   | —         | Wasserzeichen-Konfiguration              |

## Browser-Unterstützung

Chrome 64+, Firefox 62+, Safari 12+, Edge 79+

## 🆘 Support & Fehlermeldungen

> **Wenn Sie Bugs, Probleme finden oder Hilfe benötigen, kontaktieren Sie uns unter:**
>
> ### 👉 [miconvert.com/en/contact](https://miconvert.com/en/contact?utm_source=npm&utm_medium=readme&utm_campaign=browser-image-compression)
>
> Wir beantworten alle Anfragen innerhalb von 24 Stunden. Sie können auch ein Issue auf [GitHub](https://github.com/huuhuybn/miconvert-browser-image-compression/issues) erstellen, aber für die schnellste Antwort nutzen Sie bitte unsere Kontaktseite.

## Lizenz

MIT © [Miconvert](https://miconvert.com?utm_source=npm&utm_medium=readme&utm_campaign=browser-image-compression)
