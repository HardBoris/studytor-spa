import { useForm } from "react-hook-form";
import { BGbutton } from "../../components/BGbutton";
import { BGformulario } from "../../components/BGformulario";
import { BGInput } from "../../components/BGinput";
import { BGSelect } from "../../components/BGSelect";
import "./cuestionario.css";
import { PerguntaNova } from "../../context/PerguntaContext";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const PerguntaNovaSchema = yup.object().shape({
  disciplina: yup.string().required(),
  nivel: yup.string().required(),
  asunto: yup.string().required(),
  categoria: yup.string().required(),
  pergunta: yup.string().required(),
  correcta: yup.string().required(),
});

export const Cuestionario = () => {
  const lista = ["primera", "segunda", "tercera", "quarta", "quinta", "sexta"];

  const {
    formState: { errors },
    register,
    reset,
    handleSubmit,
  } = useForm<PerguntaNova>({ resolver: yupResolver(PerguntaNovaSchema) });

  const sender = (info: PerguntaNova) => {
    console.log(info);
    reset();
  };

  return (
    <>
      <header></header>
      <main>
        <div className="cuestionario">
          <BGformulario onSubmit={handleSubmit(sender)} clase="vertical-form">
            <h1>Pergunta Nova</h1>
            <div className="clasificacion">
              <div className="start-separator">
                <BGInput
                  name="disciplina"
                  placeholder="disciplina"
                  register={register}
                  error={errors.disciplina?.message}
                ></BGInput>
              </div>
              <div className="separator">
                <BGSelect name="nivel" options={lista} register={register} />
              </div>
              <div className="separator">
                <BGInput
                  name="asunto"
                  placeholder="asunto"
                  register={register}
                  error={errors.asunto?.message}
                />
              </div>
              <div className="end-separator">
                <BGInput
                  name="categoria"
                  placeholder="categoria"
                  register={register}
                  error={errors.categoria?.message}
                />
              </div>
            </div>
            <div className="separator">
              <BGInput
                name="pergunta"
                placeholder="pergunta"
                register={register}
                error={errors.pergunta?.message}
              />
            </div>
            <div className="separator">
              <BGInput
                name="correcta"
                placeholder="correcta"
                register={register}
                error={errors.correcta?.message}
              />
            </div>
            {/*
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
            </div>*/}

            <div className="separator">
              <BGbutton type="submit">Guardar</BGbutton>
            </div>
          </BGformulario>
        </div>
      </main>

      <footer></footer>
    </>
  );
};
