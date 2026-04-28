interface ViewToggleOption<T extends string> {
  value: T;
  /** Etiqueta accesible (no se ve). Ej. "Vista por portada". */
  label: string;
  /** Nombre del Material Symbol. Ej. "image", "bar_chart". */
  icon: string;
}

interface ViewToggleProps<T extends string> {
  /** Etiqueta del grupo (no se ve). Ej. "Tipo de vista". */
  ariaLabel?: string;
  value: T;
  onChange: (value: T) => void;
  options: ViewToggleOption<T>[];
}

export const ViewToggle = <T extends string>({
  ariaLabel = "Tipo de vista",
  value,
  onChange,
  options,
}: ViewToggleProps<T>) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const last = options.length - 1;
    const currentIdx = options.findIndex((o) => o.value === value);
    const nextIdx =
      e.key === "ArrowRight"
        ? currentIdx >= last
          ? 0
          : currentIdx + 1
        : currentIdx <= 0
          ? last
          : currentIdx - 1;
    onChange(options[nextIdx].value);
  };

  return (
    <div
      role="radiogroup"
      aria-label={ariaLabel}
      className="view-toggle"
      onKeyDown={handleKeyDown}
    >
      {options.map((option) => {
        const checked = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={checked}
            tabIndex={checked ? 0 : -1}
            aria-label={option.label}
            className="view-toggle__option state-layer"
            data-active={checked || undefined}
            onClick={() => onChange(option.value)}
          >
            <span className="material-symbols-outlined" aria-hidden="true">
              {option.icon}
            </span>
          </button>
        );
      })}
    </div>
  );
};
