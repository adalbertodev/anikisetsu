import { useId } from "react";
import type { Anime } from "../../types";
import { getMainStudioName } from "../../utils";

interface AnimeHeaderSectionProps {
  anime: Anime;
}

export const AnimeHeaderSection = ({ anime }: AnimeHeaderSectionProps) => {
  const headingId = useId();

  const mainStudio = getMainStudioName(anime.studios);

  return (
    <section className="anime-header" aria-labelledby={headingId}>
      <img
        className="anime-header__banner"
        src={anime.bannerImage ?? "/image-placeholder.png"}
        alt=""
        loading="eager"
      />

      <div className="anime-header__content">
        <div className="anime-header__cover-container">
          <img
            className="anime-header__cover"
            src={anime.coverImage ?? "/image-placeholder.png"}
            alt=""
            loading="eager"
          />
        </div>

        <div className="anime-header__info">
          <div className="anime-header__title-container">
            <h1 id={headingId} className="anime-header__title">
              {anime.title.romaji}
            </h1>

            <span className="anime-header__jp-title">{anime.title.native}</span>
          </div>

          <div className="anime-header__meta">
            {anime.averageScore != null && (
              <span
                className="anime-header__score"
                aria-label={`Puntuación: ${(anime.averageScore / 10).toFixed(1)} sobre 10`}
              >
                <span aria-hidden="true">
                  ★ {(anime.averageScore / 10).toFixed(1)}
                </span>
              </span>
            )}

            {anime.format != null && (
              <span className="anime-header__format-episodes">
                {anime.format}
                {anime.episodes != null && (
                  <>
                    <span aria-hidden="true">{" · "}</span>
                    {anime.episodes} episodios
                  </>
                )}
              </span>
            )}

            {mainStudio && (
              <span className="anime-header__studio">{mainStudio}</span>
            )}
          </div>

          {anime.description && (
            <p
              className="anime-header__description"
              dangerouslySetInnerHTML={{
                __html: anime.description,
              }}
            />
          )}
        </div>
      </div>
    </section>
  );
};
