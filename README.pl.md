# @miconvert/browser-image-compression

> 🖼️ Inteligentna kompresja obrazów w przeglądarce — ustaw docelowy rozmiar pliku, a biblioteka zrobi resztę.

[![npm version](https://img.shields.io/npm/v/@miconvert/browser-image-compression.svg)](https://www.npmjs.com/package/@miconvert/browser-image-compression)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

🌍 **Inne języki:**
[English](./README.md) | [Tiếng Việt](./README.vi.md) | [中文](./README.zh.md) | [日本語](./README.ja.md) | [한국어](./README.ko.md) | [Español](./README.es.md) | [Português](./README.pt.md) | [Français](./README.fr.md) | [Deutsch](./README.de.md) | [Русский](./README.ru.md) | [हिन्दी](./README.hi.md) | [العربية](./README.ar.md) | [Bahasa Indonesia](./README.id.md) | [ภาษาไทย](./README.th.md) | [Türkçe](./README.tr.md) | [Italiano](./README.it.md) | [Nederlands](./README.nl.md) | [Bahasa Melayu](./README.ms.md) | [Українська](./README.uk.md) | [Svenska](./README.sv.md) | [বাংলা](./README.bn.md)

## Funkcje

- 🎯 **Inteligentna kompresja** — Ustaw docelowy rozmiar (np. 500KB), biblioteka automatycznie znajdzie optymalną jakość
- 📐 **Automatyczne skalowanie** — Skalowanie do maksymalnej szerokości/wysokości z zachowaniem proporcji
- 🔄 **Korekcja EXIF** — Automatyczna korekta obróconych zdjęć z iPhone/Samsung
- 🖼️ **Konwersja WebP** — Konwersja do nowoczesnych formatów dla mniejszych plików
- ⚡ **Web Worker** — Nieblokująca kompresja w wątku w tle
- 📊 **Callback postępu** — Wyświetlanie postępu kompresji w czasie rzeczywistym
- 💧 **Znak wodny** — Dodawanie tekstowych lub graficznych znaków wodnych
- 📝 **Wyjście Base64** — Uzyskaj Data URL do natychmiastowego podglądu

## Instalacja

```bash
npm install @miconvert/browser-image-compression
```

## Szybki start

```typescript
import imageCompression from '@miconvert/browser-image-compression';

const compressedFile = await imageCompression(file, {
  maxSizeMB: 1,              // Cel ≤ 1MB
  maxWidthOrHeight: 1920,    // Skaluj jeśli większe
  useWebWorker: true,        // Wątek w tle
  onProgress: (p) => console.log(`${p}%`),
});
```

## Opcje API

| Opcja              | Typ        | Domyślnie | Opis                                     |
|--------------------|------------|-----------|------------------------------------------|
| `maxSizeMB`        | `number`   | —         | Maksymalny rozmiar pliku (MB)            |
| `maxWidthOrHeight` | `number`   | —         | Maksymalna szerokość lub wysokość (px)   |
| `initialQuality`   | `number`   | `1`       | Początkowa jakość (0–1)                  |
| `fileType`         | `string`   | tak samo  | Typ MIME wyjścia                         |
| `useWebWorker`     | `boolean`  | `true`    | Uruchom w Web Worker                     |
| `onProgress`       | `function` | —         | Callback postępu `(%) => void`           |
| `outputType`       | `string`   | `'file'`  | `'file'` → File, `'base64'` → Data URL  |
| `exifOrientation`  | `boolean`  | `true`    | Automatyczna korekcja EXIF               |
| `watermark`        | `object`   | —         | Konfiguracja znaku wodnego               |

## Obsługa przeglądarek

Chrome 64+, Firefox 62+, Safari 12+, Edge 79+

## 🆘 Wsparcie i zgłaszanie błędów

> **Jeśli znajdziesz błędy, problemy lub potrzebujesz pomocy, skontaktuj się z nami:**
>
> ### 👉 [miconvert.com/en/contact](https://miconvert.com/en/contact?utm_source=npm&utm_medium=readme&utm_campaign=browser-image-compression)
>
> Odpowiadamy na wszystkie zapytania w ciągu 24 godzin. Możesz też utworzyć issue na [GitHub](https://github.com/huuhuybn/miconvert-browser-image-compression/issues), ale dla najszybszej odpowiedzi użyj naszej strony kontaktowej.

## Licencja

MIT © [Miconvert](https://miconvert.com?utm_source=npm&utm_medium=readme&utm_campaign=browser-image-compression)
