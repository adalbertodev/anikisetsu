import {
  FORMAT_LABELS,
  SEASON_LABELS,
  SORT_LABELS,
  STATUS_LABELS,
  type ActiveFilterChip,
  type AnimeFilters,
  type AnimeFiltersSort,
  type AnimeFiltersView,
  type AnimeFormat,
  type AnimeStatus,
  type Season,
} from "../../types";
import {
  FilterChip,
  FilterSelect,
  Search,
  SortSelect,
  ViewToggle,
} from "../ui";

interface AnimeFiltersSectionProps {
  filters: AnimeFilters;
  options: {
    genres: string[];
    years: number[];
    seasons: readonly Season[];
    formats: readonly AnimeFormat[];
    statuses: readonly AnimeStatus[];
    sorts: readonly AnimeFiltersSort[];
  };
  activeChips: ActiveFilterChip[];
  setSearch: (v: string) => void;
  toggleGenre: (g: string) => void;
  setYear: (y: number | null) => void;
  setSeason: (s: Season | null) => void;
  setFormat: (f: AnimeFormat | null) => void;
  setStatus: (s: AnimeStatus | null) => void;
  setSort: (s: AnimeFiltersSort) => void;
  setView: (v: AnimeFiltersView) => void;
  clearFilters: () => void;
}

export const AnimeFiltersSection = ({
  activeChips,
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
}: AnimeFiltersSectionProps) => {
  return (
    <div className="anime-filters">
      <div className="anime-filters__inputs">
        <div className="filter-select">
          <label className="filter-select__label">Buscar</label>

          <Search value={filters.search} onChange={setSearch} />
        </div>

        <FilterSelect
          label="Géneros"
          multiple
          options={options.genres.map((genre) => ({
            value: genre,
            label: genre,
          }))}
          values={filters.genres}
          onToggle={toggleGenre}
        />
        <FilterSelect
          label="Año"
          options={options.years.map((year) => ({
            value: String(year),
            label: String(year),
          }))}
          value={filters.year === null ? null : String(filters.year)}
          onChange={(v) => setYear(v === null ? null : Number.parseInt(v, 10))}
        />
        <FilterSelect
          label="Temporada"
          options={options.seasons.map((season) => ({
            value: season,
            label: SEASON_LABELS[season],
          }))}
          value={filters.season}
          onChange={setSeason}
        />
        <FilterSelect
          label="Formato"
          options={options.formats.map((format) => ({
            value: format,
            label: FORMAT_LABELS[format],
          }))}
          value={filters.format}
          onChange={setFormat}
        />
        <FilterSelect
          label="Estado de emisión"
          options={options.statuses.map((status) => ({
            value: status,
            label: STATUS_LABELS[status],
          }))}
          value={filters.status}
          onChange={setStatus}
        />
      </div>

      <div className="anime-filters__secondary">
        <div className="anime-filters__filter-tags">
          <div className="anime-filters__filter-tags-icon">
            <span className="material-symbols-outlined">bookmarks</span>
          </div>

          {activeChips.length > 0 && (
            <ul className="anime-filters__genre-tags" role="list">
              {activeChips.map((chip) => (
                <li key={chip.id}>
                  <FilterChip label={chip.label} onRemove={chip.onRemove} />
                </li>
              ))}

              {activeChips.length > 2 && (
                <li>
                  <button
                    type="button"
                    className="anime-filters__clear-all state-layer"
                    onClick={clearFilters}
                  >
                    <span className="anime-filters__clear-all__label">
                      Limpiar todo
                    </span>

                    <span
                      className="anime-filters__clear-all__close-icon"
                      aria-hidden="true"
                    >
                      <span className="material-symbols-outlined">close</span>
                    </span>
                  </button>
                </li>
              )}
            </ul>
          )}
        </div>

        <div className="anime-filters__view">
          <SortSelect
            value={filters.sort}
            onChange={setSort}
            options={options.sorts.map((sort) => ({
              value: sort,
              label: SORT_LABELS[sort],
            }))}
          />
          <ViewToggle
            value={filters.view}
            onChange={setView}
            options={[
              { value: "cover", label: "Vista por portada", icon: "grid_on" },
              { value: "chart", label: "Vista de chart", icon: "tile_small" },
            ]}
          />
        </div>
      </div>
    </div>
  );
};
