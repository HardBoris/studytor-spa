import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { localApi as api } from "../services/api";

interface AssuntoProviderProps {
  children: ReactNode;
}

export interface Assunto {
  assuntoId?: string;
  assunto: string;
}

interface AssuntoContextData {
  assuntos: Assunto[];
  AssuntosList: () => void;
}

export const AssuntoContext = createContext<AssuntoContextData>(
  {} as AssuntoContextData
);

const useAssunto = () => useContext(AssuntoContext);

const AssuntoProvider = ({ children }: AssuntoProviderProps) => {
  const [assuntos, setAssuntos] = useState<Assunto[]>([]);

  const AssuntosList = async () => {
    await api
      .get("/studytor-api/assuntos")
      .then((response) => {
        setAssuntos(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    AssuntosList();
  }, []);

  return (
    <AssuntoContext.Provider
      value={{
        assuntos,
        AssuntosList,
      }}
    >
      {children}
    </AssuntoContext.Provider>
  );
};

export { useAssunto, AssuntoProvider };
