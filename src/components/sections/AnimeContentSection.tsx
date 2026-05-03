import { useId, useMemo } from "react";
import { Link } from "react-router";
import { Badge } from "../ui/Badge";
import { CharacterCard, RelationCard, StaffCard } from "../ui";
import type { Anime, Relation } from "../../types";

const VISIBLE_RELATION_TYPES: Relation["relationType"][] = [
  "PREQUEL",
  "SEQUEL",
  "SIDE_STORY",
  "SPIN_OFF",
];
const VISIBLE_RELATION_FORMAT: Anime["format"][] = [
  "MOVIE",
  "ONA",
  "ONE_SHOT",
  "OVA",
  "SPECIAL",
  "TV",
  "TV_SHORT",
];
const MAX_VISIBLE_CHARACTERS = 6;
const MAX_VISIBLE_STAFF = 3;
const KEY_STAFF_ROLES = [
  "Director",
  "Original Creator",
  "Assistant Director",
] as const;

interface AnimeContentSectionProps {
  anime: Anime;
  popularityRank: number | null;
}

export const AnimeContentSection = ({
  anime,
  popularityRank,
}: AnimeContentSectionProps) => {
  const genresSectionId = useId();
  const relationsSectionId = useId();
  const infoSectionId = useId();
  const charactersSectionId = useId();
  const staffSectionId = useId();
  const scoreSectionId = useId();

  const visibleRelations = useMemo(
    () =>
      [...(anime.relations ?? [])]
        .filter((relation) =>
          VISIBLE_RELATION_FORMAT.includes(relation.anime.format as never),
        )
        .filter((relation) =>
          VISIBLE_RELATION_TYPES.includes(relation.relationType as never),
        )
        .sort((a, b) => (a.anime.seasonYear ?? 0) - (b.anime.seasonYear ?? 0)),
    [anime.relations],
  );

  const visibleCharacters = useMemo(
    () =>
      [...(anime.characters ?? [])]
        .filter(
          (character) =>
            character.role === "MAIN" || character.role === "SUPPORTING",
        )
        .sort((a, b) => a.role.localeCompare(b.role))
        .slice(0, MAX_VISIBLE_CHARACTERS),
    [anime.characters],
  );

  const staffMembers = useMemo(
    () =>
      [...(anime.staff ?? [])]
        .filter((staff) => KEY_STAFF_ROLES.includes(staff.role as never))
        .slice(0, MAX_VISIBLE_STAFF),
    [anime.staff],
  );

  const sortedDistribution = useMemo(
    () =>
      [...(anime.scoreDistribution ?? [])].sort((a, b) => b.score - a.score),
    [anime.scoreDistribution],
  );

  const totalVotes = useMemo(
    () =>
      anime.scoreDistribution?.reduce(
        (totalVotes, scoreDistribution) =>
          totalVotes + scoreDistribution.amount,
        0,
      ),
    [anime],
  );
  const scoreDistributionAmounts = anime.scoreDistribution
    ? anime.scoreDistribution.map((distribution) => distribution.amount)
    : [0];

  const maxVotes = Math.max(...scoreDistributionAmounts);

  return (
    <div className="anime-content">
      {anime.genres && (
        <section
          className="anime-content__section-container"
          aria-labelledby={genresSectionId}
        >
          <div className="anime-content__section-header">
            <h2 id={genresSectionId} className="anime-content__section-title">
              Géneros
            </h2>

            <span className="anime-content__section-line" />
          </div>

          <ul className="anime-content__genres" role="list">
            {anime.genres.map((genre) => (
              <li key={genre}>
                <Badge key={genre} label={genre} />
              </li>
            ))}
          </ul>
        </section>
      )}

      {anime.relations && (
        <section
          className="anime-content__section-container"
          aria-labelledby={relationsSectionId}
        >
          <div className="anime-content__section-header">
            <h2
              id={relationsSectionId}
              className="anime-content__section-title"
            >
              Relaciones
            </h2>

            <span className="anime-content__section-line" />
          </div>

          <ul className="anime-content__relations" role="list">
            {visibleRelations.map((relation) => (
              <li key={relation.anime.id}>
                <Link
                  className="anime-content__relation"
                  to={`/anime/${relation.anime.id}`}
                >
                  <RelationCard relation={relation} />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {(popularityRank ??
        anime.averageScore ??
        (anime.episodes && anime.duration)) && (
        <section
          className="anime-content__section-container"
          aria-labelledby={infoSectionId}
        >
          <div className="anime-content__section-header">
            <h2 id={infoSectionId} className="anime-content__section-title">
              Información
            </h2>

            <span className="anime-content__section-line" />
          </div>

          <ul className="anime-content__info" role="list">
            {popularityRank && (
              <li className="anime-content__info-item">
                <span className="anime-content__info-card-label">
                  Popularidad
                </span>
                <span className="anime-content__info-card-value">
                  #{popularityRank}
                </span>
                <span className="anime-content__info-card-description">
                  Histórico
                </span>
              </li>
            )}

            {anime.averageScore && (
              <li className="anime-content__info-item">
                <span className="anime-content__info-card-label">
                  Puntuación Global
                </span>
                <span
                  className="anime-content__info-card-value anime-content__info-card-value--score"
                  aria-label={`Puntuación: ${(anime.averageScore / 10).toFixed(1)} sobre 10`}
                >
                  <span aria-hidden="true">
                    ★ {(anime.averageScore / 10).toFixed(1)}
                  </span>
                </span>
                <span className="anime-content__info-card-description">
                  {totalVotes?.toLocaleString("es-Es")} votos
                </span>
              </li>
            )}

            {anime.episodes && anime.duration && (
              <li className="anime-content__info-item">
                <span className="anime-content__info-card-label">
                  Duración total
                </span>
                <span className="anime-content__info-card-value">
                  {Math.round(((anime.episodes * anime.duration) / 60) * 10) /
                    10}
                  h
                </span>
                <span className="anime-content__info-card-description">
                  {anime.episodes} episodios &times; {anime.duration} min
                </span>
              </li>
            )}
          </ul>
        </section>
      )}

      {anime.characters && (
        <section
          className="anime-content__section-container"
          aria-labelledby={charactersSectionId}
        >
          <div className="anime-content__section-header">
            <h2
              id={charactersSectionId}
              className="anime-content__section-title"
            >
              Personajes
            </h2>

            <span className="anime-content__section-line" />
          </div>

          <ul className="anime-content__characters" role="list">
            {visibleCharacters.map((character) => (
              <li key={character.name.full}>
                <CharacterCard character={character} />
              </li>
            ))}
          </ul>
        </section>
      )}

      {staffMembers.length > 0 && (
        <section
          className="anime-content__section-container"
          aria-labelledby={staffSectionId}
        >
          <div className="anime-content__section-header">
            <h2 id={staffSectionId} className="anime-content__section-title">
              Personal
            </h2>

            <span className="anime-content__section-line" />
          </div>

          <ul className="anime-content__staff" role="list">
            {staffMembers.map((staff) => (
              <li key={`${staff.name} - ${staff.role}`}>
                <StaffCard staff={staff} />
              </li>
            ))}
          </ul>
        </section>
      )}

      {anime.scoreDistribution && (
        <section
          className="anime-content__section-container"
          aria-labelledby={scoreSectionId}
        >
          <div className="anime-content__section-header">
            <h2 id={scoreSectionId} className="anime-content__section-title">
              Distribución de puntuaciones
            </h2>

            <span className="anime-content__section-line" />
          </div>

          <article className="anime-content__score-distribution-card">
            <div className="anime-content__score-container">
              <span className="anime-content__score">
                {anime.averageScore
                  ? (anime.averageScore / 10).toFixed(1)
                  : "??"}
              </span>
              <span className="anime-content__score-stars">★★★★★</span>
              <span className="anime-content__score-votes">
                {totalVotes?.toLocaleString("es-Es")} votos
              </span>
            </div>

            <ul className="anime-content__score-distribution" role="list">
              {sortedDistribution.map((scoreDistribution) => (
                <li
                  key={scoreDistribution.score}
                  className="anime-content__score-distribution-item"
                >
                  <span className="anime-content__score-distribution-score">
                    {scoreDistribution.score / 10}
                  </span>

                  <meter
                    className="anime-content__score-distribution-bar"
                    value={scoreDistribution.amount}
                    max={maxVotes}
                    aria-label={`Puntuación ${scoreDistribution.score / 10}: ${scoreDistribution.amount.toLocaleString("es-Es")} votos`}
                  >
                    {scoreDistribution.amount}
                  </meter>

                  <span className="anime-content__score-distribution-amount">
                    {scoreDistribution.amount.toLocaleString("es-Es")}
                  </span>
                </li>
              ))}
            </ul>
          </article>
        </section>
      )}
    </div>
  );
};
