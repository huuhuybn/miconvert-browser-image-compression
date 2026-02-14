# @miconvert/browser-image-compression

> 🖼️ Compressão inteligente de imagens no navegador — defina um tamanho alvo e a biblioteca faz o resto.

[![npm version](https://img.shields.io/npm/v/@miconvert/browser-image-compression.svg)](https://www.npmjs.com/package/@miconvert/browser-image-compression)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

🌍 **Outros idiomas:**
[English](./README.md) | [Tiếng Việt](./README.vi.md) | [中文](./README.zh.md) | [日本語](./README.ja.md) | [한국어](./README.ko.md) | [Español](./README.es.md) | [Français](./README.fr.md) | [Deutsch](./README.de.md) | [Русский](./README.ru.md)

## Recursos

- 🎯 **Compressão inteligente** — Defina um tamanho alvo (ex: 500KB), a biblioteca encontra a qualidade ideal
- 📐 **Redimensionamento automático** — Redimensiona para largura/altura máxima mantendo a proporção
- 🔄 **Correção EXIF** — Corrige automaticamente fotos rotacionadas do iPhone/Samsung
- 🖼️ **Conversão WebP** — Converte para formatos modernos para arquivos menores
- ⚡ **Web Worker** — Compressão não bloqueante em thread de fundo
- 📊 **Callback de progresso** — Mostra o progresso de compressão em tempo real
- 💧 **Marca d'água** — Adiciona marcas d'água de texto ou imagem
- 📝 **Saída Base64** — Obtém Data URL para previews instantâneos

## Instalação

```bash
npm install @miconvert/browser-image-compression
```

## Início rápido

```typescript
import imageCompression from '@miconvert/browser-image-compression';

const compressedFile = await imageCompression(file, {
  maxSizeMB: 1,              // Alvo ≤ 1MB
  maxWidthOrHeight: 1920,    // Redimensionar se maior
  useWebWorker: true,        // Thread de fundo
  onProgress: (p) => console.log(`${p}%`),
});
```

## Opções da API

| Opção              | Tipo       | Padrão    | Descrição                                |
|--------------------|------------|-----------|------------------------------------------|
| `maxSizeMB`        | `number`   | —         | Tamanho máximo do arquivo (MB)           |
| `maxWidthOrHeight` | `number`   | —         | Largura ou altura máxima (px)            |
| `initialQuality`   | `number`   | `1`       | Qualidade inicial (0–1)                  |
| `fileType`         | `string`   | igual     | Tipo MIME de saída                       |
| `useWebWorker`     | `boolean`  | `true`    | Executar em Web Worker                   |
| `onProgress`       | `function` | —         | Callback de progresso `(%) => void`      |
| `outputType`       | `string`   | `'file'`  | `'file'` retorna File, `'base64'` Data URL |
| `exifOrientation`  | `boolean`  | `true`    | Correção automática de EXIF              |
| `watermark`        | `object`   | —         | Configuração de marca d'água             |

## Navegadores compatíveis

Chrome 64+, Firefox 62+, Safari 12+, Edge 79+

## 🆘 Suporte e Relatório de Bugs

> **Se encontrar bugs, problemas ou precisar de ajuda, entre em contato conosco em:**
>
> ### 👉 [miconvert.com/en/contact](https://miconvert.com/en/contact)
>
> Respondemos a todas as consultas em 24 horas. Você também pode criar uma issue no [GitHub](https://github.com/huuhuybn/miconvert-browser-image-compression/issues), mas para a resposta mais rápida, use nossa página de contato.

## Licença

MIT © [Miconvert](https://miconvert.com)
