import { Button } from '@/components/atoms/Button/Button';
import type { TagOption } from '@/features/tags/api/tagsApi';
import styles from './TagDeleteConfirmModal.module.css';

type Props = {
  tag: TagOption | null;
  onClose: () => void;
  onConfirm: () => void;
};

export function TagDeleteConfirmModal({ tag, onClose, onConfirm }: Props) {
  if (!tag) return null;

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
            「{tag.tagName}」を
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