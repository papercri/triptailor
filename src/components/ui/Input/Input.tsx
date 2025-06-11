import styles from "./Input.module.scss";
import clsx from "clsx";
import { ChangeEvent } from "react";

interface InputProps {
  label?: string;
  name: string;
  type?: string;
  value: string;
  placeholder?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  disabled?: boolean;
  noValidate?: boolean;
  error?: string;
}

const Input = ({
  label,
  name,
  type = "text",
  value,
  placeholder,
  onChange,
  required = false,
  disabled = false,
 
  error,
}: InputProps) => {
  const inputClass = clsx(
    styles.input,
    error && styles.error,
    disabled && styles.disabled
  );

  return (
    <div className={styles.wrapper}>
      {label && <label htmlFor={name} className={styles.label}>{label}</label>}
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        required={required}
        disabled={disabled}
        className={inputClass}
    
      />
      {error && <p className={styles.errorText}>{error}</p>}
    </div>
  );
};

export default Input;
