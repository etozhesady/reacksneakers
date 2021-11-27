import React from "react";
import { BrowserRouter as Router, Routes } from "react-router-dom";
import ReactDOM from "react-dom";

import "macro-css";
import "./index.scss";

import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
