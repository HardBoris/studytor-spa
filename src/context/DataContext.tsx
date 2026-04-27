import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { localApi as api } from "../services/api";
import { useAuth } from "./UserContext";
import Papa from "papaparse";

interface DataProviderProps {
  children: ReactNode;
}

/* export interface Disciplina {
  disciplinaId?: string;
  disciplina: string;
} */

interface DataContextData {
  txtReader: (e: any) => void;
  csvReader: (e: any) => void;
  txtHandler: (e: any) => void;
}

export const DataContext = createContext<DataContextData>(
  {} as DataContextData,
);

const useData = () => useContext(DataContext);

const DataProvider = ({ children }: DataProviderProps) => {
  const { token } = useAuth();
  const [disciplinas, setDisciplinas] = useState([]);
  const [txtFile, setTxtFile] = useState("");
  const [csvFile, setCsvFile] = useState<any[]>([]);

  const txtReader = (e: any) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.readAsText(file);
    fileReader.onload = () => {
      setTxtFile(JSON.stringify(fileReader.result));
    };
    fileReader.onerror = () => {
      console.log(fileReader.error);
    };
  };

  const csvReader = (e: any) => {
    const csvFile = e.target.files[0];
    if (!csvFile) {
      return;
    }
    Papa.parse(csvFile, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        setCsvFile(results.data);
      },
    });
  };

  const txtHandler = (e: any) => {
    const arrayReducer = (parametro: string[][]) => {
      let array = [parametro[0]];

      for (let i = 1; i < parametro.length; i++) {
        const a = array.toString();
        const element = parametro[i];
        const b = element.toString();
        !a.includes(b) && array.push(element);
      }

      return array;
    };

    const preguntasTxtArray =
      txtFile && txtFile.replace(/["]+/g, "").split("\\n\\n\\n");

    const clasificacion =
      preguntasTxtArray && preguntasTxtArray.slice(0, 1)[0].split("\\n");

    const preguntasTxt =
      preguntasTxtArray &&
      preguntasTxtArray.slice(1).map((item) => item.split("\\n"));

    const preguntas =
      preguntasTxt &&
      preguntasTxt.map((item) => ({
        pregunta: item[0].replace(/\d+.\s\(\d{4}\)\s/, ""),
        respostas: item.slice(1).map((cosa) => ({
          respuesta: cosa.replace(/\([A-Z]\)/g, "").trim(),
          estaCerta: false,
        })),
      }));

    const preguntasArray = clasificacion &&
      preguntas && [
        {
          categoria: clasificacion[0],
          nivel: clasificacion[1],
          disciplinas: {
            disciplina: clasificacion[2],
            assuntos: { assunto: clasificacion[3], preguntas: preguntas },
          },
        },
      ];
  };

  return (
    <DataContext.Provider value={{ txtReader, csvReader, txtHandler }}>
      {children}
    </DataContext.Provider>
  );
};

export { useData, DataProvider };
