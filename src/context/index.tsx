import { ReactNode } from "react";
import { DisciplinaProvider } from "./DisciplinaContext";

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => (
  <DisciplinaProvider>{children}</DisciplinaProvider>
);
