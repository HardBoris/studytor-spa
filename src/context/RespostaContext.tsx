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
  estaCerto?: boolean;
  perguntaId?: string;
}

export interface Respostas {
  respostas: Resposta[] | undefined;
}

interface RespostaContextData {
  respostas: Resposta[];
  RespostasList: () => void;
  NewAnswer: (info: Resposta) => void;
}

export const RespostaContext = createContext<RespostaContextData>(
  {} as RespostaContextData,
);

const useResposta = () => useContext(RespostaContext);

const RespostaProvider = ({ children }: RespostaProviderProps) => {
  const [respostas, setRespostas] = useState<Resposta[]>([]);
  const { institution, token } = useAuth();
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
        },
        { headers: { authorization: `Bearer ${token}` } },
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    RespostasList();
  }, []);

  return (
    <RespostaContext.Provider
      value={{
        respostas,
        RespostasList,
        NewAnswer,
      }}
    >
      {children}
    </RespostaContext.Provider>
  );
};

export { useResposta, RespostaProvider };
