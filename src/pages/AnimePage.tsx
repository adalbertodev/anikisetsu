import { Link, useParams } from "react-router";
import { getAnimeById } from "../data";

export default function AnimePage() {
  const { id } = useParams<{ id: string }>();
  const numericId = Number(id);
  const anime = Number.isFinite(numericId) ? getAnimeById(numericId) : null;

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
    <>
      <h1>{anime.title.romaji}</h1>
      <p>
        <Link to="/animes">← Directorio</Link>
      </p>
      <pre>
        <code>{JSON.stringify(anime, null, 2)}</code>
      </pre>
    </>
  );
}
