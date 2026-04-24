import styles from './Button.module.css';

type Props = {
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
};

export function Button({ children, disabled = false, onClick }: Props) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={styles.button}
    >
      {children}
    </button>
  );
}