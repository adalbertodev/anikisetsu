import type {
  Anime,
  AnimeFilters,
  AnimeFiltersSort,
  AnimeFiltersView,
  AnimeFormat,
  AnimeStatus,
  Season,
} from "../types";

// Whitelists para validación defensiva
export const SEASONS: readonly Season[] = [
  "WINTER",
  "SPRING",
  "SUMMER",
  "FALL",
];
export const FORMATS: readonly AnimeFormat[] = [
  "TV",
  "TV_SHORT",
  "MOVIE",
  "SPECIAL",
  "OVA",
  "ONA",
  "MUSIC",
  "MANGA",
  "NOVEL",
  "ONE_SHOT",
];
export const STATUSES: readonly AnimeStatus[] = [
  "FINISHED",
  "RELEASING",
  "NOT_YET_RELEASED",
  "CANCELLED",
  "HIATUS",
];
export const SORTS: readonly AnimeFiltersSort[] = [
  "popular",
  "trending",
  "score",
  "title",
];
export const VIEWS: readonly AnimeFiltersView[] = ["cover", "chart"];

/** Parser con whitelist: valor inválido → null. */
export const parseEnum = <T extends string>(
  value: string | null,
  allowed: readonly T[],
): T | null => {
  if (!value) return null;
  const upper = value.toUpperCase() as T;
  return allowed.includes(upper) ? upper : null;
};

export const parseLowerEnum = <T extends string>(
  value: string | null,
  allowed: readonly T[],
): T | null => {
  if (!value) return null;
  const lower = value.toLowerCase() as T;
  return allowed.includes(lower) ? lower : null;
};

export const parseGenres = (raw: string | null): string[] =>
  raw
    ? raw
        .split(",")
        .map((g) => g.trim())
        .filter(Boolean)
    : [];

export const parseYear = (raw: string | null): number | null => {
  if (!raw) return null;
  const n = Number.parseInt(raw, 10);
  return Number.isFinite(n) ? n : null;
};

/** Devuelve los animes que cumplen TODOS los filtros (AND). No muta. */
export const applyFilters = (
  directory: Anime[],
  filters: AnimeFilters,
): Anime[] => {
  const { search, genres, year, season, format, status } = filters;
  const query = search.trim().toLowerCase();

  return directory.filter((anime) => {
    if (query) {
      const romaji = anime.title.romaji?.toLowerCase() ?? "";
      const english = anime.title.english?.toLowerCase() ?? "";

      if (!romaji.includes(query) && !english.includes(query)) return false;
    }

    if (genres.length > 0) {
      const ag = anime.genres ?? [];
      for (const genre of genres) if (!ag.includes(genre)) return false;
    }

    if (year !== null && anime.seasonYear !== year) return false;
    if (season !== null && anime.season !== season) return false;
    if (format !== null && anime.format !== format) return false;
    if (status !== null && anime.status !== status) return false;

    return true;
  });
};

/** Ordena una COPIA según el criterio. Nullish → final. */
export const applySort = (animes: Anime[], sort: AnimeFiltersSort): Anime[] => {
  const sorted = [...animes];

  switch (sort) {
    case "popular":
      sorted.sort(
        (a, b) => (b.popularity ?? -Infinity) - (a.popularity ?? -Infinity),
      );
      break;
    case "trending":
      sorted.sort(
        (a, b) => (b.trending ?? -Infinity) - (a.trending ?? -Infinity),
      );
      break;
    case "score":
      sorted.sort(
        (a, b) => (b.averageScore ?? -Infinity) - (a.averageScore ?? -Infinity),
      );
      break;
    case "title":
      sorted.sort((a, b) => a.title.romaji.localeCompare(b.title.romaji));
      break;
  }
  return sorted;
};
