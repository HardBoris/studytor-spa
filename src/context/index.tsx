import { ReactNode } from "react";
import { DisciplinaProvider } from "./DisciplinaContext";
import { AssuntoProvider } from "./AssuntoContext";
import { CategoriaProvider } from "./CategoriaContext";
import { PerguntaProvider } from "./PerguntaContext";
import { RespostaProvider } from "./RespostaContext";

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => (
  <RespostaProvider>
    <PerguntaProvider>
      <CategoriaProvider>
        <AssuntoProvider>
          <DisciplinaProvider>{children}</DisciplinaProvider>
        </AssuntoProvider>
      </CategoriaProvider>
    </PerguntaProvider>
  </RespostaProvider>
);
