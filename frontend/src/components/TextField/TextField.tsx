import React, { useId } from "react";
import styles from "./TextField.module.css";

type Props = {
  label?: string;
  error?: string;
  className?: string;
} & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

export const TextField = ({ label, className, error, ...props }: Props) => {
  const id = useId()

  return (
    <div className={`${className} ${styles["form-group"]}`}>
      <label htmlFor={id}>{label}</label>
      <input
        className={styles["form-control"]}
        id={id}
        {...props}
      />
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
}
