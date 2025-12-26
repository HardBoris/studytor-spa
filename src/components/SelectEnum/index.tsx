import { SelectHTMLAttributes } from "react";
import "./select.style.css";

interface SelectProps extends SelectHTMLAttributes<HTMLInputElement> {
  register: any;
  name: string;
  error?: any;
  label?: string;
  options: any[];
}

export const SelectEnum = ({
  label,
  error,
  name,
  register,
  options,
  ...rest
}: SelectProps) => {
  return (
    <div className="select-wrapper">
      {label && (
        <div className="select-label">
          {label} {!!error && <span>: {error}</span>}
        </div>
      )}
      <select {...register(name)} {...rest} className="select-field">
        {options.map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
    </div>
  );
};
