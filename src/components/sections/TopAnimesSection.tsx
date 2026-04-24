import { Link } from "react-router";
import { useId } from "react";
import { TopAnimeCard } from "../ui";
import type { Anime } from "../../types";

interface TopAnimesSection {
  animes: Anime[];
}

export const TopAnimesSection = ({ animes }: TopAnimesSection) => {
  const headingId = useId();

  return (
    <section className="top-animes" aria-labelledby={headingId}>
      <div className="top-animes__header">
        <h2 id={headingId} className="top-animes__title">
          Top 100 Animes
        </h2>

        <Link
          className="top-animes__view-all state-layer"
          aria-label="Ver el Top 100"
          to={`/animes?sort=averageScore`}
        >
          Ver todos <span aria-hidden="true">→</span>
        </Link>
      </div>

      <ul className="top-animes__animes" role="list">
        {animes.map((anime, index) => (
          <li key={anime.id} className="top-animes__anime">
            <TopAnimeCard anime={anime} rank={index + 1} />
          </li>
        ))}
      </ul>
    </section>
  );
};
