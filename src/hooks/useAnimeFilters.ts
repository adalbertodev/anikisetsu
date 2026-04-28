import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router";
import type { Anime, AnimeFormat, AnimeStatus, Season } from "../types/Anime";
import {
  FORMAT_LABELS,
  SEASON_LABELS,
  STATUS_LABELS,
  type ActiveFilterChip,
  type AnimeFilters,
  type AnimeFiltersSort,
  type AnimeFiltersView,
} from "../types";
import {
  applyFilters,
  applySort,
  FORMATS,
  parseEnum,
  parseGenres,
  parseLowerEnum,
  parseYear,
  SEASONS,
  SORTS,
  STATUSES,
  VIEWS,
} from "../utils";

const DEFAULT_SORT: AnimeFiltersSort = "popular";
const DEFAULT_VIEW: AnimeFiltersView = "cover";

export interface UseAnimeFiltersResult {
  filters: AnimeFilters;
  filteredAnimes: Anime[]; // tras search + filtros + sort
  resultsCount: number;
  options: {
    genres: string[];
    years: number[];
    seasons: readonly Season[];
    formats: readonly AnimeFormat[];
    statuses: readonly AnimeStatus[];
    sorts: readonly AnimeFiltersSort[];
  };
  activeChips: ActiveFilterChip[];
  setSearch: (v: string) => void;
  toggleGenre: (g: string) => void;
  setYear: (y: number | null) => void;
  setSeason: (s: Season | null) => void;
  setFormat: (f: AnimeFormat | null) => void;
  setStatus: (s: AnimeStatus | null) => void;
  setSort: (s: AnimeFiltersSort) => void;
  setView: (v: AnimeFiltersView) => void;
  clearFilters: () => void;
}

/**
 * useAnimeFilters — encapsula la lógica del directorio.
 * URL = fuente de verdad. Todo lo demás se deriva de useSearchParams().
 *
 * Query params soportados (todos opcionales):
 *   ?search=...   ?genres=a,b   ?year=2026   ?season=spring
 *   ?format=tv    ?status=releasing
 *   ?sort=popular|trending|score|title   ?view=cover|chart
 */

export const useAnimeFilters = (directory: Anime[]): UseAnimeFiltersResult => {
  const [searchParams, setSearchParams] = useSearchParams();

  // 1) URL → objeto tipado
  const filters = useMemo<AnimeFilters>(
    () => ({
      search: searchParams.get("search") ?? "",
      genres: parseGenres(searchParams.get("genres")),
      year: parseYear(searchParams.get("year")),
      season: parseEnum<Season>(searchParams.get("season"), SEASONS),
      format: parseEnum<AnimeFormat>(searchParams.get("format"), FORMATS),
      status: parseEnum<AnimeStatus>(searchParams.get("status"), STATUSES),
      sort:
        parseLowerEnum<AnimeFiltersSort>(searchParams.get("sort"), SORTS) ??
        DEFAULT_SORT,
      view:
        parseLowerEnum<AnimeFiltersView>(searchParams.get("view"), VIEWS) ??
        DEFAULT_VIEW,
    }),
    [searchParams],
  );

  // 2) Opciones derivadas del dataset
  const options = useMemo(() => {
    const genreSet = new Set<string>();
    const yearSet = new Set<number>();

    for (const anime of directory) {
      anime.genres?.forEach((g) => genreSet.add(g));

      if (typeof anime.seasonYear === "number") yearSet.add(anime.seasonYear);
    }

    return {
      genres: [...genreSet].sort((a, b) => a.localeCompare(b)),
      years: [...yearSet].sort((a, b) => b - a),
      seasons: SEASONS,
      formats: FORMATS,
      statuses: STATUSES,
      sorts: SORTS,
    };
  }, [directory]);

  // 3) Filtrado + orden
  const filteredAnimes = useMemo(
    () => applySort(applyFilters(directory, filters), filters.sort),
    [directory, filters],
  );

  // 4) Actualizador genérico de URL
  const updateParams = useCallback(
    (mutations: [key: string, value: string | null][]) => {
      setSearchParams(
        (previous) => {
          const next = new URLSearchParams(previous);

          for (const [key, value] of mutations) {
            if (value === null || value === "") next.delete(key);
            else next.set(key, value);
          }
          return next;
        },
        { replace: true }, // no ensuciar historial con cada click
      );
    },
    [setSearchParams],
  );

  // 6) Setters públicos
  const setSearch = useCallback(
    (value: string) => {
      updateParams([["search", value]]);
    },
    [updateParams],
  );

  const toggleGenre = useCallback(
    (genre: string) => {
      const next = new Set(filters.genres);

      if (next.has(genre)) {
        next.delete(genre);
      } else {
        next.add(genre);
      }

      const genres = [...next];

      updateParams([["genres", genres.length ? genres.join(",") : null]]);
    },
    [filters.genres, updateParams],
  );

  const setYear = useCallback(
    (year: number | null) =>
      updateParams([["year", year === null ? null : String(year)]]),
    [updateParams],
  );
  const setSeason = useCallback(
    (season: Season | null) =>
      updateParams([["season", season === null ? null : season.toLowerCase()]]),
    [updateParams],
  );
  const setFormat = useCallback(
    (format: AnimeFormat | null) =>
      updateParams([["format", format === null ? null : format.toLowerCase()]]),
    [updateParams],
  );
  const setStatus = useCallback(
    (status: AnimeStatus | null) =>
      updateParams([["status", status === null ? null : status.toLowerCase()]]),
    [updateParams],
  );
  const setSort = useCallback(
    (sort: AnimeFiltersSort) =>
      updateParams([["sort", sort === DEFAULT_SORT ? null : sort]]),
    [updateParams],
  );

  const setView = useCallback(
    (view: AnimeFiltersView) =>
      updateParams([["view", view === DEFAULT_VIEW ? null : view]]),
    [updateParams],
  );

  const clearFilters = useCallback(
    () =>
      updateParams([
        ["search", null],
        ["genres", null],
        ["year", null],
        ["season", null],
        ["format", null],
        ["status", null],
      ]),
    [updateParams],
  );

  // 7) Chips de filtros activos
  const activeChips = useMemo<ActiveFilterChip[]>(() => {
    const chips: ActiveFilterChip[] = [];

    if (filters.search) {
      chips.push({
        id: "search",
        label: `"${filters.search}"`,
        onRemove: () => setSearch(""),
      });
    }
    filters.genres.forEach((genre) =>
      chips.push({
        id: `genre:${genre}`,
        label: genre,
        onRemove: () => toggleGenre(genre),
      }),
    );
    if (filters.year !== null)
      chips.push({
        id: "year",
        label: String(filters.year),
        onRemove: () => setYear(null),
      });
    if (filters.season !== null)
      chips.push({
        id: "season",
        label: SEASON_LABELS[filters.season],
        onRemove: () => setSeason(null),
      });
    if (filters.format !== null)
      chips.push({
        id: "format",
        label: FORMAT_LABELS[filters.format],
        onRemove: () => setFormat(null),
      });
    if (filters.status !== null)
      chips.push({
        id: "status",
        label: STATUS_LABELS[filters.status],
        onRemove: () => setStatus(null),
      });
    return chips;
  }, [
    filters,
    setSearch,
    toggleGenre,
    setYear,
    setSeason,
    setFormat,
    setStatus,
  ]);

  return {
    filters,
    filteredAnimes,
    resultsCount: filteredAnimes.length,
    options,
    activeChips,
    setSearch,
    toggleGenre,
    setYear,
    setSeason,
    setFormat,
    setStatus,
    setSort,
    setView,
    clearFilters,
  };
};
