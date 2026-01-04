import { yupResolver } from "@hookform/resolvers/yup";
import { BGInput } from "../../components/BGinput";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { BGformulario } from "../../components/BGformulario";
import { BGbutton } from "../../components/BGbutton";
import { Categoria, useCategoria } from "../../context/CategoriaContext";

const NovaCategoriaSchema = yup.object().shape({
  categoria: yup.string().required(),
});

interface NovaCategoriaProps {
  fechar: () => void;
}

export const NovaCategoria = ({ fechar }: NovaCategoriaProps) => {
  const { NewCategory } = useCategoria();

  const {
    formState: { errors },
    register,
    reset,
    handleSubmit,
  } = useForm<Categoria>({
    resolver: yupResolver(NovaCategoriaSchema),
  });

  const category_sender = (info: Categoria) => {
    console.log(info);
    try {
      NewCategory(info);
    } catch (error) {
      console.error("Error al intentar guardar nueva categoria");
    }
    reset();
    fechar();
  };

  return (
    <>
      <div className="form_wrapper">
        <BGformulario
          onSubmit={handleSubmit(category_sender)}
          clase="vertical-form"
        >
          <h1>Nova Categoria</h1>
          <div className="separator">
            <BGInput
              name="categoria"
              register={register}
              placeholder="categoria"
              error={errors.categoria?.message}
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
