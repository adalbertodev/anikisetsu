import { useId, useRef, useState } from "react";

interface SearchProps {
  value?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  isHeader?: boolean;
  placeholder?: string;
  ariaLabel?: string;
}

export const Search = ({
  value = "",
  onChange,
  onSubmit,
  isHeader = false,
  placeholder = "Buscar...",
  ariaLabel = "Buscar animes",
}: SearchProps) => {
  const [inputValue, setInputValue] = useState(value);

  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = e.target.value;

    onChange?.(next);
    setInputValue(next);
  };

  const handleReset = () => {
    onChange?.("");
    setInputValue("");

    inputRef.current?.focus();
  };

  return (
    <form
      role="search"
      className={["search", `${isHeader && "search--header"}`].join(" ")}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.(inputValue);
      }}
    >
      <label htmlFor={inputId} className="sr-only">
        {ariaLabel}
      </label>

      <div className="search__container state-layer state-layer--has-child">
        <span className="search__icon search__icon--search" aria-hidden="true">
          <span className="material-symbols-outlined" aria-hidden="true">
            search
          </span>
        </span>

        <input
          id={inputId}
          className="search__input"
          type="text"
          ref={inputRef}
          value={inputValue}
          onChange={handleChange}
          placeholder={placeholder}
        />

        {inputValue.length > 0 && (
          <button
            className="search__icon search__icon--close state-layer state-layer--absolute"
            type="button"
            aria-label="Limpiar búsqueda"
            onMouseDown={(e) => e.preventDefault()}
            onClick={handleReset}
          >
            <span className="material-symbols-outlined" aria-hidden="true">
              close
            </span>
          </button>
        )}
      </div>
    </form>
  );
};
