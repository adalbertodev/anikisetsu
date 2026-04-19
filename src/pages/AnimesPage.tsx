import { Link } from "react-router";
import { getTopAnimes } from "../data";

export default function AnimesPage() {
  const animes = getTopAnimes();

  return (
    <>
      <h1>Directorio</h1>
      <p>
        <Link to="/">← Inicio</Link>
      </p>
      <ul>
        {animes.map((anime) => (
          <li key={anime.id}>
            <Link to={`/anime/${anime.id}`}>{anime.title.romaji}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
