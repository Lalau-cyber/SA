import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { EstudanteProvider } from "./context/EstudanteContext.jsx";
import "./App.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <EstudanteProvider>
        <App />
      </EstudanteProvider>
    </BrowserRouter>
  </React.StrictMode>
);