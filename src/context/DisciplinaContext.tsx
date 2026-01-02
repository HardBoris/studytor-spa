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
  DisciplinasLoader: () => void;
  NewDiscipline: (data: Disciplina) => void;
  disciplinesList: string[];
}

export const DisciplinaContext = createContext<DisciplinaContextData>(
  {} as DisciplinaContextData
);

const useDisciplina = () => useContext(DisciplinaContext);

const DisciplinaProvider = ({ children }: DisciplinaProviderProps) => {
  const [disciplinas, setDisciplinas] = useState([]);
  const [disciplinesList, setDisciplinesList] = useState([]);

  const DisciplinasLoader = async () => {
    await api
      .get("/disciplinas")
      .then((response) => {
        setDisciplinas(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  /* const objectToArray = () => {
    let nuevaLista;
    nuevaLista = disciplinas.map((item) => item.disciplina);
    nuevaLista = Object.values(nuevaLista);
    setDisciplinesList(nuevaLista);
  }; */

  useEffect(() => {
    DisciplinasLoader();
  }, []);

  const NewDiscipline = (data: Disciplina) => {
    api
      .post("/disciplinas/register", data)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => console.log(error));
  };

  /*function objectToArray(object: Array<Disciplina>, array: Array<string>) {
    for (let i = 0; i < object.length; i++) {
      const element = object[i].disciplina;
      array.push(element);
    }
    return array;
  }

  const disciplinesArray = setDisciplinesList(
    objectToArray(disciplinas, disciplinesList)
  );*/

  return (
    <DisciplinaContext.Provider
      value={{
        disciplinas,
        DisciplinasLoader,
        NewDiscipline,
        disciplinesList,
      }}
    >
      {children}
    </DisciplinaContext.Provider>
  );
};

export { useDisciplina, DisciplinaProvider };
