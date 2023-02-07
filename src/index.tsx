import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import home from './App';
import Homescreen from "./components/Homescreen";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Homescreen />
  </React.StrictMode>
);
