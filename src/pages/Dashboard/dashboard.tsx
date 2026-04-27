import "./dashboard.style.css";
import { useAuth } from "../../context/UserContext";
import { useEffect, useState } from "react";
import { BGbutton } from "../../components/BGbutton";
import { BGInput } from "../../components/BGinput";
import { useCategoria } from "../../context/CategoriaContext";
import Papa from "papaparse";
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
  //const { saveProduct } = useProduct();
  //const { saveMovement, movementsList } = useMovement();
  const [file, setFile] = useState("");
  const [csvFile, setCsvFile] = useState<any[]>([]);
  const [show, setShow] = useState(0);

  useEffect(() => {
    CategoriasLoader();
  }, []);

  const activate = (n: number) => setShow(n);

  const fileHandler = (e: any) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }

    if (file.type === "text/csv") {
      console.log("Es un archivo csv");
    } else if (file.type === "text/plain") {
      console.log("Es un archivo txt");
    } else {
      console.log("Archivo no soportado");
    }
  };

  const txtReader = (e: any) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.readAsText(file);
    fileReader.onload = () => {
      setFile(JSON.stringify(fileReader.result));
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

  /* const txtArray =
    file &&
    file
      .replace(/["]+/g, "")
      .split("\\n")
      .filter((item) => item.length !== 0)
      .map((item) => [
        item.slice(0, 1),
        item.slice(1, 26),
        item.slice(26, 56).trim(),
        item.slice(56, 66),
        item.slice(66),
      ]); */

  file && console.log(file);
  csvFile && console.log(csvFile);
  const preguntasTxtArray =
    file && file.replace(/["]+/g, "").split("\\n\\n\\n");
  //.map((item) => item.split("\\n").filter((item) => item.length !== 0));

  const clasificacion =
    preguntasTxtArray && preguntasTxtArray.slice(0, 1)[0].split("\\n");

  //console.log(clasificacion);
  //console.log(preguntasTxtArray);

  //const prueba = clasificacion && console.log(clasificacion[0].split("\n"));

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

  /* const movementsArray: "" | movementObject[] =
    txtArray &&
    txtArray.map((item: string[]) => ({
      type: item[0],
      date: item[1],
      product: item[2],
      price: item[3],
      seller: item[4],
    })); */

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
  /*const clasificacion =
    preguntasTxtArray && console.log(preguntasTxtArray.slice(0, 1));
      disciplinas: {
        disciplina: clasificacion[2],
        assuntos:{assunto: clasificacion[3],
          preguntas: {
            preguntasTxt.map((item: string[]) => ({
              pregunta: item.slice(0, 1).toString(),
              respuestas: item.slice(1, 7).map((cosa: string) => ({
                respuesta: cosaconst productsArray: "" | productObject[] =
    reducedProducts &&
    reducedProducts.map((item) => ({
      product: item[1],
      producer: item[2],
    }));
              }),
            ),
            })),
          }
        }
      },
    }) */

  const movementsKeeper = () => {
    /* movementsArray &&
      Promise.all(movementsArray.map((item) => saveMovement(item))); */
  };

  //const users = txtArray && txtArray.map((item) => [item[4]]);

  //const reducedUsers = users && arrayReducer(users);

  /* const usersArray: "" | userObject[] =
    reducedUsers &&
    reducedUsers.map((item) => ({
      name: item[0],
    })); */

  const usersKeeper = () => {
    /* usersArray &&
      Promise.all(usersArray.map((item) => saveUser({ userName: item.name }))); */
  };

  /* const products =
    txtArray &&
    txtArray
      .map((item) => [item[0], item[2], item[4]])
      .filter((element) => element[0] === "1"); */

  //const reducedProducts = products && arrayReducer(products);

  /* const productsArray: "" | productObject[] =
    reducedProducts &&
    reducedProducts.map((item) => ({
      product: item[1],
      producer: item[2],
    })); */

  const productsKeeper = () => {
    /* productsArray &&
      Promise.all(productsArray.map((item) => saveProduct(item))); */
  };

  /* const handleData = () => {
    usersKeeper();
    setTimeout(productsKeeper, 500);
    setTimeout(movementsKeeper, 1000);
  }; */

  const handleData = () => {
    const category = preguntasArray && preguntasArray[0].categoria;
    const level = preguntasArray && preguntasArray[0].nivel;
    const discipline =
      preguntasArray && preguntasArray[0].disciplinas.disciplina;
    const asunto =
      preguntasArray && preguntasArray[0].disciplinas.assuntos.assunto;
    const question =
      preguntasArray && preguntasArray[0].disciplinas.assuntos.preguntas[0];
    const answers =
      preguntasArray &&
      preguntasArray[0].disciplinas.assuntos.preguntas[0].respostas;
    console.log(category);
    console.log(level);
    console.log(discipline);
    console.log(asunto);
    console.log(question);
    console.log(answers);
  };

  return (
    <div className="dashboard">
      <div className="dashboard-sheath">
        <div className="file-form">
          <label htmlFor="file">Escolher Arquivo</label>
          <BGInput type="file" name="file" id="file" onChange={fileHandler} />
        </div>
        <div className="file-form sender">
          <BGbutton onClick={() => handleData()} variant="yes">
            ENVIAR ARQUIVO
          </BGbutton>
        </div>
      </div>
      {/* <div className={show !== 0 ? "invisible" : ""}>
        <AllMovements />
      </div>
      <div className={show !== 1 ? "invisible" : ""}>
        <MovementsByProduct />
      </div>
      <div className={show !== 2 ? "invisible" : ""}>
        <MovementsByUser />
      </div> */}
      <div className="footer_action">
        <div className="tabs">
          <div
            role="button"
            className={show === 0 ? "tab active" : "tab"}
            onClick={() => activate(0)}
          >
            Todos
          </div>
          <div
            role="button"
            className={show === 1 ? "tab active" : "tab"}
            onClick={() => activate(1)}
          >
            Agrupados por Produto
          </div>
          <div
            role="button"
            className={show === 2 ? "tab active" : "tab"}
            onClick={() => activate(2)}
          >
            Agrupados por Vendedor
          </div>
        </div>
        <div className="exit_btn">
          <BGbutton onClick={() => signOut()} variant="warning">
            sair
          </BGbutton>
        </div>
      </div>
    </div>
  );
};
