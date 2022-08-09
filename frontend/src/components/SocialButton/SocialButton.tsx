import styles from "./SocialButton.module.css";

type Props = {
  label: string;
  src: string
}

export const SocialButton = ({label, src}: Props) => {
  return (
    <button className={styles.button}>
      <img src={src} alt={label} />
      {label}
    </button>
  );
}
