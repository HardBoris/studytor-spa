import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { PerguntaProvider } from "./context/PerguntaContext";
import { DisciplinaProvider } from "./context/DisciplinaContext";
import { AssuntoProvider } from "./context/AssuntoContext";
import { CategoriaProvider } from "./context/CategoriaContext";
import { UserProvider } from "./context/UserContext";
import { InstitutionProvider } from "./context/InstitutionContext";
import { RespostaProvider } from "./context/RespostaContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <InstitutionProvider>
          <PerguntaProvider>
            <RespostaProvider>
              <CategoriaProvider>
                <AssuntoProvider>
                  <DisciplinaProvider>
                    <App />
                  </DisciplinaProvider>
                </AssuntoProvider>
              </CategoriaProvider>
            </RespostaProvider>
          </PerguntaProvider>
        </InstitutionProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
