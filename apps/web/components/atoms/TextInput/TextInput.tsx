import styles from './TextInput.module.css';

type Props = {
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
};

export function TextInput({ value, placeholder, onChange }: Props) {
  return (
    <input
      className={styles.input}
      type="text"
      value={value}
      placeholder={placeholder}
      onChange={(event) => onChange(event.target.value)}
    />
  );
}