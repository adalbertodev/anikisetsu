import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router";
import { NAV_ITEMS } from "./navItems";

export const DrawerNav = () => {
  const [isDrawerActive, setIsDrawerActive] = useState(false);

  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const drawerRef = useRef<HTMLElement>(null);

  const toggleDrawer = () => {
    setIsDrawerActive((isDrawerActive) => !isDrawerActive);
  };

  useEffect(() => {
    if (!isDrawerActive) return;

    const onKeydown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsDrawerActive(false);
      }
    };

    document.addEventListener("keydown", onKeydown);

    return () => document.removeEventListener("keydown", onKeydown);
  }, [isDrawerActive]);

  useEffect(() => {
    if (isDrawerActive) {
      const firstLink =
        drawerRef.current?.querySelector<HTMLElement>(".drawer-nav__link");
      firstLink?.focus();
    } else {
      menuButtonRef.current?.focus();
    }
  }, [isDrawerActive]);

  useEffect(() => {
    if (!isDrawerActive) return;
    const onKeydown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const focusables =
        drawerRef.current?.querySelectorAll<HTMLElement>(".drawer-nav__link");
      if (!focusables || focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeydown);
    return () => document.removeEventListener("keydown", onKeydown);
  }, [isDrawerActive]);

  return (
    <>
      <button
        className="drawer-nav__menu-button state-layer"
        ref={menuButtonRef}
        type="button"
        aria-label="Abrir menú"
        aria-expanded={isDrawerActive}
        aria-controls="drawer-nav"
        onClick={toggleDrawer}
      >
        <span className="material-symbols-outlined" aria-hidden="true">
          menu
        </span>
      </button>

      <nav
        id="drawer-nav"
        className={`drawer-nav${isDrawerActive ? " drawer-nav--open" : ""}`}
        ref={drawerRef}
        aria-label="Principal"
        aria-modal={isDrawerActive ? "true" : undefined}
        role={isDrawerActive ? "dialog" : undefined}
      >
        <ul className="drawer-nav__list">
          {NAV_ITEMS.map((navItem) => (
            <li
              key={navItem.to}
              className="drawer-nav__item state-layer state-layer--has-child"
            >
              <NavLink
                className={({ isActive }) =>
                  `drawer-nav__link${isActive ? " active state-layer--secondary" : ""}`
                }
                to={navItem.to}
                onClick={() => setIsDrawerActive(false)}
              >
                <span
                  className="material-symbols-outlined icon--filled"
                  aria-hidden="true"
                >
                  {navItem.icon}
                </span>
                {navItem.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Scrim: click cierra el drawer (UX ratón). El equivalente teclado
          es Escape, gestionado arriba. aria-hidden porque los lectores no
          deberían anunciar este overlay como un control. */}
      <div
        className={`drawer-nav__scrim${isDrawerActive ? " drawer-nav__scrim--visible" : ""}`}
        onClick={toggleDrawer}
        aria-hidden="true"
      ></div>
    </>
  );
};
