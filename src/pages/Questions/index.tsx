import { Helmet } from "react-helmet-async";
import { usePergunta } from "../../context/PerguntaContext";
import { useEffect } from "react";
import "./question.style.css";

export const Questions = () => {
  const { perguntas, PerguntasLoader } = usePergunta();

  useEffect(() => {
    PerguntasLoader();
  }, []);

  return (
    <>
      <Helmet>
        <title>Studytor | Perguntas</title>
      </Helmet>
      <div className="capa">
        <h1>Perguntas</h1>
        {perguntas &&
          perguntas.map((item) => (
            <div key={item.perguntaId} className="question-row">
              <p>{item.pergunta}</p>
            </div>
          ))}
      </div>
    </>
  );
};
