import { RouterProvider } from "react-router";
import { router } from "./routes";
import "./i18n";
import { useEffect } from "react";
import { useTelegramWebApp } from "./hooks/useTelegramWebApp";

export default function App() {
  const telegram = useTelegramWebApp();

  useEffect(() => {
    console.log("TravelCraft AI - Running on platform:", telegram.platform);
    console.log("Telegram User:", telegram.user);
  }, [telegram]);

  return <RouterProvider router={router} />;
}