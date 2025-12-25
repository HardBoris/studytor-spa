import { ReactNode } from "react";
import { DisciplinaProvider } from "./DisciplinaContext";
import { AssuntoProvider } from "./AssuntoContext";

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => (
  <AssuntoProvider>
    <DisciplinaProvider>{children}</DisciplinaProvider>
  </AssuntoProvider>
);
