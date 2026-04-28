import type { Anime } from "../types/Anime";
import trendingData from "./2026-04-18/trending.json";
import popularThisSeasonData from "./2026-04-18/popular_this_season.json";
import popularNextSeasonData from "./2026-04-18/popular_next_season.json";
import popularAllTimeData from "./2026-04-18/popular_all_time.json";
import topAnimesData from "./2026-04-18/top_100_animes.json";

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
  const trendingAnimes = trendingData as Anime[];
  const popularThisSeasonAnimes = popularThisSeasonData as Anime[];
  const popularNextSeasonAnimes = popularNextSeasonData as Anime[];
  const popularAllTimeAnimes = popularAllTimeData as Anime[];
  const topAnimes = topAnimesData as Anime[];

  const allAnimes = [
    ...trendingAnimes,
    ...popularThisSeasonAnimes,
    ...popularNextSeasonAnimes,
    ...popularAllTimeAnimes,
    ...topAnimes,
  ];

  return allAnimes.find((anime) => anime.id === id) ?? null;
};
