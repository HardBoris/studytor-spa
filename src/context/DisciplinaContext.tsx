import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { localApi as api } from "../services/api";

interface DisciplinaProviderProps {
  children: ReactNode;
}

export interface Disciplina {
  disciplinaId?: string;
  disciplina: string;
}

interface DisciplinaContextData {
  disciplinas: Disciplina[];
  DisciplinasList: () => void;
}

export const DisciplinaContext = createContext<DisciplinaContextData>(
  {} as DisciplinaContextData
);

const useDisciplina = () => useContext(DisciplinaContext);

const DisciplinaProvider = ({ children }: DisciplinaProviderProps) => {
  const [disciplinas, setDisciplinas] = useState<Disciplina[]>([]);

  const DisciplinasList = async () => {
    await api
      .get("/studytor-api/disciplinas")
      .then((response) => {
        setDisciplinas(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    DisciplinasList();
  }, []);

  return (
    <DisciplinaContext.Provider
      value={{
        disciplinas,
        DisciplinasList,
      }}
    >
      {children}
    </DisciplinaContext.Provider>
  );
};

export { useDisciplina, DisciplinaProvider };
