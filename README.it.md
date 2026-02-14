# @miconvert/browser-image-compression

> 🖼️ Compressione intelligente delle immagini nel browser — imposta una dimensione target e la libreria fa il resto.

[![npm version](https://img.shields.io/npm/v/@miconvert/browser-image-compression.svg)](https://www.npmjs.com/package/@miconvert/browser-image-compression)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

🌍 **Altre lingue:**
[English](./README.md) | [Tiếng Việt](./README.vi.md) | [中文](./README.zh.md) | [日本語](./README.ja.md) | [한국어](./README.ko.md) | [Español](./README.es.md) | [Português](./README.pt.md) | [Français](./README.fr.md) | [Deutsch](./README.de.md) | [Русский](./README.ru.md) | [हिन्दी](./README.hi.md) | [العربية](./README.ar.md) | [Bahasa Indonesia](./README.id.md) | [ภาษาไทย](./README.th.md) | [Türkçe](./README.tr.md) | [Polski](./README.pl.md) | [Nederlands](./README.nl.md) | [Bahasa Melayu](./README.ms.md) | [Українська](./README.uk.md) | [Svenska](./README.sv.md) | [বাংলা](./README.bn.md)

## Funzionalità

- 🎯 **Compressione intelligente** — Imposta un target (es. 500KB), la libreria trova automaticamente la qualità ottimale
- 📐 **Ridimensionamento automatico** — Ridimensiona alla larghezza/altezza massima mantenendo le proporzioni
- 🔄 **Correzione EXIF** — Corregge automaticamente le foto ruotate da iPhone/Samsung
- 🖼️ **Conversione WebP** — Conversione in formati moderni per file più piccoli
- ⚡ **Web Worker** — Compressione non bloccante in thread in background
- 📊 **Callback progresso** — Mostra il progresso della compressione in tempo reale
- 💧 **Filigrana** — Aggiungi filigrane di testo o immagine
- 📝 **Output Base64** — Ottieni Data URL per anteprime istantanee

## Installazione

```bash
npm install @miconvert/browser-image-compression
```

## Avvio rapido

```typescript
import imageCompression from '@miconvert/browser-image-compression';

const compressedFile = await imageCompression(file, {
  maxSizeMB: 1,              // Target ≤ 1MB
  maxWidthOrHeight: 1920,    // Ridimensiona se più grande
  useWebWorker: true,        // Thread in background
  onProgress: (p) => console.log(`${p}%`),
});
```

## Opzioni API

| Opzione            | Tipo       | Default   | Descrizione                              |
|--------------------|------------|-----------|------------------------------------------|
| `maxSizeMB`        | `number`   | —         | Dimensione massima file (MB)             |
| `maxWidthOrHeight` | `number`   | —         | Larghezza o altezza massima (px)         |
| `initialQuality`   | `number`   | `1`       | Qualità iniziale (0–1)                   |
| `fileType`         | `string`   | uguale    | Tipo MIME output                         |
| `useWebWorker`     | `boolean`  | `true`    | Esegui in Web Worker                     |
| `onProgress`       | `function` | —         | Callback progresso `(%) => void`         |
| `outputType`       | `string`   | `'file'`  | `'file'` → File, `'base64'` → Data URL  |
| `exifOrientation`  | `boolean`  | `true`    | Correzione automatica EXIF               |
| `watermark`        | `object`   | —         | Configurazione filigrana                 |

## Supporto browser

Chrome 64+, Firefox 62+, Safari 12+, Edge 79+

## 🆘 Supporto e Segnalazione Bug

> **Se trovi bug, problemi o hai bisogno di aiuto, contattaci a:**
>
> ### 👉 [miconvert.com/en/contact](https://miconvert.com/en/contact)
>
> Rispondiamo a tutte le richieste entro 24 ore. Puoi anche creare una issue su [GitHub](https://github.com/huuhuybn/miconvert-browser-image-compression/issues), ma per la risposta più rapida, usa la nostra pagina di contatto.

## Licenza

MIT © [Miconvert](https://miconvert.com)
