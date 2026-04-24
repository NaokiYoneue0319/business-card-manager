import styles from './FormField.module.css';

type Props = {
  label: string;
  children: React.ReactNode;
};

export function FormField({ label, children }: Props) {
  return (
    <div className={styles.wrapper}>
      <label className={styles.label}>{label}</label>
      {children}
    </div>
  );
}