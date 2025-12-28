import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { localApi as api } from "../services/api";

interface PerguntaProviderProps {
  children: ReactNode;
}

export interface Pergunta {
  perguntaId?: string;
  pergunta: string;
}

export interface PerguntaNovaInfo {
  disciplina: string;
  nivel: string;
  asunto: string;
  categoria: string;
  pergunta: string;
  correcta: string;
}

interface PerguntaContextData {
  perguntas: Pergunta[];
  PerguntasList: () => void;
}

export const PerguntaContext = createContext<PerguntaContextData>(
  {} as PerguntaContextData
);

const usePergunta = () => useContext(PerguntaContext);

const PerguntaProvider = ({ children }: PerguntaProviderProps) => {
  const [perguntas, setPerguntas] = useState<Pergunta[]>([]);

  const PerguntasList = async () => {
    await api
      .get("/studytor-api/perguntas")
      .then((response) => {
        setPerguntas(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    PerguntasList();
  }, []);

  return (
    <PerguntaContext.Provider
      value={{
        perguntas,
        PerguntasList,
      }}
    >
      {children}
    </PerguntaContext.Provider>
  );
};

export { usePergunta, PerguntaProvider };
