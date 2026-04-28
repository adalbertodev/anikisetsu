interface FilterChipProps {
  label: string;
  onRemove: () => void;
}

export const FilterChip = ({ label, onRemove }: FilterChipProps) => {
  return (
    <button
      className="filter-chip state-layer state-layer--secondary"
      type="button"
      aria-label={`Quitar filtro ${label}`}
      onClick={onRemove}
    >
      <span className="filter-chip__label">{label}</span>

      <span className="filter-chip__close-icon" aria-hidden="true">
        <span className="material-symbols-outlined">close</span>
      </span>
    </button>
  );
};
