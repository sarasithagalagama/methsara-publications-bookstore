import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "@fontsource/noto-sans-sinhala";
import "@fontsource/noto-sans-sinhala/500.css";
import "@fontsource/noto-sans-sinhala/700.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
