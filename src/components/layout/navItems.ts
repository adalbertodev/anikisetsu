export interface NavItem {
  to: string;
  label: string;
  icon: string; // material-symbols ligature
}

export const NAV_ITEMS: NavItem[] = [
  { to: "/", label: "Inicio", icon: "home" },
  { to: "/animes", label: "Animes", icon: "monitor" },
  { to: "/estudios", label: "Estudios", icon: "animation" },
];
