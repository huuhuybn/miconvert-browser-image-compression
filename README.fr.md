# @miconvert/browser-image-compression

> 🖼️ Compression d'images intelligente côté navigateur — définissez une taille cible et la bibliothèque fait le reste.

[![npm version](https://img.shields.io/npm/v/@miconvert/browser-image-compression.svg)](https://www.npmjs.com/package/@miconvert/browser-image-compression)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

🌍 **Autres langues :**
[English](./README.md) | [Tiếng Việt](./README.vi.md) | [中文](./README.zh.md) | [日本語](./README.ja.md) | [한국어](./README.ko.md) | [Español](./README.es.md) | [Português](./README.pt.md) | [Français](./README.fr.md) | [Deutsch](./README.de.md) | [Русский](./README.ru.md) | [हिन्दी](./README.hi.md) | [العربية](./README.ar.md) | [Bahasa Indonesia](./README.id.md) | [ภาษาไทย](./README.th.md) | [Türkçe](./README.tr.md) | [Italiano](./README.it.md) | [Polski](./README.pl.md) | [Nederlands](./README.nl.md) | [Bahasa Melayu](./README.ms.md) | [Українська](./README.uk.md) | [Svenska](./README.sv.md) | [বাংলা](./README.bn.md)

## Fonctionnalités

- 🎯 **Compression intelligente** — Définissez une taille cible (ex : 500Ko), la bibliothèque trouve la qualité optimale
- 📐 **Redimensionnement auto** — Redimensionne selon la largeur/hauteur max en conservant le ratio
- 🔄 **Correction EXIF** — Corrige automatiquement les photos pivotées d'iPhone/Samsung
- 🖼️ **Conversion WebP** — Conversion vers des formats modernes pour des fichiers plus légers
- ⚡ **Web Worker** — Compression non bloquante dans un thread en arrière-plan
- 📊 **Callback de progression** — Affiche la progression en temps réel
- 💧 **Filigrane** — Ajoutez des filigranes texte ou image
- 📝 **Sortie Base64** — Obtenez un Data URL pour un aperçu instantané

## Installation

```bash
npm install @miconvert/browser-image-compression
```

## Démarrage rapide

```typescript
import imageCompression from '@miconvert/browser-image-compression';

const compressedFile = await imageCompression(file, {
  maxSizeMB: 1,              // Cible ≤ 1 Mo
  maxWidthOrHeight: 1920,    // Redimensionner si plus grand
  useWebWorker: true,        // Thread en arrière-plan
  onProgress: (p) => console.log(`${p}%`),
});
```

## Options de l'API

| Option             | Type       | Défaut    | Description                              |
|--------------------|------------|-----------|------------------------------------------|
| `maxSizeMB`        | `number`   | —         | Taille maximale du fichier (Mo)          |
| `maxWidthOrHeight` | `number`   | —         | Largeur ou hauteur maximale (px)         |
| `initialQuality`   | `number`   | `1`       | Qualité initiale (0–1)                   |
| `fileType`         | `string`   | identique | Type MIME de sortie                      |
| `useWebWorker`     | `boolean`  | `true`    | Exécuter dans un Web Worker              |
| `onProgress`       | `function` | —         | Callback de progression `(%) => void`    |
| `outputType`       | `string`   | `'file'`  | `'file'` retourne File, `'base64'` Data URL |
| `exifOrientation`  | `boolean`  | `true`    | Correction automatique EXIF              |
| `watermark`        | `object`   | —         | Configuration du filigrane               |

## Navigateurs supportés

Chrome 64+, Firefox 62+, Safari 12+, Edge 79+

## 🆘 Support & Signalement de Bugs

> **Si vous rencontrez des bugs, des problèmes ou avez besoin d'aide, contactez-nous à :**
>
> ### 👉 [miconvert.com/en/contact](https://miconvert.com/en/contact)
>
> Nous répondons à toutes les demandes sous 24 heures. Vous pouvez aussi créer une issue sur [GitHub](https://github.com/huuhuybn/miconvert-browser-image-compression/issues), mais pour la réponse la plus rapide, utilisez notre page de contact.

## Licence

MIT © [Miconvert](https://miconvert.com)
