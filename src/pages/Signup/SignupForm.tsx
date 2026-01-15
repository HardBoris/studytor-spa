import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { BGformulario } from "../../components/BGformulario";
//import { useAuth } from "../../context/UserContext";
//import { useNavigate } from "react-router-dom";
import { BGInput } from "../../components/BGinput";
import { BGbutton } from "../../components/BGbutton";

const signUpSchema = yup.object().shape({
  companyCode: yup.string().required("Campo obrigatório"),
  name: yup.string().required("Campo obrigatório"),
  password: yup.string().required("Senha obrigatória"),
  confirmPassword: yup.string().required("Campo obrigatório"),
});

interface txtSignup {
  name: string;
  password: string;
  companyCode: string;
  confirmPassword: string;
}

export const SignupForm = () => {
  //const { signUp } = useAuth();
  // const history = useNavigate();

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<txtSignup>({ resolver: yupResolver(signUpSchema) });

  const sender = (data: txtSignup) => {
    console.log(data);
  };

  return (
    <BGformulario clase="" onSubmit={handleSubmit(sender)}>
      <h1>SignUp</h1>
      <BGInput
        register={register}
        name="companyCode"
        error={errors.companyCode?.message}
        placeholder="Código"
      />
      <BGInput
        register={register}
        name="name"
        error={errors.name?.message}
        placeholder="Usuário"
      />
      <BGInput
        register={register}
        name="password"
        error={errors.password?.message}
        placeholder="Senha"
      />
      <BGInput
        register={register}
        name="confirmPassword"
        error={errors.confirmPassword?.message}
        placeholder="Confirmar Senha"
      />
      <BGbutton type="submit">Registrar</BGbutton>
    </BGformulario>
  );
};
