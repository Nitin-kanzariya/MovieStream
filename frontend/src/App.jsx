import { Outlet, useLocation } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Header from "./pages/Movies/Header";

const App = () => {
  const location = useLocation();
  const showHeader =
    [
      "/",
      "/movies",
      "/movies/favorites",
      "/movies/:id",
      "/profile",
      "/admin/movies/genre",
      "/admin/movies/create",
      "/admin/movies-list",
      "/admin/movies/update/:id",
      "/admin/movies/dashboard",
      "/admin/movies/comments",
      "/about",
      "/admin/movies/top",
      "/admin/movies/update/:id",
    ].includes(location.pathname) ||
    /^\/admin\/movies\/update\/[^/]+$/.test(location.pathname);

  return (
    <>
      <main>
        {showHeader && <Header />}
        <Outlet />
      </main>
    </>
  );
};

export default App;
