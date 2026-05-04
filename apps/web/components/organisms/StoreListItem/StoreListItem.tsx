'use client';

import { useRouter } from 'next/navigation';
import { IconButton } from '@/components/atoms/IconButton/IconButton';
import type { StoreOption } from '@/features/stores/api/storesApi';
import styles from './StoreListItem.module.css';

type Props = {
  store: StoreOption;
  onDeleteClick: (store: StoreOption) => void;
};

export function StoreListItem({ store, onDeleteClick }: Props) {
  const router = useRouter();

  return (
    <article className={styles.card}>
      <div className={styles.info}>
        <p className={styles.storeName}>{store.storeName}</p>
        <p className={styles.meta}>{store.prefecture}</p>
        <p className={styles.meta}>{store.area}</p>
      </div>

      <div className={styles.actions}>
        <IconButton
          label="編集"
          onClick={() => router.push(`/stores/${store.id}/edit`)}
        >
          ✎
        </IconButton>

        <IconButton
          label="削除"
          danger
          onClick={() => onDeleteClick(store)}
        >
          🗑
        </IconButton>
      </div>
    </article>
  );
}