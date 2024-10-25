import { Outlet } from "react-router-dom";
import { useThemeContext } from "../contexts/themeContext";
import Header from "./Header";
import Footer from "./Footer";
import { Loading } from "../pages/Loading";
import { useEffect, useState, useRef } from "react";
import pika from '../assets/mp3/ODcwNzY0MDQzODcwODc1_Ugb8CZehWX0.mp3';

export default function Layout() {
  const [loading, setLoading] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loading && audioRef.current) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((e) => console.error("Playback error:", e));
      }
    }
  }, [loading]);

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
          <audio ref={audioRef} src={pika} autoPlay={false} /> 
        </div>
      )}
    </>
  );
}


