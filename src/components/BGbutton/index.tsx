import { ButtonHTMLAttributes, ReactNode } from "react";
import "./style.css";
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: string;
}

export const BGbutton = ({ children, variant, ...rest }: ButtonProps) => (
  <div className="btn">
    <button {...rest} className={variant}>
      {children}
    </button>
  </div>
);
