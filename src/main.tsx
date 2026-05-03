import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import { Layout } from "./components/layout";
import HomePage from "./pages/HomePage.tsx";
import AnimesPage from "./pages/AnimesPage.tsx";
import AnimePage from "./pages/AnimePage.tsx";
import EstudiosPage from "./pages/EstudiosPage.tsx";

import "./styles/reset.css";
import "./styles/tokens/index.css";
import "./styles/base.css";
import "./styles/utils.css";
import "./styles/components/index.css";

// Layout es el route padre con <Outlet />: cada page hija se renderiza
// dentro del <main> del Layout, conservando header/footer en todas.
const router = createBrowserRouter([
  {
    Component: Layout,
    children: [
      {
        path: "/",
        Component: HomePage,
      },
      {
        path: "/animes",
        Component: AnimesPage,
      },
      {
        path: "/anime/:id",
        Component: AnimePage,
      },

      {
        path: "/estudios",
        Component: EstudiosPage,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
