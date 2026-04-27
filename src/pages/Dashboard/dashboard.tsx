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
