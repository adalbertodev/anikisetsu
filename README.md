# AniKisetsu

Plataforma web de anime: catálogo y base de datos organizados por temporada. Construida con React + Vite + TypeScript y datos obtenidos de la [API de AniList](https://anilist.gitbook.io/anilist-apiv2-docs/).

## Requisitos

- [Node.js](https://nodejs.org/) 20 o superior (fetch global requerido)
- [npm](https://www.npmjs.com/) 10+

## Clonar e instalar

```bash
git clone https://github.com/adalbertodev/anikisetsu.git
cd anikisetsu
npm install
```

## Fetch de datos de AniList

El script [`scripts/fetch-anilist.ts`](scripts/fetch-anilist.ts) consulta la API de AniList y guarda el resultado en `src/data/<YYYY-MM-DD>.json` (nombre con la fecha de ejecución).

```bash
npm run fetch-anilist
```

Salida esperada:

```
→ Fetching anime to anilist... 50 animes → src/data/2026-04-18.json
```

El JSON generado contiene el array de animes ya mapeados al tipo interno `Anime`. Se puede commitear al repo como snapshot o usarse para poblar la UI en desarrollo sin depender de la red.

## Scripts disponibles

| Script                  | Descripción                                |
| ----------------------- | ------------------------------------------ |
| `npm run dev`           | Servidor de desarrollo (Vite)              |
| `npm run build`         | Typecheck (`tsc -b`) + build de producción |
| `npm run preview`       | Sirve el build de producción en local      |
| `npm run lint`          | ESLint sobre todo el proyecto              |
| `npm run fetch-anilist` | Descarga datos de AniList a `src/data/`    |
