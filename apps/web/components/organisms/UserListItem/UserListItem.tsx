'use client';

import { useRouter } from 'next/navigation';
import { IconButton } from '@/components/atoms/IconButton/IconButton';
import type { UserOption } from '@/features/users/api/usersApi';
import styles from './UserListItem.module.css';

type Props = {
  user: UserOption;
  onDeleteClick: (user: UserOption) => void;
};

export function UserListItem({ user, onDeleteClick }: Props) {
  const router = useRouter();

  return (
    <article className={styles.card}>
      <div className={styles.info}>
        <p className={styles.userName}>{user.userName}</p>
        <p className={styles.meta}>{user.loginId}</p>

        <div className={styles.badges}>
          <span className={styles.roleBadge}>{user.role}</span>
          <span
            className={`${styles.statusBadge} ${
              user.isActive ? styles.active : styles.inactive
            }`}
          >
            {user.isActive ? '有効' : '無効'}
          </span>
        </div>
      </div>

      <div className={styles.actions}>
        <IconButton
          label="編集"
          onClick={() => router.push(`/users/${user.id}/edit`)}
        >
          ✎
        </IconButton>

        <IconButton label="削除" danger onClick={() => onDeleteClick(user)}>
          🗑
        </IconButton>
      </div>
    </article>
  );
}