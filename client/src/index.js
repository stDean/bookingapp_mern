import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { SearchContextProvider } from "./context/SearchContext";
import { AuthProvider } from "./context/AuthContext";

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <SearchContextProvider>
          <App />
        </SearchContextProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
