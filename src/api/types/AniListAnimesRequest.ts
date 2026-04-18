import type { MediaSeason, MediaType } from "./AniListAnimesResponse";

export interface AnimesVariables {
  page?: number;
  perPage?: number;
  sort?: MediaSort[];
  type?: MediaType;
  season?: MediaSeason;
  seasonYear?: number;
}

export type MediaSort =
  | "ID"
  | "ID_DESC"
  | "TITLE_ROMAJI"
  | "TITLE_ROMAJI_DESC"
  | "TITLE_ENGLISH"
  | "TITLE_ENGLISH_DESC"
  | "TITLE_NATIVE"
  | "TITLE_NATIVE_DESC"
  | "TYPE"
  | "TYPE_DESC"
  | "FORMAT"
  | "FORMAT_DESC"
  | "START_DATE"
  | "START_DATE_DESC"
  | "END_DATE"
  | "END_DATE_DESC"
  | "SCORE"
  | "SCORE_DESC"
  | "POPULARITY"
  | "POPULARITY_DESC"
  | "TRENDING"
  | "TRENDING_DESC"
  | "EPISODES"
  | "EPISODES_DESC"
  | "DURATION"
  | "DURATION_DESC"
  | "STATUS"
  | "STATUS_DESC"
  | "UPDATED_AT"
  | "UPDATED_AT_DESC"
  | "SEARCH_MATCH"
  | "FAVORITES"
  | "FAVORITES_DESC";
