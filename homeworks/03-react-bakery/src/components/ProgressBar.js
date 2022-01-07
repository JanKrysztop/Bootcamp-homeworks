import styles from "./ProgressBar.module.css"

export const ProgressBar = (props) => {
  const width = `${props.progress * 100}%`;s
  return (
    <div className={styles.container}>
      <div className={styles.bar}  style={{width: width}}/>
    </div>
  );
}