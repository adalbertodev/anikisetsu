import type { Anime } from "../types/Anime";
import type { AniListAnimesResponse, Media } from "./types";

export const aniListAnimesToAnimesMapper = (
  aniListAnimes: AniListAnimesResponse,
): Anime[] => {
  return aniListAnimes.Page.media.map((media) =>
    aniListAnimeToAnimeMapper(media),
  );
};

export const aniListAnimeToAnimeMapper = (aniListAnime: Media): Anime => {
  return {
    id: aniListAnime.id,
    title: { ...aniListAnime.title },
    coverImage: aniListAnime.coverImage?.extraLarge,
    averageScore: aniListAnime.averageScore,
    genres: aniListAnime.genres,
    meanScore: aniListAnime.meanScore,
    popularity: aniListAnime.popularity,
    trending: aniListAnime.trending,
    status: aniListAnime.status,
    scoreDistribution: aniListAnime.stats?.scoreDistribution,
    bannerImage: aniListAnime.bannerImage,
    characters: aniListAnime.characters?.edges.map((character) => {
      return {
        name: character.node.name,
        role: character.role,
        voiceActors: character.voiceActors.map((voiceActor) => {
          return {
            image: voiceActor.image.large,
            name: voiceActor.name.full,
            language: voiceActor.languageV2,
          };
        }),
      };
    }),
    description: aniListAnime.description,
    duration: aniListAnime.duration,
    endDate: aniListAnime.endDate,
    episodes: aniListAnime.episodes,
    format: aniListAnime.format,
    relations: aniListAnime.relations?.edges.map((relation) => {
      return {
        relationType: relation.relationType,
        anime: aniListAnimeToAnimeMapper(relation.node),
      };
    }),
    season: aniListAnime.season,
    seasonYear: aniListAnime.seasonYear,
    staff: aniListAnime.staff?.edges.map((staff) => {
      return {
        image: staff.node.image.large,
        name: staff.node.name.full,
        language: staff.node.languageV2,
        role: staff.role,
      };
    }),
    studios: aniListAnime.studios?.edges.map((studio) => {
      return { id: studio.id, name: studio.node.name, isMain: studio.isMain };
    }),
    source: aniListAnime.source,
    startDate: aniListAnime.startDate,
  };
};
