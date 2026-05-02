import { Link } from "react-router";
import type { Anime } from "../../types";
import { StatusBadge } from "../ui";
import { formatDate } from "../../utils";

interface AnimeAsideSectionProps {
  anime: Anime;
}

export const AnimeAsideSection = ({ anime }: AnimeAsideSectionProps) => {
  const NO_DATA = "—";
  const mainStudio = anime.studios?.find((studio) => studio.isMain);
  const startDate = formatDate(
    anime.startDate?.day,
    anime.startDate?.month,
    anime.startDate?.year,
  );
  const endDate = formatDate(
    anime.endDate?.day,
    anime.endDate?.month,
    anime.endDate?.year,
  );

  return (
    <aside className="anime-aside">
      <dl className="anime-aside__languages">
        <div className="anime-aside__language">
          <dt className="anime-aside__language-label">English</dt>
          <dd className="anime-aside__language-value">
            {anime.title.english ?? NO_DATA}
          </dd>
        </div>
      </dl>

      <dl className="anime-aside__meta">
        <div className="anime-aside__metadata">
          <dt className="anime-aside__metadata-label">Formato</dt>
          <dd className="anime-aside__metadata-value">
            {anime.format ?? NO_DATA}
          </dd>
        </div>

        <div className="anime-aside__metadata">
          <dt className="anime-aside__metadata-label">Episodios</dt>
          <dd className="anime-aside__metadata-value">
            {anime.episodes ?? NO_DATA}
          </dd>
        </div>

        <div className="anime-aside__metadata">
          <dt className="anime-aside__metadata-label">Duración</dt>
          <dd className="anime-aside__metadata-value">
            {anime.duration ?? NO_DATA} min / ep.
          </dd>
        </div>

        <div className="anime-aside__metadata">
          <dt className="anime-aside__metadata-label">Temporada</dt>
          <dd className="anime-aside__metadata-value">
            <Link
              className="anime-aside__metadata-value"
              to={`/animes?season=${anime.season}&seasonYear=${anime.seasonYear}`}
            >
              {anime.season ?? NO_DATA} {anime.seasonYear ?? NO_DATA}
            </Link>
          </dd>
        </div>

        <div className="anime-aside__metadata">
          <dt className="anime-aside__metadata-label">Estado</dt>
          <dd className="anime-aside__metadata-value">
            <StatusBadge status={anime.status} />
          </dd>
        </div>

        <div className="anime-aside__metadata">
          <dt className="anime-aside__metadata-label">Fuente</dt>
          <dd className="anime-aside__metadata-value">
            {anime.source ?? NO_DATA}
          </dd>
        </div>

        <div className="anime-aside__metadata">
          <dt className="anime-aside__metadata-label">Estudio</dt>
          <dd className="anime-aside__metadata-value">
            <Link
              className="anime-aside__metadata-value"
              to={`/studio/${mainStudio?.id}`}
            >
              {mainStudio?.name ?? NO_DATA}
            </Link>
          </dd>
        </div>

        <div className="anime-aside__metadata">
          <dt className="anime-aside__metadata-label">Productora</dt>
          <dd className="anime-aside__metadata-value">
            {anime.studios?.find((studio) => !studio.isMain)?.name ?? NO_DATA}
          </dd>
        </div>

        <div className="anime-aside__metadata">
          <dt className="anime-aside__metadata-label">Inicio</dt>
          <dd className="anime-aside__metadata-value">
            {startDate ?? NO_DATA}
          </dd>
        </div>

        <div className="anime-aside__metadata">
          <dt className="anime-aside__metadata-label">Fin</dt>
          <dd className="anime-aside__metadata-value">{endDate ?? NO_DATA}</dd>
        </div>
      </dl>
    </aside>
  );
};
