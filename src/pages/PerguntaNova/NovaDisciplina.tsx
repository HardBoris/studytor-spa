import { yupResolver } from "@hookform/resolvers/yup";
import { BGInput } from "../../components/BGinput";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { BGformulario } from "../../components/BGformulario";
import { Disciplina, useDisciplina } from "../../context/DisciplinaContext";
import { BGbutton } from "../../components/BGbutton";

const NovaDisciplinaSchema = yup.object().shape({
  disciplina: yup.string().required(),
});

interface NovaDisciplinaProps {
  fechar: () => void;
}

export const NovaDisciplina = ({ fechar }: NovaDisciplinaProps) => {
  const { NewDiscipline } = useDisciplina();

  const {
    formState: { errors },
    register,
    reset,
    handleSubmit,
  } = useForm<Disciplina>({
    resolver: yupResolver(NovaDisciplinaSchema),
  });

  const discipline_sender = (info: Disciplina) => {
    console.log(info);
    try {
      NewDiscipline(info);
    } catch (error) {
      console.error("Error al intentar guardar nueva disciplina");
    }
    reset();
    fechar();
  };

  return (
    <>
      <div className="form_wrapper">
        <BGformulario
          onSubmit={handleSubmit(discipline_sender)}
          clase="vertical-form"
        >
          <h1>Nova Disciplina</h1>
          <div className="separator">
            <BGInput
              name="disciplina"
              register={register}
              error={errors.disciplina?.message}
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
