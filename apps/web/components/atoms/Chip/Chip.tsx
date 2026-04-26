import styles from './Chip.module.css';

type Props = {
  children: React.ReactNode;
};

export function Chip({ children }: Props) {
  return <span className={styles.chip}>{children}</span>;
}
