import styles from "./Button.module.css";


type Props = {
  label: string;
} & React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

export const Button = ({ label, className }: Props) => {
  return (
    <button className={`${styles.button} ${className}`}>{label}</button>
  );
}
