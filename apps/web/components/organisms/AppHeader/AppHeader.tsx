import { TEXTS } from '../../../constants/texts';
import { IconButton } from '@/components/atoms/IconButton/IconButton';
import styles from './AppHeader.module.css';
import { Caveat } from 'next/font/google';

type Props = {
  onSearchClick: () => void;
  onCreateClick: () => void;
  onMenuClick?: () => void;
};

const caveat = Caveat({
  subsets: ['latin'],
  weight: ['700'],
});

export function AppHeader({ onSearchClick, onCreateClick, onMenuClick }: Props) {
  return (
    <header className={styles.header}>
      <h1 className={`${styles.title} ${caveat.className}`}>
        {TEXTS.SYSTEMNAME}
      </h1>

      <div className={styles.actions}>
        <IconButton label="検索" onClick={onSearchClick}>
          🔍
        </IconButton>
        <IconButton label="新規登録" onClick={onCreateClick}>
          ＋
        </IconButton>
        <IconButton label="メニュー" onClick={onMenuClick}>
          ☰
        </IconButton>
      </div>
    </header>
  );
}
