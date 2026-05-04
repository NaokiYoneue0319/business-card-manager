'use client';

import { useRouter } from 'next/navigation';
import { Chip } from '@/components/atoms/Chip/Chip';
import { IconButton } from '@/components/atoms/IconButton/IconButton';
import type { TagOption } from '@/features/tags/api/tagsApi';
import styles from './TagListItem.module.css';

type Props = {
  tag: TagOption;
  onDeleteClick: (tag: TagOption) => void;
};

export function TagListItem({ tag, onDeleteClick }: Props) {
  const router = useRouter();

  return (
    <article className={styles.card}>
      <div className={styles.info}>
        <Chip>{tag.tagName}</Chip>
      </div>

      <div className={styles.actions}>
        <IconButton
          label="編集"
          onClick={() => router.push(`/tags/${tag.id}/edit`)}
        >
          ✎
        </IconButton>

        <IconButton label="削除" danger onClick={() => onDeleteClick(tag)}>
          🗑
        </IconButton>
      </div>
    </article>
  );
}