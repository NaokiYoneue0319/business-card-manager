import styles from './PasswordInput.module.css';

type Props = {
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
};

export function PasswordInput({ value, placeholder, onChange }: Props) {
  return (
    <input
      className={styles.input}
      type="password"
      value={value}
      placeholder={placeholder}
      onChange={(event) => onChange(event.target.value)}
    />
  );
}