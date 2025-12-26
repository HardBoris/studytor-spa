import { ReactNode } from "react";
import "./formulario.css";

interface FormularioProps {
  children: ReactNode;
  onSubmit?: () => void;
  clase?: string;
}

export const BGformulario = ({ children, clase, ...rest }: FormularioProps) => (
  <form {...rest} className={clase}>
    {children}
  </form>
);
