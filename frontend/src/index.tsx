import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import FormFill from "@src/components/FormFill";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <FormFill />
  </StrictMode>
);
