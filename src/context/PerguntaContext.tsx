import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { localApi as api } from "../services/api";
import { useAuth } from "./UserContext";
import { useParams } from "react-router-dom";

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
  assunto: string;
  categoria: string;
  pergunta: string;
  //correcta: string;
}

interface PerguntaContextData {
  perguntas: Pergunta[];
  PerguntasLoader: () => void;
  NewQuestion: (info: PerguntaNovaInfo) => void;
}

export const PerguntaContext = createContext<PerguntaContextData>(
  {} as PerguntaContextData,
);

const usePergunta = () => useContext(PerguntaContext);

const PerguntaProvider = ({ children }: PerguntaProviderProps) => {
  const [perguntas, setPerguntas] = useState<Pergunta[]>([]);
  const { institution } = useAuth();

  const PerguntasLoader = async () => {
    await api
      .get("/:institutionId/perguntas")
      .then((response) => {
        setPerguntas(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    PerguntasLoader();
  }, []);

  const NewQuestion = (data: PerguntaNovaInfo) => {
    api
      .post("/:institutionId/perguntas/register", {
        ...data,
        institution: institution.institutionId,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => console.log(error));
  };

  return (
    <PerguntaContext.Provider
      value={{
        perguntas,
        PerguntasLoader,
        NewQuestion,
      }}
    >
      {children}
    </PerguntaContext.Provider>
  );
};

export { usePergunta, PerguntaProvider };
