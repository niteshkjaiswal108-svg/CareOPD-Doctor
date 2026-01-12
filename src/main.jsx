import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import AppContextProvider from "./context/appContext";
import { DoctorContextProvider } from "./Context/DoctorContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppContextProvider>
      <DoctorContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </DoctorContextProvider>
    </AppContextProvider>
  </React.StrictMode>
);
