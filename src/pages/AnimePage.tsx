import { Link, useParams } from "react-router";
import { getAnimeById } from "../data";
import { useEffect } from "react";

export default function AnimePage() {
  const { id } = useParams<{ id: string }>();
  const numericId = Number(id);
  const anime = Number.isFinite(numericId) ? getAnimeById(numericId) : null;

  useEffect(() => {
    document.title = `${anime ? anime.title.romaji : "No encontrado"} · AniKisetsu`;
  }, [anime]);

  if (!anime) {
    return (
      <>
        <h1>Anime no encontrado</h1>
        <p>
          <Link to="/animes">← Volver al directorio</Link>
        </p>
      </>
    );
  }

  return (
    <div>
      <title>{anime.title.romaji} · AniKisetsu</title>

      <h1>{anime.title.romaji}</h1>
      <p>
        <Link to="/animes">← Directorio</Link>
      </p>
      <pre>
        <code>{JSON.stringify(anime, null, 2)}</code>
      </pre>
    </div>
  );
}
