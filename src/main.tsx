import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./css/style.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/Homepage";
import { ThemeContextProvider } from "./contexts/themeContext";
import { SearchProvider } from "./contexts/SearchContextProvider";
import DetailsPage from "./pages/DetailsPage";
import PokeDexPage from "./pages/PokeDexPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },

      {
        path: "/search",
        element: "SearchResultsPage",
      },
      {
        path: "/pokemon/:id",
        element: <DetailsPage />,
      },
      {
        path: "/pokedex/:id",
        element: <PokeDexPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeContextProvider>
      <SearchProvider>
        <RouterProvider router={router} />
      </SearchProvider>
    </ThemeContextProvider>
  </StrictMode>
);
