import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";

const loader = document.getElementById("app-loader");
if (loader) {
  loader.style.opacity = "0";
  loader.style.visibility = "hidden";
  setTimeout(() => loader.remove(), 600);
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// redeploy