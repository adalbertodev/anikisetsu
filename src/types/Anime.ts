export interface Anime {
  id: number;
  title: AnimeTitle;
  coverImage?: string | null;
  averageScore?: number | null;
  genres?: string[];
  meanScore?: number | null;
  popularity?: number | null;
  trending?: number | null;
  status?: AnimeStatus;
  scoreDistribution?: ScoreDistribution[];
  bannerImage?: string | null;
  characters?: Character[];
  description?: string;
  duration?: number | null;
  endDate?: FuzzyDate;
  episodes?: number | null;
  format?: AnimeFormat | null;
  relations?: Relation[];
  season?: Season | null;
  seasonYear?: number | null;
  staff?: Staff[];
  studios?: Studio[];
  source?: AnimeSource;
  startDate?: FuzzyDate;
}

export interface AnimeTitle {
  romaji: string;
  native?: string;
  english?: string | null;
}

export type AnimeStatus =
  | "FINISHED"
  | "RELEASING"
  | "NOT_YET_RELEASED"
  | "CANCELLED"
  | "HIATUS";

export interface ScoreDistribution {
  amount: number;
  score: number;
}

export type CharacterRole = "MAIN" | "SUPPORTING" | "BACKGROUND";

export interface Character {
  name: CharacterName;
  role: CharacterRole;
  voiceActors: Staff[];
}

export interface CharacterName {
  full: string;
}

export interface FuzzyDate {
  day?: number | null;
  month?: number | null;
  year?: number | null;
}

export type AnimeFormat =
  | "TV"
  | "TV_SHORT"
  | "MOVIE"
  | "SPECIAL"
  | "OVA"
  | "ONA"
  | "MUSIC"
  | "MANGA"
  | "NOVEL"
  | "ONE_SHOT";

export interface Relation {
  relationType:
    | "ADAPTATION"
    | "PREQUEL"
    | "SEQUEL"
    | "PARENT"
    | "SIDE_STORY"
    | "CHARACTER"
    | "SUMMARY"
    | "ALTERNATIVE"
    | "SPIN_OFF"
    | "OTHER"
    | "SOURCE"
    | "COMPILATION"
    | "CONTAINS";
  anime: Anime;
}

export type Season = "WINTER" | "SPRING" | "SUMMER" | "FALL";

export interface Staff {
  image: string;
  name: string;
  language: string;
  role?: string;
}

export interface Studio {
  id: number;
  name: string;
  isMain: boolean;
}

export type AnimeSource =
  | "ORIGINAL"
  | "MANGA"
  | "LIGHT_NOVEL"
  | "VISUAL_NOVEL"
  | "VIDEO_GAME"
  | "OTHER"
  | "NOVEL"
  | "DOUJINSHI"
  | "ANIME"
  | "WEB_NOVEL"
  | "LIVE_ACTION"
  | "GAME"
  | "COMIC"
  | "MULTIMEDIA_PROJECT"
  | "PICTURE_BOOK";
