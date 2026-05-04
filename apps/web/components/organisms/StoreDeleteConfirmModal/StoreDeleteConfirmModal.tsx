import { Button } from '@/components/atoms/Button/Button';
import type { StoreOption } from '@/features/stores/api/storesApi';
import styles from './StoreDeleteConfirmModal.module.css';

type Props = {
  store: StoreOption | null;
  onClose: () => void;
  onConfirm: () => void;
};

export function StoreDeleteConfirmModal({ store, onClose, onConfirm }: Props) {
  if (!store) return null;

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
            「{store.storeName}」を
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