import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/reset.css";
import "./styles/index.css";
import "./styles/global.css";
import App from "./App";
import { Provider } from "./context/GlobalContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider>
    <App />
  </Provider>
);
