import { getAnimeById } from "../data";

export default function HomePage() {
  const anime = getAnimeById(1575);

  return (
    <>
      <pre>
        <code>{JSON.stringify(anime, null, 4)}</code>
      </pre>
    </>
  );
}
