import "./dashboard.style.css";
import { useAuth } from "../../context/UserContext";
import { useEffect, useState } from "react";
import { BGbutton } from "../../components/BGbutton";
import { BGInput } from "../../components/BGinput";
import { useCategoria } from "../../context/CategoriaContext";
import Papa from "papaparse";
import { useResposta } from "../../context/RespostaContext";
import { usePergunta } from "../../context/PerguntaContext";
import { BGformulario } from "../../components/BGformulario";

/* interface movementObject {
  type: string;
  date: string;
  product: string;
  price: string;
  seller: string;
} */

/* interface userObject {
  name: string;
} */

/* interface productObject {
  product: string;
  producer: string;
} */

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
  const { NewQuestionsArray } = usePergunta();
  const { NewAnswersArray, TxtAnswer } = useResposta();
  const [txtFile, setTxtFile] = useState<any[]>([]);
  const [unformatedFile, setUnformatedFile] = useState<any[]>([]);
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
          setUnformatedFile(results.data);
        },
      });
      console.log(unformatedFile);
      const formatedFile =
        unformatedFile &&
        unformatedFile.map((item) => ({
          pergunta: item.Pergunta,
          repostas: [
            { resposta: item.Alternativa1, estaCerto: item.Verdad1 },
            { resposta: item.Alternativa2, estaCerto: item.Verdad2 },
            { resposta: item.Alternativa3, estaCerto: item.Verdad3 },
            { resposta: item.Alternativa4, estaCerto: item.Verdad4 },
            {
              resposta: item.Alternativa5 && item.Alternativa5,
              estaCerto: item.Verdad5 && item.Verdad5,
            },
          ],
          categotria: item.Categoria,
          nivel: item.Nivel,
          disciplina: item.Disciplina,
          assunto: item.Assunto,
        }));

      formatedFile && setBigFile(formatedFile);
    } else if (file.type === "text/plain") {
      let archivo: string = "";
      const fileReader = new FileReader();
      fileReader.readAsText(file);
      fileReader.onload = () => {
        archivo = JSON.stringify(fileReader.result);
        const preguntasTxtArray =
          archivo && archivo.replace(/["]+/g, "").split("\\n\\n\\n");

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

        const formatedFile =
          preguntas &&
          preguntas.map((item) => ({
            pergunta: item.Pergunta,
            repostas: [
              { resposta: item.Alternativa1, estaCerto: item.Verdad1 },
              { resposta: item.Alternativa2, estaCerto: item.Verdad2 },
              { resposta: item.Alternativa3, estaCerto: item.Verdad3 },
              { resposta: item.Alternativa4, estaCerto: item.Verdad4 },
              {
                resposta: item.Alternativa5 && item.Alternativa5,
                estaCerto: item.Verdad5 && item.Verdad5,
              },
            ],
            categotria: item.Categoria,
            nivel: item.Nivel,
            disciplina: item.Disciplina,
            assunto: item.Assunto,
          }));
        formatedFile && setBigFile(formatedFile);
      };

      fileReader.onerror = () => {
        console.log(fileReader.error);
      };
    } else {
      console.log("Archivo no soportado");
    }
  };

  //console.log(bigFile);

  //NewQuestionsArray(bigFile);

  return (
    <div className="dashboard">
      <div className="dashboard-sheath">
        <BGformulario onSubmit={() => NewQuestionsArray(bigFile)}>
          <div className="file-form">
            <label htmlFor="file">Escolher Arquivo</label>
            <BGInput type="file" name="file" id="file" onChange={fileHandler} />
          </div>
          <div className="file-form sender">
            <BGbutton type="submit" variant="yes">
              ENVIAR ARQUIVO
            </BGbutton>
          </div>
        </BGformulario>
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
