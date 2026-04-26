import { Button } from '@/components/atoms/Button/Button';
import type { CardListItem } from '@/features/cards/types/cardTypes';
import styles from './DeleteConfirmModal.module.css';

type Props = {
  card: CardListItem | null;
  onClose: () => void;
  onConfirm: () => void;
};

export function DeleteConfirmModal({ card, onClose, onConfirm }: Props) {
  if (!card) return null;

  return (
    <div className={styles.overlay}>
      <section className={styles.modal}>
        <div className={styles.header}>
          <p className={styles.title}>削除確認</p>
          <button type="button" className={styles.closeButton} onClick={onClose}>
            ×
          </button>
        </div>

        <div className={styles.body}>
          <p className={styles.message}>
            「{card.name}」の名刺を
            <br />
            削除しますか？
          </p>

          <div className={styles.actions}>
            <Button onClick={onConfirm}>はい</Button>
            <Button onClick={onClose}>いいえ</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
