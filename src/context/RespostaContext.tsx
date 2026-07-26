import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { localApi as api } from "../services/api";
import { useAuth } from "./UserContext";
import { usePergunta } from "./PerguntaContext";

interface RespostaProviderProps {
  children: ReactNode;
}

export interface Resposta {
  respostaId?: string;
  resposta: string;
  estaCerto: boolean;
  perguntaId?: string;
}

export interface TxtResposta {
  Alternativa: string;
  Verdad: boolean;
}

export interface Respostas {
  respostas: Resposta[];
}

interface RespostaContextData {
  respostas: Resposta[];
  RespostasList: () => void;
  NewAnswer: (info: Resposta) => void;
  setAnswers: (data: Resposta[]) => void;
  NewAnswersArray: (data: Resposta[]) => void;
  TxtAnswer: (data: any) => void;
}

export const RespostaContext = createContext<RespostaContextData>(
  {} as RespostaContextData,
);

const useResposta = () => useContext(RespostaContext);

const RespostaProvider = ({ children }: RespostaProviderProps) => {
  const [respostas, setRespostas] = useState<Resposta[]>([]);
  const [answers, setAnswers] = useState<Resposta[]>([]);
  const { institution, token, user } = useAuth();
  const { estaPergunta } = usePergunta();

  const RespostasList = async () => {
    await api
      .get("/:institutionId/respostas")
      .then((response) => {
        setRespostas(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const NewAnswer = (data: Resposta) => {
    console.log(data);
    api
      .post(
        "/:institutionId/respostas/register",
        {
          ...data,
          institution: institution.institutionId,
          pergunta: estaPergunta,
          user: user.userId,
        },
        { headers: { authorization: `Bearer ${token}` } },
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => console.log(error));
  };

  const TxtAnswer = (txt: TxtResposta) => {
    const { Alternativa, Verdad } = txt;
    api
      .post(
        "/:institutionId/respostas/register",
        {
          resposta: txt.Alternativa,
          estaCerto: txt.Verdad,
          institution: institution.institutionId,
          pergunta: estaPergunta,
          user: user.userId,
        },
        { headers: { authorization: `Bearer ${token}` } },
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => console.log(error));
  };

  const NewAnswersArray = (data: Resposta[]) => {
    data && Promise.all(data.map((item) => NewAnswer(item)));
  };

  useEffect(() => {
    RespostasList();
  }, []);

  console.log(token);

  return (
    <RespostaContext.Provider
      value={{
        respostas,
        RespostasList,
        NewAnswer,
        setAnswers,
        NewAnswersArray,
        TxtAnswer,
      }}
    >
      {children}
    </RespostaContext.Provider>
  );
};

export { useResposta, RespostaProvider };
