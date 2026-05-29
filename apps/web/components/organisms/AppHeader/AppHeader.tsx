import { Caveat } from 'next/font/google';
import { TEXTS } from '../../../constants/texts';
import { IconButton } from '@/components/atoms/IconButton/IconButton';
import styles from './AppHeader.module.css';

const caveat = Caveat({
  subsets: ['latin'],
  weight: ['700'],
});

type Props = {
  onSearchClick?: () => void;
  onCreateClick?: () => void;
  onMenuClick: () => void;
};

export function AppHeader({ onSearchClick, onCreateClick, onMenuClick }: Props) {
  return (
    <header className={styles.header}>
      <h1 className={`${styles.title} ${caveat.className}`}>
        {TEXTS.SYSTEMNAME}
      </h1>

      <div className={styles.actions}>
        {onSearchClick ? (
          <IconButton
            label="検索"
            onClick={onSearchClick}
          >
            🔍
          </IconButton>
        ) : null}

        {onCreateClick ? (
          <IconButton 
            label="新規登録"
            onClick={onCreateClick}
          >
            ＋
          </IconButton>
        ) : null}

        <IconButton
          label="メニュー"
          onClick={onMenuClick}
        >
          ☰
        </IconButton>
      </div>
    </header>
  );
}