export interface AniListAnimesResponse {
  Page: Page;
}

export interface Page {
  media: Media[];
  pageInfo: PageInfo;
}

export interface PageInfo {
  currentPage: number;
  hasNextPage: boolean;
  lastPage: number;
  perPage: number;
  total: number;
}

export interface Media {
  id: number;
  title: MediaTitle;
  coverImage?: MediaCoverImage;
  averageScore?: number;
  genres?: string[];
  meanScore?: number;
  popularity?: number;
  trending?: number;
  status?: MediaStatus;
  stats?: MediaStats;
  bannerImage?: string;
  characters?: CharacterConnection;
  description?: string;
  duration?: number;
  endDate?: FuzzyDate;
  episodes?: number;
  format?: AnimeFormat;
  relations?: Relations;
  season?: MediaSeason;
  seasonYear?: number;
  staff?: StaffConnection;
  studios?: StudioConnection;
  type?: MediaType;
  source?: MediaSource;
  startDate?: FuzzyDate;
}

export interface MediaTitle {
  romaji: string;
  native: string;
  english: string;
}

export interface MediaCoverImage {
  extraLarge: string;
}

export type MediaStatus =
  | "FINISHED"
  | "RELEASING"
  | "NOT_YET_RELEASED"
  | "CANCELLED"
  | "HIATUS";

export interface MediaStats {
  scoreDistribution: ScoreDistribution[];
}

export interface ScoreDistribution {
  amount: number;
  score: number;
}

export interface CharacterConnection {
  edges: CharacterEdge[];
}

export interface CharacterEdge {
  role: CharacterRole;
  voiceActors: Staff[];
  node: Character;
}

export type CharacterRole = "MAIN" | "SUPPORTING" | "BACKGROUND";

export interface Character {
  name: CharacterName;
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

export interface Relations {
  edges: MediaEdge[];
}

export interface MediaEdge {
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
  node: Media;
}

export type MediaSeason = "WINTER" | "SPRING" | "SUMMER" | "FALL";

export interface StaffConnection {
  edges: StaffEdge[];
}

export interface StaffEdge {
  node: Staff;
  role: string;
}

export interface Staff {
  image: StaffImage;
  name: StaffName;
  languageV2: StaffLanguage;
}

export interface StaffImage {
  large: string;
}

export interface StaffName {
  full: string;
}

export type StaffLanguage =
  | "JAPANESE"
  | "ENGLISH"
  | "KOREAN"
  | "ITALIAN"
  | "SPANISH"
  | "PORTUGUESE"
  | "FRENCH"
  | "GERMAN"
  | "HEBREW"
  | "HUNGARIAN";

export interface StudioConnection {
  edges: StudioEdge[];
}

export interface StudioEdge {
  id: number;
  node: Studio;
  isMain: boolean;
}

export interface Studio {
  name: string;
}

export type MediaType = "ANIME" | "MANGA";

export type MediaSource =
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
