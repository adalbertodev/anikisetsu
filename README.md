# AniKisetsu

Plataforma web de anime: catálogo y base de datos organizados por temporada. Construida con React 19 + Vite + TypeScript y datos extraídos de la [API de AniList](https://anilist.gitbook.io/anilist-apiv2-docs/).

## Demo

Desplegado en Vercel: **[anikisetsu.vercel.app](https://anikisetsu.vercel.app)**

## Requisitos

- [Node.js](https://nodejs.org/) 20 o superior
- [npm](https://www.npmjs.com/) 10+

## Instalación

```bash
git clone https://github.com/adalbertodev/anikisetsu.git
cd anikisetsu
npm install
npm run dev
```

## Fetch de datos de AniList

El script [`scripts/fetch-anilist.ts`](scripts/fetch-anilist.ts) consulta la API y guarda los resultados en `src/data/<YYYY-MM-DD>/` (un JSON por dataset: `trending`, `popular_this_season`, `popular_next_season`, `popular_all_time`, `top_100_animes`).

```bash
npm run fetch-anilist
```

Tras la descarga, actualiza la fecha importada en [`src/data/index.ts`](src/data/index.ts) si quieres usar el snapshot recién generado.

## Scripts disponibles

| Script                  | Descripción                                |
| ----------------------- | ------------------------------------------ |
| `npm run dev`           | Servidor de desarrollo (Vite)              |
| `npm run build`         | Typecheck (`tsc -b`) + build de producción |
| `npm run preview`       | Sirve el build de producción en local      |
| `npm run lint`          | ESLint sobre todo el proyecto              |
| `npm run fetch-anilist` | Descarga datos de AniList a `src/data/`    |

## Stack

React 19 · Vite · TypeScript · react-router v7 · CSS vanilla con BEM · Material Symbols · Google Fonts (Outfit + Noto Sans JP).
