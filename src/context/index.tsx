import { ReactNode } from "react";
import { DisciplinaProvider } from "./DisciplinaContext";
import { AssuntoProvider } from "./AssuntoContext";
import { CategoriaProvider } from "./CategoriaContext";

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => (
  <CategoriaProvider>
    <AssuntoProvider>
      <DisciplinaProvider>{children}</DisciplinaProvider>
    </AssuntoProvider>
  </CategoriaProvider>
);
