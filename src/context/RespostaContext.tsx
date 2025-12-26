import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { localApi as api } from "../services/api";

interface RespostaProviderProps {
  children: ReactNode;
}

export interface Resposta {
  respostaId?: string;
  resposta: string;
}

export interface Respostas {
  respostas: Resposta[];
}

interface RespostaContextData {
  respostas: Resposta[];
  RespostasList: () => void;
}

export const RespostaContext = createContext<RespostaContextData>(
  {} as RespostaContextData
);

const useResposta = () => useContext(RespostaContext);

const RespostaProvider = ({ children }: RespostaProviderProps) => {
  const [respostas, setRespostas] = useState<Resposta[]>([]);

  const RespostasList = async () => {
    await api
      .get("/studytor-api/respostas")
      .then((response) => {
        setRespostas(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    RespostasList();
  }, []);

  return (
    <RespostaContext.Provider
      value={{
        respostas,
        RespostasList,
      }}
    >
      {children}
    </RespostaContext.Provider>
  );
};

export { useResposta, RespostaProvider };
