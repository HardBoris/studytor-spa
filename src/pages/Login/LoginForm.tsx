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

const signInSchema = yup.object().shape({
  companyCode: yup.string().required("Campo obrigatório"),
  name: yup.string().required("Campo obrigatório"),
  password: yup.string().required("Senha obrigatória"),
});

interface txtData {
  name: string;
  password: string;
  companyCode: string;
}

export const LoginForm = () => {
  //const { signIn } = useAuth();
  // const history = useNavigate();

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<txtData>({ resolver: yupResolver(signInSchema) });

  const sender = (data: txtData) => {
    console.log(data);
  };

  return (
    <BGformulario clase="" onSubmit={handleSubmit(sender)}>
      <h1>LogIn</h1>
      <BGInput
        register={register}
        name="companyCode"
        error={errors.companyCode?.message}
        placeholder="Código"
        //isPassword={false}
      />
      <BGInput
        register={register}
        name="name"
        error={errors.name?.message}
        placeholder="Usuário"
        //isPassword={false}
      />
      <BGInput
        register={register}
        name="password"
        error={errors.password?.message}
        placeholder="Senha"
        //isPassword={true}
      />
      <BGbutton type="submit">Entrar</BGbutton>
    </BGformulario>
  );
};
