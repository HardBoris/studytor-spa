import { Alternativa } from "../Alternativa";
import "./pregunta.css";

export const Pregunta = () => {
  return (
    <div className="pregunta-frame">
      <div className="pregunta">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium ea,
        officia tempora ut dolores odit magnam nostrum sed laudantium? Aperiam
        cum debitis labore perferendis repellat molestiae non maiores vitae
        eaque?
      </div>
      <div className="alternativas">
        <Alternativa />
      </div>
    </div>
  );
};
