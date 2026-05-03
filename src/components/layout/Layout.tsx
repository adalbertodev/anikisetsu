import { Outlet } from "react-router";
import { Header } from "./Header";
import { Footer } from "./Footer";

export const Layout = () => (
  <>
    {/* Skip link: invisible hasta recibir foco. Permite a usuarios de
        teclado saltar directamente al <main> sin tabular el header. */}
    <a href="#main-content" className="skip-link">
      Saltar al contenido principal
    </a>

    <Header />

    {/* tabIndex={-1} para que el skip link pueda mover el foco aquí. */}
    <main id="main-content" className="main" tabIndex={-1}>
      <Outlet />
    </main>

    <Footer />
  </>
);
