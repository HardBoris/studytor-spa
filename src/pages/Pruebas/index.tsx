import { BGbutton } from "../../components/BGbutton";
import { Pregunta } from "../../components/Pregunta";
import "./pruebas.css";

export const Pruebas = () => {
  return (
    <>
      <header>
        <h1>Avaliação de conhecimento</h1>
      </header>
      <main>
        <div className="evaluacion">
          <Pregunta />
        </div>
        <div className="acciones">
          <div className="prueba-boton">
            <BGbutton>Anterior</BGbutton>
          </div>
          <div className="prueba-boton">
            <BGbutton>Próximo</BGbutton>
          </div>
          <div className="prueba-boton">
            <BGbutton>Finalizar</BGbutton>
          </div>
        </div>
      </main>
      <footer>
        <h1>Pie</h1>
      </footer>
    </>
  );
};
