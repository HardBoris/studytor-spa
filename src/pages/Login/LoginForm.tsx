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
import { useAuth } from "../../context/UserContext";
import { Link } from "react-router-dom";

const signInSchema = yup.object().shape({
  institutionCode: yup.string().required("Campo obrigatório"),
  name: yup.string().required("Campo obrigatório"),
  password: yup.string().required("Senha obrigatória"),
});

interface txtData {
  name: string;
  password: string;
  institutionCode: string;
}

export const LoginForm = () => {
  const { signIn } = useAuth();
  // const history = useNavigate();

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<txtData>({ resolver: yupResolver(signInSchema) });

  const sender = (data: txtData) => {
    console.log(data);
    signIn(data);
  };

  return (
    <div className="login-form">
      <BGformulario clase="vertical-form" onSubmit={handleSubmit(sender)}>
        <h1>LogIn</h1>
        <div className="separator">
          <BGInput
            register={register}
            name="institutionCode"
            error={errors.institutionCode?.message}
            placeholder="Código"
            //isPassword={false}
          />
        </div>
        <div className="separator">
          <BGInput
            register={register}
            name="name"
            error={errors.name?.message}
            placeholder="Usuário"
            //isPassword={false}
          />
        </div>
        <div className="separator">
          <BGInput
            register={register}
            name="password"
            error={errors.password?.message}
            placeholder="Senha"
            //isPassword={true}
          />
        </div>
        <div className="separator">
          <BGbutton type="submit">Entrar</BGbutton>
        </div>
      </BGformulario>
      <div className="separator">
        Novo por aqui?
        <Link to={"/signup"} className="ufc">
          Cadastre-se
        </Link>
      </div>
    </div>
  );
};
