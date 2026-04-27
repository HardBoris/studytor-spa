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
  disciplina?: string;
  nivel?: string;
  assunto?: string;
  categoria?: string;
  institution?: string;
  user?: string;
}

/* export interface PerguntaNovaInfo {
  disciplina: string;
  nivel: string;
  assunto: string;
  categoria: string;
  pergunta: string;
} */

interface PerguntaContextData {
  perguntas: Pergunta[];
  PerguntasLoader: () => void;
  NewQuestion: (info: Pergunta) => void;
  setQuestions: (data: Pergunta[]) => void;
  NewQuestionsArray: (data: Pergunta[]) => void;
  estaPergunta: string;
}

export const PerguntaContext = createContext<PerguntaContextData>(
  {} as PerguntaContextData,
);

const usePergunta = () => useContext(PerguntaContext);

const PerguntaProvider = ({ children }: PerguntaProviderProps) => {
  const [perguntas, setPerguntas] = useState<Pergunta[]>([]);
  const [questions, setQuestions] = useState<Pergunta[]>([]);
  const { institution, token, user } = useAuth();
  const [estaPergunta, setEstaPergunta] = useState("");

  const PerguntasLoader = async () => {
    await api
      .get("/:institutionId/perguntas", {
        headers: { authorization: `Bearer ${token}` },
      })
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

  const NewQuestion = (data: Pergunta) => {
    api
      .post(
        "/:institutionId/perguntas/register",
        {
          ...data,
          institution: institution.institutionId,
          user: user.userId,
        },
        { headers: { authorization: `Bearer ${token}` } },
      )
      .then((response) => {
        console.log(response.data.perguntaId);
        setEstaPergunta(response.data.perguntaId);
      })
      .catch((error) => console.log(error));
  };

  const NewQuestionsArray = (data: Pergunta[]) => {
    questions && Promise.all(questions.map((item) => NewQuestion(item)));
  };

  return (
    <PerguntaContext.Provider
      value={{
        perguntas,
        PerguntasLoader,
        NewQuestion,
        NewQuestionsArray,
        estaPergunta,
        setQuestions,
      }}
    >
      {children}
    </PerguntaContext.Provider>
  );
};

export { usePergunta, PerguntaProvider };
