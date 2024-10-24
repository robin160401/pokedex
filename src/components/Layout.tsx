import { Outlet } from "react-router-dom";
import { useThemeContext } from "../contexts/themeContext";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout() {
  const { theme } = useThemeContext();
  return (

    <div className={`theme theme--${theme}`}>
      <Header />
      <Outlet />
      <Footer />

    </div>
  );
}
