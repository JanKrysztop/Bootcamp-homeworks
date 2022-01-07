import styles from "./ProgressBar.module.css"

export const ProgressBar = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles.progress}  />
    </div>
  );
}