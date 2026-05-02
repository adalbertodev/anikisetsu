import { Link, useParams } from "react-router";
import { getAnimeById, getPopularityRank } from "../data";
import { useEffect } from "react";
import {
  AnimeAsideSection,
  AnimeContentSection,
  AnimeHeaderSection,
} from "../components/sections";

export default function AnimePage() {
  const { id } = useParams<{ id: string }>();
  const numericId = Number.parseInt(id ?? "", 10);
  const anime = Number.isFinite(numericId) ? getAnimeById(numericId) : null;
  const popularityRank = anime ? getPopularityRank(anime.id) : null;

  useEffect(() => {
    document.title = `${anime ? anime.title.romaji : "No encontrado"} · AniKisetsu`;
  }, [anime]);

  if (!anime) {
    return (
      <section className="not-found">
        <title>Anime no encontrado · AniKisetsu</title>
        <h1>Anime no encontrado</h1>
        <p>
          <Link to="/animes">← Volver al directorio</Link>
        </p>
      </section>
    );
  }

  return (
    <article className="anime-page">
      <AnimeHeaderSection anime={anime} />

      <div className="anime-page__content">
        <AnimeAsideSection anime={anime} />

        <AnimeContentSection anime={anime} popularityRank={popularityRank} />
      </div>
    </article>
  );
}
