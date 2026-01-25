import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { BGformulario } from "../../components/BGformulario";
//import { useAuth } from "../../context/UserContext";
// import { useNavigate } from "react-router-dom";
// import { Input } from "../../components/oldInput";
import { BGbutton } from "../../components/BGbutton";
// import { InputPassword } from "../../components/oldInputPassword";
import { BGInput } from "../../components/BGinput";
import { useInstitution } from "../../context/InstitutionContext";
//import { useAuth } from "../../context/UserContext";
//import { Link } from "react-router-dom";

const institutionSchema = yup.object().shape({
  institutionName: yup.string().required("Campo obrigatório"),
  institutionEmail: yup.string().required("Campo obrigatório"),
  //password: yup.string().required("Senha obrigatória"),
});

interface txtData {
  institutionName: string;
  institutionEmail: string;
}

export const InstitutionForm = () => {
  const { NewInstitution } = useInstitution();

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<txtData>({ resolver: yupResolver(institutionSchema) });

  const sender = (data: txtData) => {
    console.log(data);
    NewInstitution(data);
  };

  return (
    <div className="instituto-form">
      <BGformulario clase="vertical-form" onSubmit={handleSubmit(sender)}>
        <h1>Instituto</h1>
        <div className="separator">
          <BGInput
            register={register}
            name="institutionName"
            error={errors.institutionName?.message}
            placeholder="Instituto"
            //isPassword={false}
          />
        </div>
        <div className="separator">
          <BGInput
            register={register}
            name="institutionEmail"
            error={errors.institutionEmail?.message}
            placeholder="Email"
            //isPassword={false}
          />
        </div>
        {/* <div className="separator">
          <BGInput
            register={register}
            name="password"
            error={errors.password?.message}
            placeholder="Senha"
            //isPassword={true}
          />
        </div> */}
        <div className="separator">
          <BGbutton type="submit">Criar</BGbutton>
        </div>
      </BGformulario>
      {/* <div className="separator">
        Novo por aqui?
        <Link to={"/signup"} className="ufc">
          Cadastre-se
        </Link>
      </div> */}
    </div>
  );
};
