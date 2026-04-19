import { useEffect, useState } from "react";
import { NavLink } from "react-router";
import { NAV_ITEMS } from "./navItems";

export const DrawerNav = () => {
  const [isDrawerActive, setIsDrawerActive] = useState(false);

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

  return (
    <>
      <button
        className="drawer-nav__menu-button state-layer"
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
        aria-label="Principal"
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

      <div
        className={`drawer-nav__scrim${isDrawerActive ? " drawer-nav__scrim--visible" : ""}`}
        onClick={toggleDrawer}
      ></div>
    </>
  );
};
