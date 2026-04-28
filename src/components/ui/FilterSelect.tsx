import { useEffect, useId, useRef, useState } from "react";

interface OptionItem<T extends string> {
  value: T;
  label: string;
}

interface SingleProps<T extends string> {
  multiple?: false;
  value: T | null;
  onChange: (value: T | null) => void;
}

interface MultiProps<T extends string> {
  multiple: true;
  values: T[];
  onToggle: (value: T) => void;
}

type FilterSelectProps<T extends string> = (SingleProps<T> | MultiProps<T>) & {
  /** Etiqueta visible encima del trigger ("Géneros", "Año"...). */
  label: string;
  /** Texto del trigger cuando no hay selección ("Todos"). */
  placeholder?: string;
  /** Opciones disponibles. Importante: ya filtradas / ordenadas por el llamador. */
  options: OptionItem<T>[];
};

export const FilterSelect = <T extends string>(props: FilterSelectProps<T>) => {
  const { label, placeholder = "Todos", options, multiple } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLUListElement>(null);

  const labelId = useId();
  const triggerId = useId();
  const listId = useId();

  const isSelected = (value: T | null): boolean => {
    if (multiple) {
      return value !== null && (props as MultiProps<T>).values.includes(value);
    }
    return (props as SingleProps<T>).value === value;
  };

  const summary = ((): string => {
    if (multiple) {
      const vals = (props as MultiProps<T>).values;
      if (vals.length === 0) return placeholder;
      if (vals.length === 1) {
        return options.find((o) => o.value === vals[0])?.label ?? vals[0];
      }
      return `${vals.length} seleccionados`;
    }
    const v = (props as SingleProps<T>).value;
    if (v === null) return placeholder;
    return options.find((o) => o.value === v)?.label ?? v;
  })();

  const openPanel = (focusFirst = false) => {
    setIsOpen(true);

    if (focusFirst) {
      // Sitúa el activo en la primera opción seleccionada, o en 0 si ninguna.
      const idx = options.findIndex((o) => isSelected(o.value));
      setActiveIndex(idx >= 0 ? idx : 0);
    }
  };

  const closePanel = (returnFocus = true) => {
    setIsOpen(false);

    if (returnFocus) triggerRef.current?.focus();
  };

  useEffect(() => {
    if (!isOpen) return;

    const li = panelRef.current?.children[activeIndex] as
      | HTMLLIElement
      | undefined;
    li?.focus();
  }, [isOpen, activeIndex]);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        !panelRef.current?.contains(target) &&
        !triggerRef.current?.contains(target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isOpen]);

  const selectOption = (option: { value: T | null; label: string }) => {
    if (multiple) {
      // En multi nunca llega null (no hay opción "Todos").
      if (option.value === null) return;
      (props as MultiProps<T>).onToggle(option.value);
      // No cerramos — multi mantiene el panel abierto.
    } else {
      (props as SingleProps<T>).onChange(option.value);
      closePanel();
    }
  };

  const handleTriggerKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    switch (e.key) {
      case "ArrowDown":
      case "ArrowUp":
      case "Enter":
      case " ":
        e.preventDefault();
        openPanel(true);
        break;
    }
  };

  const handleListKeyDown = (e: React.KeyboardEvent<HTMLUListElement>) => {
    const last = options.length - 1;
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex((i) => (i >= last ? 0 : i + 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveIndex((i) => (i <= 0 ? last : i - 1));
        break;
      case "Home":
        e.preventDefault();
        setActiveIndex(0);
        break;
      case "End":
        e.preventDefault();
        setActiveIndex(last);
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        selectOption(options[activeIndex]);
        break;
      case "Escape":
        e.preventDefault();
        closePanel();
        break;
      case "Tab":
        // No preventDefault — dejamos que el Tab haga su trabajo.
        setIsOpen(false);
        break;
    }
  };

  return (
    <div className="filter-select">
      <label id={labelId} htmlFor={triggerId} className="filter-select__label">
        {label}
      </label>

      <button
        ref={triggerRef}
        id={triggerId}
        type="button"
        className="filter-select__trigger state-layer"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listId}
        aria-labelledby={`${labelId} ${triggerId}`}
        onClick={() => (isOpen ? closePanel(false) : openPanel(true))}
        onKeyDown={handleTriggerKeyDown}
      >
        <span className="filter-select__summary">{summary}</span>

        <span className="filter-select__chevron" aria-hidden="true">
          <span className="material-symbols-outlined">expand_more</span>
        </span>
      </button>

      <ul
        ref={panelRef}
        id={listId}
        role="listbox"
        aria-multiselectable={multiple}
        aria-labelledby={labelId}
        className="filter-select__panel"
        hidden={!isOpen}
        onKeyDown={handleListKeyDown}
      >
        {options.map((option, index) => {
          const selected = isSelected(option.value);

          return (
            <li
              // El value puede ser null (la opción "Todos" en single).
              // Convertimos a string para la key.
              key={option.value ?? "__all__"}
              role="option"
              aria-selected={selected}
              tabIndex={index === activeIndex ? 0 : -1}
              className="filter-select__option"
              data-selected={selected || undefined}
              onClick={() => selectOption(option)}
              onMouseMove={() => setActiveIndex(index)}
            >
              <span className="filter-select__option-label">
                {option.label}
              </span>

              {selected && (
                <span
                  className="filter-select__option-check"
                  aria-hidden="true"
                >
                  <span className="material-symbols-outlined">check</span>
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
