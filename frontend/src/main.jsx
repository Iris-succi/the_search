import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { CurrentUserContextProvider } from "./context/userContext";

import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <CurrentUserContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </CurrentUserContextProvider>
);
