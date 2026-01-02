import { SelectHTMLAttributes } from "react";
import "./select.style.css";

interface SelectProps extends SelectHTMLAttributes<HTMLInputElement> {
  register?: any;
  name: string;
  label?: string;
  enlace?: string;
  ruta?: string;
  options?: any[];
  objeto?: {};
  accion?: () => void;
}

export const BGSelectObject = ({
  label,
  name,
  register,
  enlace,
  ruta,
  options,
  objeto,
  accion,
  ...rest
}: SelectProps) => {
  return (
    <div className="select-wrapper">
      {label && <div className="select-label">{label}</div>}
      <select
        {...(register && { ...register(name) })}
        {...rest}
        className="select-field"
      ></select>
    </div>
  );
};
