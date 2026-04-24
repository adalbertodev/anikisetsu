import { Link } from "react-router";
import type { Anime } from "../../types/Anime";
import { Badge } from "./Badge";

const MAX_VISIBLE_GENRES = 2;

interface AnimeCardProps {
  anime: Anime;
}

export const AnimeCard = ({ anime }: AnimeCardProps) => {
  return (
    <article className="anime-card">
      <Link className="anime-card__link" to={`/anime/${anime.id}`}>
        <div className="anime-card__cover">
          <span
            className="anime-card__status"
            data-status={anime.status?.toLowerCase()}
            role="img"
            aria-label={anime.status}
          />

          <img
            className="anime-card__image"
            src={anime.coverImage ?? "/image-placeholder.png"}
            alt=""
            role="presentation"
            loading="lazy"
            decoding="async"
          />
        </div>

        <div className="anime-card__info">
          <h3 className="anime-card__title">{anime.title.romaji}</h3>

          <div className="anime-card__genres">
            {anime.genres?.slice(0, MAX_VISIBLE_GENRES).map((genre) => (
              <Badge key={genre} label={genre} />
            ))}
          </div>
        </div>
      </Link>
    </article>
  );
};
