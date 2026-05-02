import type { Relation } from "../../types";
import { getMainStudioName } from "../../utils";

interface RelationCardProps {
  relation: Relation;
}

export const RelationCard = ({ relation }: RelationCardProps) => {
  const mainStudio = getMainStudioName(relation.anime.studios);

  return (
    <article className="relation-card">
      <img
        className="relation-card__cover"
        src={relation.anime.coverImage ?? "/image-placeholder.png"}
        alt=""
        loading="lazy"
      />

      <div className="relation-card__info">
        <span className="relation-card__type">
          {relation.relationType.replace("_", " ")}
        </span>

        <h3 className="relation-card__anime-name">
          {relation.anime.title.romaji}
        </h3>

        <span className="relation-card__meta">
          {relation.anime.format} · {relation.anime.seasonYear} · {mainStudio}
        </span>
      </div>
    </article>
  );
};
