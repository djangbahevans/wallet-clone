import styles from "./Button.module.css";


type Props = {
  label: string;
} & React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

export const Button = ({label}: Props) => {
  return (
    <button className={styles.button}>{label}</button>
  );
}
