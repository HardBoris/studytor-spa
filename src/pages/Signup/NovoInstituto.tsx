import { yupResolver } from "@hookform/resolvers/yup";
import { BGInput } from "../../components/BGinput";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { BGformulario } from "../../components/BGformulario";
import { BGbutton } from "../../components/BGbutton";
import { Categoria, useCategoria } from "../../context/CategoriaContext";
import {
  InstitutionInfo,
  useInstitution,
} from "../../context/InstitutionContext";

const NovoInstitutoSchema = yup.object().shape({
  institutionName: yup.string().required(),
  institutionEmail: yup.string().required(),
});

interface NovoInstitutoProps {
  fechar: () => void;
}

export const NovoInstituto = ({ fechar }: NovoInstitutoProps) => {
  const { NewInstitution } = useInstitution();

  const {
    formState: { errors },
    register,
    reset,
    handleSubmit,
  } = useForm<InstitutionInfo>({
    resolver: yupResolver(NovoInstitutoSchema),
  });

  const institution_sender = (info: InstitutionInfo) => {
    console.log(info);
    try {
      NewInstitution(info);
    } catch (error) {
      console.error("Error al intentar guardar nuevo instituto");
    }
    reset();
    fechar();
  };

  return (
    <>
      <div className="form_wrapper">
        <BGformulario
          onSubmit={handleSubmit(institution_sender)}
          clase="vertical-form"
        >
          <h1>Novo Instituto</h1>
          <div className="separator">
            <BGInput
              name="institutionName"
              register={register}
              placeholder="institutionName"
              error={errors.institutionName?.message}
            />
          </div>
          <div className="separator">
            <BGInput
              name="institutionEmail"
              register={register}
              placeholder="institutionEmail"
              error={errors.institutionEmail?.message}
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
