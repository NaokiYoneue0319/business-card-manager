import { useRouter } from 'next/navigation';
import { Chip } from '@/components/atoms/Chip/Chip';
import { IconButton } from '@/components/atoms/IconButton/IconButton';
import { ThumbnailImage } from '@/components/atoms/ThumbnailImage/ThumbnailImage';
import type { CardListItem } from '@/features/cards/types/cardTypes';
import styles from './BusinessCardItem.module.css';

type Props = {
  card: CardListItem;
  onDeleteClick: (card: CardListItem) => void;
};

export function BusinessCardItem({ card, onDeleteClick }: Props) {
  const router = useRouter();

  const tags = card.cardTags.map((cardTag) => cardTag.tag.tagName);

  return (
    <article className={styles.card}>
      <div className={styles.content}>
        <div className={styles.info}>
          <p className={styles.name}>{card.name}</p>
          <p className={styles.storeName}>{card.store.storeName}</p>

          <div className={styles.tags}>
            {tags.map((tag) => (
              <Chip key={tag}>{tag}</Chip>
            ))}
          </div>
        </div>

        <ThumbnailImage
          src={card.frontImageUrl}
          alt={`${card.name}の名刺画像`}
          onClick={() => router.push(`/cards/${card.id}`)}
        />
      </div>

      <div className={styles.actions}>
        <IconButton
          label="編集"
          onClick={() => router.push(`/cards/${card.id}/edit`)}
        >
          ✎
        </IconButton>

        <IconButton
          label="削除"
          danger
          onClick={() => onDeleteClick(card)}
        >
          🗑
        </IconButton>
      </div>
    </article>
  );
}
