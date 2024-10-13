import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import ToastcontextProvider from "./context/toast-context.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ToastcontextProvider maxToast={5}>
      <App />
    </ToastcontextProvider>
  </StrictMode>
);
