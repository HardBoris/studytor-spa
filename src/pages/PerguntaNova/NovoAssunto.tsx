import { yupResolver } from "@hookform/resolvers/yup";
import { BGInput } from "../../components/BGinput";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { BGformulario } from "../../components/BGformulario";
import { BGbutton } from "../../components/BGbutton";
import { Assunto, useAssunto } from "../../context/AssuntoContext";

const NovoAssuntoSchema = yup.object().shape({
  assunto: yup.string().required(),
});

interface NovoAssuntoProps {
  fechar: () => void;
}

export const NovoAssunto = ({ fechar }: NovoAssuntoProps) => {
  const { NewTopic } = useAssunto();

  const {
    formState: { errors },
    register,
    reset,
    handleSubmit,
  } = useForm<Assunto>({
    resolver: yupResolver(NovoAssuntoSchema),
  });

  const topic_sender = (info: Assunto) => {
    console.log(info);
    try {
      NewTopic(info);
    } catch (error) {
      console.error("Error al intentar guardar nuevo assunto");
    }
    reset();
    fechar();
  };

  return (
    <>
      <div className="form_wrapper">
        <BGformulario
          onSubmit={handleSubmit(topic_sender)}
          clase="vertical-form"
        >
          <h1>Novo Assunto</h1>
          <div className="separator">
            <BGInput
              name="assunto"
              register={register}
              error={errors.assunto?.message}
            />
          </div>
          <div className="separator">
            <BGbutton type="submit">Enviar</BGbutton>
          </div>
        </BGformulario>
      </div>
    </>
  );
};
