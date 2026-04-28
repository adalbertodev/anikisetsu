import type { Anime, AnimeFiltersView } from "../../types";
import { AnimeCard, AnimeCardExtended } from "../ui";

interface AnimeGridProps {
  animes: Anime[];
  view?: AnimeFiltersView;
  emptyMessage?: string;
  isLoading?: boolean;
}

export const AnimeGrid = ({
  animes,
  view = "cover",
  emptyMessage = "No se encontraron animes.",
  isLoading = false,
}: AnimeGridProps) => {
  const isEmpty = animes.length === 0;

  return (
    <section
      className="anime-grid"
      data-view={view}
      aria-live="polite"
      aria-busy={isLoading}
    >
      {isEmpty ? (
        <p className="anime-grid__empty">{emptyMessage}</p>
      ) : (
        <ul className="anime-grid__animes" role="list">
          {animes.map((anime) => (
            <li key={anime.id}>
              {view === "chart" ? (
                <AnimeCardExtended anime={anime} />
              ) : (
                <AnimeCard anime={anime} />
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};
