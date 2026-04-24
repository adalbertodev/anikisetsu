import { Link } from "react-router";
import type { Anime } from "../../types";
import { Badge } from "./Badge";

const MAX_VISIBLE_GENRES = 4;

interface TopAnimeCard {
  anime: Anime;
  rank: number;
}

export const TopAnimeCard = ({ anime, rank }: TopAnimeCard) => {
  return (
    <article className="top-anime-card">
      <div className="top-anime-card__rank-container">
        <span
          className={[
            "top-anime-card__rank",
            (rank === 1 || rank === 2 || rank === 3) &&
              `top-anime-card__rank--${rank}`,
          ].join(" ")}
        >
          #{rank}
        </span>
      </div>

      <div className="top-anime-card__cover-container">
        <img
          className="top-anime-card__cover"
          src={anime.coverImage ?? "/image-placeholder.png"}
          alt=""
          loading="lazy"
        />
      </div>

      <div className="top-anime-card__info">
        <Link to={`/anime/${anime.id}`}>
          <h3 className="top-anime-card__title">{anime.title.romaji}</h3>
        </Link>

        {anime.genres && (
          <ul className="top-anime-card__genres" role="list">
            {anime.genres.slice(0, MAX_VISIBLE_GENRES).map((genre) => (
              <li key={genre}>
                <Badge label={genre} />
              </li>
            ))}
          </ul>
        )}
      </div>

      {anime.averageScore != null && (
        <div className="top-anime-card__score-container">
          <span className="top-anime-card__score">
            <span aria-hidden="true">★</span>{" "}
            {(anime.averageScore / 10).toFixed(1)}
          </span>

          <span className="top-anime-card__score-users">??? usuarios</span>
        </div>
      )}

      {anime.format && (
        <div className="top-anime-card__format-container">
          <span className="top-anime-card__format">{anime.format}</span>

          {anime.episodes && (
            <span className="top-anime-card__episodes">
              {anime.episodes} episodios
            </span>
          )}
        </div>
      )}

      {anime.season && anime.seasonYear && (
        <div className="top-anime-card__season-container">
          <span className="top-anime-card__season">
            {anime.season} {anime.seasonYear}
          </span>

          {anime.status && (
            <span className="top-anime-card__status">{anime.status}</span>
          )}
        </div>
      )}
    </article>
  );
};
