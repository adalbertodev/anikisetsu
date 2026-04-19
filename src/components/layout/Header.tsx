import { Link } from "react-router";
import { Search } from "../ui";
import { TopNav } from "./TopNav";
import { DrawerNav } from "./DrawerNav";
import { BottomNav } from "./BottomNav";

export const Header = () => {
  return (
    <header className="header">
      <div className="header__container">
        <Link
          className="header__brand"
          to="/"
          aria-label="AniKisetsu - Ir al inicio"
        >
          <span className="header__brand-logo" aria-hidden="true">
            🌸
          </span>
          <span className="header__brand-name">AniKisetsu</span>
        </Link>

        <Search />

        <BottomNav />
        <DrawerNav />
        <TopNav />
      </div>
    </header>
  );
};
