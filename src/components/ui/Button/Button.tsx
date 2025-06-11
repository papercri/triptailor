
import styles from "./Button.module.scss";
import { ReactNode } from 'react';
import clsx from "clsx";

interface ButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "accent" | "danger" | "home";
  size?: "sm" | "md" | "lg" | "xl";
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  icon?: ReactNode;
  onClick?: () => void;
}

const Button = ({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  icon,
  onClick,
}: ButtonProps) => {
  const className = clsx(
    styles.btn,
    styles[variant],
    styles[size],
    disabled && styles.disabled
  );

  return (
    <button className={className} disabled={disabled} onClick={onClick}>
      {icon && <span>{icon}</span>}
      <span>{children}</span>
    </button>
  );
};

export default Button;  