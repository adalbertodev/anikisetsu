import { Outlet } from "react-router";
import { Header } from "./Header";
import { Footer } from "./Footer";

export const Layout = () => (
  <>
    <Header />
    <main id="main-content" className="main">
      <Outlet />
    </main>
    <Footer />
  </>
);
