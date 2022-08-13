import styles from "./Loading.module.css"

type Props = {
  style?: React.CSSProperties;
}

export const Loading = ({ style }: Props) => {
  return <div style={style} className={styles.loader}></div>
}
