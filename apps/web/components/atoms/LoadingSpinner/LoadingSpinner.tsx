import styles from './LoadingSpinner.module.css';

type Props = {
  message?: string;
};

export function LoadingSpinner({ message = '読み込み中...' }: Props) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.spinner} />
      <p className={styles.message}>{message}</p>
    </div>
  );
}