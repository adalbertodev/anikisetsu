import { Link } from "react-router";
import type { Anime } from "../../types/Anime";
import { Badge } from "./Badge";

const MAX_VISIBLE_GENRES = 2;

interface AnimeCardExtendedProps {
  anime: Anime;
}

export const AnimeCardExtended = ({ anime }: AnimeCardExtendedProps) => {
  return (
    <article className="anime-card--extended">
      <Link className="anime-card--extended__link" to={`/anime/${anime.id}`}>
        <div className="anime-card--extended__cover">
          <span
            className="anime-card--extended__status"
            data-status={anime.status?.toLowerCase()}
            role="img"
            aria-label={anime.status}
          />

          <img
            className="anime-card--extended__image"
            src={anime.coverImage ?? "/image-placeholder.png"}
            alt=""
            role="presentation"
            loading="lazy"
            decoding="async"
          />

          <div className="anime-card--extended__image-overlay">
            <h3 className="anime-card--extended__title">
              {anime.title.romaji}
            </h3>

            <span className="anime-card--extended__studio">
              {anime.studios?.find((studio) => studio.isMain)?.name}
            </span>
          </div>
        </div>

        <div className="anime-card--extended__info">
          <div className="anime-card--extended__data">
            <div className="anime-card--extended__data-header">
              <div className="anime-card--extended__content">
                <span className="anime-card--extended__season">
                  {anime.season} {anime.seasonYear}
                </span>

                <span className="anime-card--extended__format">
                  {anime.format} · {anime.episodes} episodios
                </span>
              </div>

              {anime.averageScore && (
                <span className="anime-card--extended__score">
                  ★ {(anime.averageScore / 10).toFixed(1)}
                </span>
              )}
            </div>

            <p
              className="anime-card--extended__description"
              dangerouslySetInnerHTML={{
                __html: anime.description
                  ? anime.description
                      .replaceAll("<br>", "")
                      .replaceAll("</br>", "")
                  : "",
              }}
            />
          </div>

          <div className="anime-card--extended__genres">
            {anime.genres?.slice(0, MAX_VISIBLE_GENRES).map((genre) => (
              <Badge key={genre} label={genre} />
            ))}
          </div>
        </div>
      </Link>
    </article>
  );
};
