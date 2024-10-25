import { Outlet } from "react-router-dom";
import { useThemeContext } from "../contexts/themeContext";
import Header from "./Header";
import Footer from "./Footer";
import { Loading } from "../pages/Loading";
import { useEffect, useState } from "react";

export default function Layout() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(!loading);
    }, 3000);
  }, []);
  const { theme } = useThemeContext();
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className={`theme theme--${theme}`}>
          <Header />
          <Outlet />
          <Footer />
        </div>
      )}
    </>
  );
}
