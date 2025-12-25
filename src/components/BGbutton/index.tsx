import { ButtonHTMLAttributes, ReactNode } from "react";
import "./button.css";
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: string;
}

export const BGbutton = ({ children, variant, ...rest }: ButtonProps) => (
  <button {...rest} className={variant}>
    {children}
  </button>
);
