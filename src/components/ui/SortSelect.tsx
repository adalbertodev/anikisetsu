import { useEffect, useId, useRef, useState } from "react";

interface OptionItem<T extends string> {
  value: T;
  label: string;
}

interface SortSelectProps<T extends string> {
  ariaLabel?: string; // Etiqueta accesible que precede al valor: "Ordenar por: Popularidad".
  value: T;
  onChange: (value: T) => void;
  options: OptionItem<T>[];
}

export const SortSelect = <T extends string>({
  ariaLabel = "Ordenar por",
  value,
  onChange,
  options,
}: SortSelectProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLUListElement>(null);
  const listId = useId();

  const currentLabel = options.find((o) => o.value === value)?.label ?? value;

  const openPanel = (focusFirst = false) => {
    setIsOpen(true);
    if (focusFirst) {
      const idx = options.findIndex((o) => o.value === value);
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

  const select = (option: OptionItem<T>) => {
    onChange(option.value);
    closePanel();
  };

  const handleTriggerKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (["ArrowDown", "ArrowUp", "Enter", " "].includes(e.key)) {
      e.preventDefault();
      openPanel(true);
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
        select(options[activeIndex]);
        break;
      case "Escape":
        e.preventDefault();
        closePanel();
        break;
      case "Tab":
        setIsOpen(false);
        break;
    }
  };

  return (
    <div className="sort-select">
      <button
        ref={triggerRef}
        type="button"
        className="sort-select__trigger state-layer"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls={listId}
        aria-label={`${ariaLabel}: ${currentLabel}`}
        onClick={() => (isOpen ? closePanel(false) : openPanel(true))}
        onKeyDown={handleTriggerKeyDown}
      >
        <span className="sort-select__icon" aria-hidden="true">
          <span className="material-symbols-outlined">swap_vert</span>
        </span>
        <span className="sort-select__value">{currentLabel}</span>
      </button>

      <ul
        ref={panelRef}
        id={listId}
        role="listbox"
        aria-label={ariaLabel}
        className="sort-select__panel"
        hidden={!isOpen}
        onKeyDown={handleListKeyDown}
      >
        {options.map((option, index) => {
          const selected = option.value === value;
          return (
            <li
              key={option.value}
              role="option"
              aria-selected={selected}
              tabIndex={index === activeIndex ? 0 : -1}
              className="sort-select__option"
              data-selected={selected || undefined}
              onClick={() => select(option)}
              onMouseMove={() => setActiveIndex(index)}
            >
              <span>{option.label}</span>

              {selected && (
                <span className="sort-select__check" aria-hidden="true">
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
