import { TEXTS } from '../../../constants/texts';
import { IconButton } from '@/components/atoms/IconButton/IconButton';
import styles from './DetailHeader.module.css';

type Props = {
  onEditClick: () => void;
  onDeleteClick: () => void;
  onMenuClick?: () => void;
};

export function DetailHeader({ onEditClick, onDeleteClick, onMenuClick }: Props) {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>{TEXTS.SYSTEMNAME}</h1>

      <div className={styles.actions}>
        <IconButton label="編集" onClick={onEditClick}>✎</IconButton>
        <IconButton label="削除" onClick={onDeleteClick}>🗑</IconButton>
        <IconButton label="メニュー" onClick={onMenuClick}>☰</IconButton>
      </div>
    </header>
  );
}
