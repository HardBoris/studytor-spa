import { ReactNode } from "react";
import "./formulario.css";

interface FormularioProps {
  children: ReactNode;
  onSubmit?: () => void;
  clase?: string;
  id?: string;
}

export const BGformulario = ({
  children,
  clase,
  id,
  ...rest
}: FormularioProps) => (
  <form {...rest} className={clase} id={id}>
    {children}
  </form>
);
