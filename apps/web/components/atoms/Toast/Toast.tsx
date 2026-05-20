import styles from './Toast.module.css';

export type ToastType = 'success' | 'error' | 'info';

type Props = {
  message: string;
  type: ToastType;
};

export function Toast({ message, type }: Props) {
  return (
    <div className={`${styles.toast} ${styles[type]}`}>
      {message}
    </div>
  );
}