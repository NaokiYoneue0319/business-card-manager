import styles from './EmptyState.module.css';

type Props = {
  message?: string;
};

export function EmptyState({ message = 'データがありません' }: Props) {
  return (
    <div className={styles.wrapper}>
      <p className={styles.icon}>🫥</p>
      <p className={styles.message}>{message}</p>
    </div>
  );
}