import { Caveat } from 'next/font/google';
import { TEXTS } from '../../../constants/texts';
import { IconButton } from '@/components/atoms/IconButton/IconButton';
import styles from './FormHeader.module.css';

const caveat = Caveat({
  subsets: ['latin'],
  weight: ['700'],
});

type Props = {
  onSubmitClick: () => void;
  onCancelClick: () => void;
  onMenuClick: () => void;
  submitLabel?: string;
  cancelLabel?: string;
};

export function FormHeader({
  onSubmitClick,
  onCancelClick,
  onMenuClick,
}: Props) {
  return (
    <header className={styles.header}>
      <h1 className={`${styles.title} ${caveat.className}`}>
        {TEXTS.SYSTEMNAME}
      </h1>

      <div className={styles.actions}>
        <IconButton label="保存" onClick={onSubmitClick}>
          ✓
        </IconButton>

        <IconButton label="キャンセル" onClick={onCancelClick}>
          ×
        </IconButton>

        <IconButton label="メニュー" onClick={onMenuClick}>
          ☰
        </IconButton>
      </div>
    </header>
  );
}