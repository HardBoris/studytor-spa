import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { localApi as api } from "../services/api";
import { useAuth } from "./UserContext";

interface DisciplinaProviderProps {
  children: ReactNode;
}

export interface Disciplina {
  disciplinaId?: string;
  disciplina: string;
}

interface DisciplinaContextData {
  disciplinas: Disciplina[];
  DisciplinasLoader: () => void;
  NewDiscipline: (data: Disciplina) => void;
}

export const DisciplinaContext = createContext<DisciplinaContextData>(
  {} as DisciplinaContextData,
);

const useDisciplina = () => useContext(DisciplinaContext);

const DisciplinaProvider = ({ children }: DisciplinaProviderProps) => {
  const { token } = useAuth();
  const [disciplinas, setDisciplinas] = useState([]);

  const DisciplinasLoader = async () => {
    await api
      .get("/disciplinas", {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setDisciplinas(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    DisciplinasLoader();
  }, []);

  const NewDiscipline = (data: Disciplina) => {
    api
      .post("/disciplinas/register", data, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => console.log(error));
  };

  return (
    <DisciplinaContext.Provider
      value={{
        disciplinas,
        DisciplinasLoader,
        NewDiscipline,
      }}
    >
      {children}
    </DisciplinaContext.Provider>
  );
};

export { useDisciplina, DisciplinaProvider };
