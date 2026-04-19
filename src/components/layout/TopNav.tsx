import { NavLink } from "react-router";
import { NAV_ITEMS } from "./navItems";

export const TopNav = () => {
  return (
    <nav className="top-nav" aria-label="Principal">
      <ul className="top-nav__list">
        {NAV_ITEMS.map((navItem) => (
          <li className="top-nav__item state-layer state-layer--has-child">
            <NavLink key={navItem.to} className="top-nav__link" to={navItem.to}>
              {navItem.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
