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
  AssuntosLoader: () => void;
  NewTopic: (data: Assunto) => void;
}

export const AssuntoContext = createContext<AssuntoContextData>(
  {} as AssuntoContextData
);

const useAssunto = () => useContext(AssuntoContext);

const AssuntoProvider = ({ children }: AssuntoProviderProps) => {
  const [assuntos, setAssuntos] = useState([]);

  const AssuntosLoader = async () => {
    await api
      .get("/assuntos")
      .then((response) => {
        setAssuntos(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    AssuntosLoader();
  }, []);

  const NewTopic = (data: Assunto) => {
    api
      .post("/assuntos/register", data)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => console.log(error));
  };

  return (
    <AssuntoContext.Provider
      value={{
        assuntos,
        AssuntosLoader,
        NewTopic,
      }}
    >
      {children}
    </AssuntoContext.Provider>
  );
};

export { useAssunto, AssuntoProvider };
