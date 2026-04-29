import "./dashboard.style.css";
import { useAuth } from "../../context/UserContext";
import { useEffect, useState } from "react";
import { BGbutton } from "../../components/BGbutton";
import { BGInput } from "../../components/BGinput";
import { useCategoria } from "../../context/CategoriaContext";
import Papa from "papaparse";
import { useData } from "../../context/DataContext";
//import { useMovement } from "../../context/MovementContext";
//import { useProduct } from "../../context/ProductContext";
//import { Button } from "../../components/Button";
//import { AllMovements } from "./all";
//import { MovementsByProduct } from "./MovementsByProduct/byProduct";
//import { MovementsByUser } from "./MovementsByUser/byUser";

interface movementObject {
  type: string;
  date: string;
  product: string;
  price: string;
  seller: string;
}

interface userObject {
  name: string;
}

interface productObject {
  product: string;
  producer: string;
}

interface Respuesta {
  respuesta: string;
}

interface Pregunta {
  pregunta: string;
  respuestas: Respuesta[];
}

export const NewDashboard = () => {
  const { user, signOut } = useAuth();
  const { categorias, CategoriasLoader } = useCategoria();
  const [txtFile, setTxtFile] = useState<any[]>([]);
  const [csvFile, setCsvFile] = useState<any[]>([]);
  const [bigFile, setBigFile] = useState<any[]>([]);

  useEffect(() => {
    CategoriasLoader();
  }, []);

  const fileHandler = (e: any) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }

    if (file.type === "text/csv") {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          setBigFile(results.data);
        },
      });
    } else if (file.type === "text/plain") {
      let cosa: string = "";
      const fileReader = new FileReader();
      fileReader.readAsText(file);
      fileReader.onload = () => {
        cosa = JSON.stringify(fileReader.result);
        const preguntasTxtArray =
          cosa && cosa.replace(/["]+/g, "").split("\\n\\n\\n");

        const clasificacion =
          preguntasTxtArray && preguntasTxtArray.slice(0, 1)[0].split("\\n");

        const preguntasTxt =
          preguntasTxtArray &&
          preguntasTxtArray.slice(1).map((item) => item.split("\\n"));

        const preguntas =
          preguntasTxt &&
          preguntasTxt.map((item) => ({
            Pergunta: item[0].replace(/\d+.\s\(\d{4}\)\s/, ""),
            Alternativa1: item[1].replace(/\([A-Z]\)/g, "").trim(),
            Alternativa2: item[3].replace(/\([A-Z]\)/g, "").trim(),
            Alternativa3: item[5].replace(/\([A-Z]\)/g, "").trim(),
            Alternativa4: item[7].replace(/\([A-Z]\)/g, "").trim(),
            Alternativa5: item[9] && item[9].replace(/\([A-Z]\)/g, "").trim(),
            Verdad1: item[2],
            Verdad2: item[4],
            Verdad3: item[6],
            Verdad4: item[8],
            Verdad5: item[10] && item[10],
            Categoria: clasificacion && clasificacion[0],
            Nivel: clasificacion && clasificacion[1],
            Disciplina: clasificacion && clasificacion[2],
            Assunto: clasificacion && clasificacion[3],
          }));

        preguntas && setBigFile(preguntas);
      };

      fileReader.onerror = () => {
        console.log(fileReader.error);
      };
    } else {
      console.log("Archivo no soportado");
    }
  };

  useEffect(() => {
    console.log(bigFile);
  }, [bigFile]);

  return (
    <div className="dashboard">
      <div className="dashboard-sheath">
        <div className="file-form">
          <label htmlFor="file">Escolher Arquivo</label>
          <BGInput type="file" name="file" id="file" onChange={fileHandler} />
        </div>
        <div className="file-form sender">
          <BGbutton variant="yes">ENVIAR ARQUIVO</BGbutton>
        </div>
      </div>

      <div className="footer_action">
        <div className="tabs"></div>
        <div className="exit_btn">
          <BGbutton onClick={() => signOut()} variant="warning">
            sair
          </BGbutton>
        </div>
      </div>
    </div>
  );
};
