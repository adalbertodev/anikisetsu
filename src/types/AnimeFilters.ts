import type { AnimeFormat, AnimeStatus, Season } from "./Anime";

export type AnimeFiltersSort = "popular" | "trending" | "score" | "title";
export type AnimeFiltersView = "cover" | "chart";

export interface AnimeFilters {
  search: string;
  genres: string[];
  year: number | null;
  season: Season | null;
  format: AnimeFormat | null;
  status: AnimeStatus | null;
  sort: AnimeFiltersSort;
  view: AnimeFiltersView;
}

export interface ActiveFilterChip {
  id: string; // estable: "genre:Action", "season", …
  label: string; // texto visible del chip
  onRemove: () => void; // callback que quita ese filtro
}

export const SEASON_LABELS: Record<Season, string> = {
  WINTER: "Invierno",
  SPRING: "Primavera",
  SUMMER: "Verano",
  FALL: "Otoño",
};

export const FORMAT_LABELS: Record<AnimeFormat, string> = {
  TV: "TV",
  TV_SHORT: "TV Short",
  MOVIE: "Película",
  SPECIAL: "Especial",
  OVA: "OVA",
  ONA: "ONA",
  MUSIC: "Música",
  MANGA: "Manga",
  NOVEL: "Novela",
  ONE_SHOT: "One Shot",
};

export const STATUS_LABELS: Record<AnimeStatus, string> = {
  FINISHED: "Finalizado",
  RELEASING: "En emisión",
  NOT_YET_RELEASED: "Próximamente",
  CANCELLED: "Cancelado",
  HIATUS: "En pausa",
};

export const SORT_LABELS: Record<AnimeFiltersSort, string> = {
  popular: "Popularidad",
  trending: "Tendencia",
  score: "Puntuación",
  title: "Título (A–Z)",
};
