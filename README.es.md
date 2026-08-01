# @miconvert/browser-image-compression

> 🖼️ Compresión inteligente de imágenes en el navegador — establece un tamaño objetivo y la biblioteca hace el resto.

[![npm version](https://img.shields.io/npm/v/@miconvert/browser-image-compression.svg)](https://www.npmjs.com/package/@miconvert/browser-image-compression)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

🌍 **Otros idiomas:**
[English](./README.md) | [Tiếng Việt](./README.vi.md) | [中文](./README.zh.md) | [日本語](./README.ja.md) | [한국어](./README.ko.md) | [Español](./README.es.md) | [Português](./README.pt.md) | [Français](./README.fr.md) | [Deutsch](./README.de.md) | [Русский](./README.ru.md) | [हिन्दी](./README.hi.md) | [العربية](./README.ar.md) | [Bahasa Indonesia](./README.id.md) | [ภาษาไทย](./README.th.md) | [Türkçe](./README.tr.md) | [Italiano](./README.it.md) | [Polski](./README.pl.md) | [Nederlands](./README.nl.md) | [Bahasa Melayu](./README.ms.md) | [Українська](./README.uk.md) | [Svenska](./README.sv.md) | [বাংলা](./README.bn.md)

## Características

- 🎯 **Compresión inteligente** — Establece un tamaño objetivo (ej: 500KB), la biblioteca busca la calidad óptima
- 📐 **Redimensionado automático** — Redimensiona al ancho/alto máximo manteniendo la proporción
- 🔄 **Corrección EXIF** — Corrige automáticamente fotos rotadas de iPhone/Samsung
- 🖼️ **Conversión WebP** — Convierte a formatos modernos para archivos más pequeños
- ⚡ **Web Worker** — Compresión no bloqueante en hilo de fondo
- 📊 **Callback de progreso** — Muestra el progreso de compresión en tiempo real
- 💧 **Marca de agua** — Añade marcas de agua de texto o imagen
- 📝 **Salida Base64** — Obtén Data URL para vistas previas instantáneas

## Instalación

```bash
npm install @miconvert/browser-image-compression
```

## Inicio rápido

```typescript
import imageCompression from '@miconvert/browser-image-compression';

const compressedFile = await imageCompression(file, {
  maxSizeMB: 1,              // Objetivo ≤ 1MB
  maxWidthOrHeight: 1920,    // Redimensionar si es más grande
  useWebWorker: true,        // Hilo de fondo
  onProgress: (p) => console.log(`${p}%`),
});
```

## Opciones de la API

| Opción             | Tipo       | Defecto   | Descripción                              |
|--------------------|------------|-----------|------------------------------------------|
| `maxSizeMB`        | `number`   | —         | Tamaño máximo del archivo (MB)           |
| `maxWidthOrHeight` | `number`   | —         | Ancho o alto máximo (px)                 |
| `initialQuality`   | `number`   | `1`       | Calidad inicial (0–1)                    |
| `fileType`         | `string`   | igual     | Tipo MIME de salida                      |
| `useWebWorker`     | `boolean`  | `true`    | Ejecutar en Web Worker                   |
| `onProgress`       | `function` | —         | Callback de progreso `(%) => void`       |
| `outputType`       | `string`   | `'file'`  | `'file'` devuelve File, `'base64'` Data URL |
| `exifOrientation`  | `boolean`  | `true`    | Corrección automática de EXIF            |
| `watermark`        | `object`   | —         | Configuración de marca de agua           |

## Navegadores compatibles

Chrome 64+, Firefox 62+, Safari 12+, Edge 79+

## 🆘 Soporte y Reporte de Errores

> **Si encuentras algún bug, problema o necesitas ayuda, contáctanos en:**
>
> ### 👉 [miconvert.com/en/contact](https://miconvert.com/en/contact?utm_source=npm&utm_medium=readme&utm_campaign=browser-image-compression)
>
> Respondemos a todas las consultas en 24 horas. También puedes crear un issue en [GitHub](https://github.com/huuhuybn/miconvert-browser-image-compression/issues), pero para la respuesta más rápida, usa nuestra página de contacto.

## Licencia

MIT © [Miconvert](https://miconvert.com?utm_source=npm&utm_medium=readme&utm_campaign=browser-image-compression)
