import { ReactNode } from "react";
import { DisciplinaProvider } from "./DisciplinaContext";
import { AssuntoProvider } from "./AssuntoContext";
import { CategoriaProvider } from "./CategoriaContext";
import { PerguntaProvider } from "./PerguntaContext";
import { RespostaProvider } from "./RespostaContext";
import { UserProvider } from "./UserContext";
import { InstitutionProvider } from "./InstitutionContext";
import { DataProvider } from "./DataContext";

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => (
  <InstitutionProvider>
    <UserProvider>
      <CategoriaProvider>
        <DisciplinaProvider>
          <AssuntoProvider>
            <PerguntaProvider>
              <RespostaProvider>
                <DataProvider>{children}</DataProvider>
              </RespostaProvider>
            </PerguntaProvider>
          </AssuntoProvider>
        </DisciplinaProvider>
      </CategoriaProvider>
    </UserProvider>
  </InstitutionProvider>
);
