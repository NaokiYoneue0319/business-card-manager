import { Button } from '@/components/atoms/Button/Button';
import type { UserOption } from '@/features/users/api/usersApi';
import styles from './UserDeleteConfirmModal.module.css';

type Props = {
  user: UserOption | null;
  onClose: () => void;
  onConfirm: () => void;
};

export function UserDeleteConfirmModal({ user, onClose, onConfirm }: Props) {
  if (!user) return null;

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
            「{user.userName}」を
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