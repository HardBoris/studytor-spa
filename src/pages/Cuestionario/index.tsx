import { BGbutton } from "../../components/BGbutton";
import { BGformulario } from "../../components/BGformulario";
import { BGInput } from "../../components/BGinput";
import "./cuestionario.css";

export const Cuestionario = () => {
  return (
    <>
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
        <BGInput name="pregunta" placeholder="pregunta" />
        <BGInput name="correcta" placeholder="correcta" />
        <BGInput name="incorrecta1" placeholder="incorrecta1" />
        <BGInput name="incorrecta2" placeholder="incorrecta2" />
        <BGInput name="incorrecta3" placeholder="incorrecta3" />
        <BGInput name="incorrecta4" placeholder="incorrecta4" />
        <div className="action-form">
          <BGbutton>Enviar</BGbutton>
        </div>
      </BGformulario>
    </>
  );
};
