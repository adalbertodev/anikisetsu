import { useId } from "react";
import { Link } from "react-router";
import { useGridColumnCount } from "../../hooks";
import type { Anime } from "../../types/Anime";
import { AnimeCard } from "../ui";

interface AnimePreviewSectionProps {
  title: string;
  season?: string;
  linkTo: string;
  animes: Anime[];
}

export const AnimePreviewSection = ({
  title,
  season,
  linkTo,
  animes,
}: AnimePreviewSectionProps) => {
  const [gridRef, gridColumns] = useGridColumnCount(animes.length);
  const animesVisible = animes.slice(0, gridColumns);
  const headingId = useId();

  return (
    <section className="anime-preview-section" aria-labelledby={headingId}>
      <div className="anime-preview-section__header">
        <div className="anime-preview-section__heading">
          <h2 id={headingId} className="anime-preview-section__title">
            {title}
          </h2>

          {season && (
            <span className="anime-preview-section__season">· {season}</span>
          )}
        </div>

        <Link
          className="anime-preview-section__view-all state-layer"
          aria-label={`Ver todos los ${title}`}
          to={linkTo}
        >
          Ver todos <span aria-hidden="true">→</span>
        </Link>
      </div>

      <div className="anime-preview-section__animes" ref={gridRef}>
        {animesVisible.map((anime) => (
          <AnimeCard key={anime.id} anime={anime} />
        ))}
      </div>
    </section>
  );
};
