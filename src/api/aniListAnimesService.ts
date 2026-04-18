import type { Anime } from "../types/Anime";
import { aniListRequest } from "./aniListClient";
import { aniListAnimesToAnimesMapper } from "./aniListAnimesToAnimesMapper";
import { ANIMES_QUERY } from "./aniListAnimesQuery";
import type { AnimesVariables, AniListAnimesResponse } from "./types";

export const getAnimes = async (
  options: AnimesVariables = {},
): Promise<Anime[]> => {
  const {
    page = 1,
    perPage = 50,
    sort = ["POPULARITY_DESC"],
    type = "ANIME",
    season,
    seasonYear,
  } = options;

  const data = await aniListRequest<AniListAnimesResponse, AnimesVariables>(
    ANIMES_QUERY,
    { page, perPage, sort, type, season, seasonYear },
  );

  return aniListAnimesToAnimesMapper(data);
};
