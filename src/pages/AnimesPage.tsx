import { getAllAnimes } from "../data";
import { AnimeFiltersSection, AnimeGrid } from "../components/sections";
import { useAnimeFilters } from "../hooks";
import { useId } from "react";

export default function AnimesPage() {
  const headingId = useId();
  const allAnimes = getAllAnimes();
  const {
    activeChips,
    filteredAnimes,
    filters,
    options,
    clearFilters,
    setFormat,
    setSearch,
    setSeason,
    setSort,
    setStatus,
    setView,
    setYear,
    toggleGenre,
  } = useAnimeFilters(allAnimes);

  return (
    <section className="animes-container" aria-labelledby={headingId}>
      <title>Directorio · AniKisetsu</title>

      <h1 id={headingId} className="sr-only">
        Directorio
      </h1>

      <AnimeFiltersSection
        activeChips={activeChips}
        filters={filters}
        options={options}
        clearFilters={clearFilters}
        setFormat={setFormat}
        setSearch={setSearch}
        setSeason={setSeason}
        setSort={setSort}
        setStatus={setStatus}
        setView={setView}
        setYear={setYear}
        toggleGenre={toggleGenre}
      />

      <AnimeGrid animes={filteredAnimes} view={filters.view} />
    </section>
  );
}
