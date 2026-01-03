import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { PerguntaProvider } from "./context/PerguntaContext";
import { DisciplinaProvider } from "./context/DisciplinaContext";
import { AssuntoProvider } from "./context/AssuntoContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <PerguntaProvider>
        <AssuntoProvider>
          <DisciplinaProvider>
            <App />
          </DisciplinaProvider>
        </AssuntoProvider>
      </PerguntaProvider>
    </BrowserRouter>
  </React.StrictMode>
);
