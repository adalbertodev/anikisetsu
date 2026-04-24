import {
  AnimePreviewSection,
  TopAnimesSection,
  TrendingAnimesSection,
} from "../components/sections";
import {
  getPopularAllTimeAnimes,
  getPopularNextSeasonAnimes,
  getPopularThisSeasonAnimes,
  getTopAnimes,
  getTrendingAnimes,
} from "../data";

export default function HomePage() {
  const trendingAnimes = getTrendingAnimes().slice(0, 5);
  const popularThisSeasonAnimes = getPopularThisSeasonAnimes().slice(0, 6);
  const popularNextSeasonAnime = getPopularNextSeasonAnimes().slice(0, 6);
  const popularAllTimeAnimes = getPopularAllTimeAnimes().slice(0, 6);
  const topAnimes = getTopAnimes().slice(0, 10);

  return (
    <div className="home-container">
      <TrendingAnimesSection animes={trendingAnimes} />

      <AnimePreviewSection
        title="Popular esta Temporada"
        season="Primavera 2026"
        linkTo="/animes?seasonYear=2026&season=primavera&sort=popular"
        animes={popularThisSeasonAnimes}
      />

      <AnimePreviewSection
        title="Próxima temporada"
        season="Verano 2026"
        linkTo="/animes?seasonYear=2026&season=verano&sort=popular"
        animes={popularNextSeasonAnime}
      />

      <AnimePreviewSection
        title="Lo más popular"
        linkTo="/animes?sort=popular"
        animes={popularAllTimeAnimes}
      />

      <TopAnimesSection animes={topAnimes} />
    </div>
  );
}
