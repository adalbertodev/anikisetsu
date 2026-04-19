import { useRef, useState } from "react";

interface SearchProps {
  onSubmit?: (value: string) => void;
}

export const Search = ({ onSubmit }: SearchProps) => {
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleReset = () => {
    setInputValue("");
    inputRef.current?.focus();
  };

  return (
    <form
      role="search"
      className="search"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.(inputValue);
      }}
    >
      <label htmlFor="search-input" className="sr-only">
        Buscar animes
      </label>

      <div className="search__container state-layer state-layer--has-child">
        <span className="search__icon search__icon--search" aria-hidden="true">
          <span className="material-symbols-outlined" aria-hidden="true">
            search
          </span>
        </span>

        <input
          id="search-input"
          className="search__input"
          type="text"
          ref={inputRef}
          value={inputValue}
          onChange={handleChange}
          placeholder="Buscar..."
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
