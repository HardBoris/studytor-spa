import { useForm } from "react-hook-form";
import { BGbutton } from "../../components/BGbutton";
import { BGformulario } from "../../components/BGformulario";
import { BGInput } from "../../components/BGinput";
import * as yup from "yup";
import { Resposta, useResposta } from "../../context/RespostaContext";
import { yupResolver } from "@hookform/resolvers/yup";
import "./respostas.style.css";
//import { useState } from "react";

const RespuestaSchema = yup.object().shape({
  resposta: yup.string().required(),
  //perguntaId: yup.string().required(),
});

interface AnswersProps {
  fechar: () => void;
}

export const Respostas = ({ fechar }: AnswersProps) => {
  const { NewAnswer } = useResposta();

  const {
    formState: { errors },
    register,
    reset,
    handleSubmit,
  } = useForm<Resposta>({ resolver: yupResolver(RespuestaSchema) });

  const responder = (info: Resposta) => {
    console.log(info);
    try {
      NewAnswer(info);
    } catch (error) {
      console.log(error);
    }
    reset();
    //fechar();
  };

  return (
    <>
      <div className="respuesta-form">
        <BGformulario onSubmit={handleSubmit(responder)} clase="vertical-form">
          <h1>Resposta</h1>
          <div className="respuesta-row">
            <div className="separator">
              <BGInput
                name="resposta"
                placeholder="resposta"
                register={register}
                error={errors.resposta?.message}
              />
            </div>
            <div className="separator-checkbox">
              <BGInput
                name="estaCerto"
                placeholder="estaCerto"
                type="checkbox"
                register={register}
                error={errors.estaCerto?.message}
              />
            </div>
          </div>
          <div className="separator">
            <BGbutton type="submit">Responder</BGbutton>
          </div>
          <div className="separator">
            <BGbutton onClick={() => fechar()}>Cerrar</BGbutton>
          </div>
        </BGformulario>
      </div>
    </>
  );
};
