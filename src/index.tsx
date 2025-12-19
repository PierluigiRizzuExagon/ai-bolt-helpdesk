import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HelpCenter } from "./components/HelpCenter";

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <HelpCenter />
  </StrictMode>,
);
