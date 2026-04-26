import styles from './IconButton.module.css';

type Props = {
  label: string;
  children: React.ReactNode;
  onClick?: () => void;
  danger?: boolean;
};

export function IconButton({ label, children, onClick, danger = false }: Props) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={`${styles.button} ${danger ? styles.danger : ''}`}
    >
      {children}
    </button>
  );
}
