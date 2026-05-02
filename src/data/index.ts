import type { Anime } from "../types/Anime";
import trendingData from "./2026-05-01/trending.json";
import popularThisSeasonData from "./2026-05-01/popular_this_season.json";
import popularNextSeasonData from "./2026-05-01/popular_next_season.json";
import popularAllTimeData from "./2026-05-01/popular_all_time.json";
import topAnimesData from "./2026-05-01/top_100_animes.json";

const DIRECTORY: Anime[] = (() => {
  const allAnimes = [
    ...trendingData,
    ...popularThisSeasonData,
    ...popularNextSeasonData,
    ...popularAllTimeData,
    ...topAnimesData,
  ] as Anime[];
  const uniqueAnimeIds = new Set<number>();

  return allAnimes.filter((anime) =>
    uniqueAnimeIds.has(anime.id) ? false : (uniqueAnimeIds.add(anime.id), true),
  );
})();

export const getAllAnimes = (): Anime[] => DIRECTORY;

export const getAllAnimesSortedByPopularity = () => {
  const allAnimes = getAllAnimes();

  return [...allAnimes].sort(
    (a, b) => (b.popularity ?? -Infinity) - (a.popularity ?? -Infinity),
  );
};

export const getTrendingAnimes = (): Anime[] => {
  return trendingData as Anime[];
};

export const getPopularThisSeasonAnimes = (): Anime[] => {
  return popularThisSeasonData as Anime[];
};

export const getPopularNextSeasonAnimes = (): Anime[] => {
  return popularNextSeasonData as Anime[];
};

export const getPopularAllTimeAnimes = (): Anime[] => {
  return popularAllTimeData as Anime[];
};

export const getTopAnimes = (): Anime[] => {
  return topAnimesData as Anime[];
};

export const getAnimeById = (id: number): Anime | null => {
  const allAnimes = getAllAnimes();

  return allAnimes.find((anime) => anime.id === id) ?? null;
};

export const getPopularityRank = (animeId: number): number | null => {
  const ranking = [...DIRECTORY].sort(
    (a, b) => (b.popularity ?? -Infinity) - (a.popularity ?? -Infinity),
  );
  const index = ranking.findIndex((anime) => anime.id === animeId);
  return index >= 0 ? index + 1 : null;
};
