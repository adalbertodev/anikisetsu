import { Link } from "react-router";
import { Badge, Carousel, StatusBadge } from "../ui";
import { getMainStudioName } from "../../utils";
import type { Anime } from "../../types";

interface TrendingAnimesSectionProps {
  animes: Anime[];
}

const MAX_VISIBLE_GENRES = 4;

export const TrendingAnimesSection = ({
  animes,
}: TrendingAnimesSectionProps) => {
  if (animes.length === 0) return null;

  return (
    <div className="trending-hero">
      <Carousel label="Animes destacados">
        {animes.map((anime, index) => (
          <article className="trending-hero__slide" key={anime.id}>
            <div className="trending-hero__content">
              <div className="trending-hero__badges">
                <p
                  className="trending-hero__trending"
                  aria-label={`Número ${index + 1} en tendencia`}
                >
                  #{index + 1} Tendencia
                </p>

                {anime.status && <StatusBadge status={anime.status} />}
              </div>

              <div className="trending-hero__title-container">
                <h2 className="trending-hero__title">{anime.title.romaji}</h2>

                <span className="trending-hero__jp-title">
                  {anime.title.native}
                </span>
              </div>

              <div className="trending-hero__meta">
                {anime.averageScore != null && (
                  <span className="trending-hero__score">
                    <span aria-hidden="true">★</span>{" "}
                    {(anime.averageScore / 10).toFixed(1)}
                  </span>
                )}

                {anime.format != null && (
                  <span className="trending-hero__format-episodes">
                    {anime.format}
                    {anime.episodes != null && (
                      <>
                        <span aria-hidden="true">{" · "}</span>
                        {anime.episodes} episodios
                      </>
                    )}
                  </span>
                )}

                {(() => {
                  const mainStudio = getMainStudioName(anime.studios);

                  return (
                    mainStudio && (
                      <span className="trending-hero__studio">
                        {mainStudio}
                      </span>
                    )
                  );
                })()}
              </div>

              {anime.description && (
                <p
                  className="trending-hero__description"
                  dangerouslySetInnerHTML={{
                    __html: anime.description
                      .replaceAll("<br>", "")
                      .replaceAll("</br>", ""),
                  }}
                />
              )}

              <ul className="trending-hero__genres" role="list">
                {anime.genres?.slice(0, MAX_VISIBLE_GENRES).map((genre) => (
                  <li key={genre}>
                    <Badge label={genre} />
                  </li>
                ))}
              </ul>

              <Link
                className="trending-hero__cta state-layer state-layer--primary"
                to={`/anime/${anime.id}`}
              >
                Ver ficha
              </Link>
            </div>

            <div className="trending-hero__media">
              <picture>
                <source
                  media="(min-width: 600px)"
                  srcSet={
                    anime.coverImage ??
                    anime.bannerImage ??
                    "/image-placeholder.png"
                  }
                />
                <img
                  className="trending-hero__cover"
                  src={
                    anime.bannerImage ??
                    anime.coverImage ??
                    "/image-placeholder.png"
                  }
                  alt=""
                  role="presentation"
                  loading={index === 0 ? "eager" : "lazy"}
                  decoding="async"
                />
              </picture>
            </div>
          </article>
        ))}
      </Carousel>
    </div>
  );
};
