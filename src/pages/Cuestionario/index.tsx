import { BGbutton } from "../../components/BGbutton";
import { BGformulario } from "../../components/BGformulario";
import { BGInput } from "../../components/BGinput";
import "./cuestionario.css";

export const Cuestionario = () => {
  return (
    <>
      <header></header>
      <main>
        <div className="cuestionario">
          <BGformulario clase="vertical-form">
            <h1>Cuestionario</h1>
            <div className="clasificacion">
              <div className="start-separator">
                <BGInput name="nivel" placeholder="nivel" />
              </div>
              <div className="separator">
                <BGInput name="asunto" placeholder="asunto" />
              </div>
              <div className="end-separator">
                <BGInput name="categoria" placeholder="categoria" />
              </div>
            </div>
            <div className="separator">
              <BGInput name="pregunta" placeholder="pregunta" />
            </div>
            <div className="separator">
              <BGInput name="correcta" placeholder="correcta" />
            </div>
            <div className="separator">
              <BGInput name="incorrecta1" placeholder="incorrecta1" />
            </div>
            <div className="separator">
              <BGInput name="incorrecta2" placeholder="incorrecta2" />
            </div>
            <div className="separator">
              <BGInput name="incorrecta3" placeholder="incorrecta3" />
            </div>
            <div className="separator">
              <BGInput name="incorrecta4" placeholder="incorrecta4" />
            </div>

            <div className="separator">
              <BGbutton>Guardar</BGbutton>
            </div>
          </BGformulario>
        </div>
      </main>

      <footer></footer>
    </>
  );
};
