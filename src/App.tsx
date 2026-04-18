import { getAnimeById } from "./data";

export default function App() {
  const anime = getAnimeById(1575);

  return (
    <>
      <h1>Hello World</h1>
      <pre>
        <code>{JSON.stringify(anime, null, 4)}</code>
      </pre>
    </>
  );
}
