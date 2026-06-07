import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import { AdminAuthProvider } from "./app/contexts/AdminAuthContext";
import "./styles/index.css";

createRoot(document.getElementById("root")!).render(
  <AdminAuthProvider>
    <App />
  </AdminAuthProvider>
);
