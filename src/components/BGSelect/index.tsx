import { SelectHTMLAttributes } from "react";
import "./select.style.css";

interface SelectProps extends SelectHTMLAttributes<HTMLInputElement> {
  register?: any;
  name: string;
  label?: string;
  enlace?: string;
  ruta?: string;
  options?: any[];
}

export const BGSelect = ({
  label,
  name,
  register,
  enlace,
  ruta,
  options,
  ...rest
}: SelectProps) => {
  return (
    <div className="select-wrapper">
      {label && <div className="select-label">{label}</div>}
      <select
        {...(register && { ...register(name) })}
        {...rest}
        className="select-field"
      >
        {options &&
          options.map((value) => (
            <option key={value} value={value}>
              {value}
            </option>
          ))}
      </select>
    </div>
  );
};
