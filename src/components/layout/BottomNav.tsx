import { NavLink } from "react-router";
import { NAV_ITEMS } from "./navItems";

export const BottomNav = () => {
  return (
    <nav className="bottom-nav" aria-label="Principal">
      <ul className="bottom-nav__list">
        {NAV_ITEMS.map((navItem) => (
          <li key={navItem.to} className="bottom-nav__item">
            <NavLink className="bottom-nav__link" to={navItem.to}>
              {({ isActive }) => (
                <>
                  <div
                    className={`bottom-nav__icon-container state-layer state-layer--has-parent${isActive ? " state-layer--secondary" : ""}`}
                  >
                    <span
                      className="material-symbols-outlined icon--filled"
                      aria-hidden="true"
                    >
                      {navItem.icon}
                    </span>
                  </div>

                  {navItem.label}
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
