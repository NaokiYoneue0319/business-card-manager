import type { CardListItem } from '@/features/cards/types/cardTypes';
import { BusinessCardItem } from '../BusinessCardItem/BusinessCardItem';
import styles from './BusinessCardList.module.css';

type Props = {
  cards: CardListItem[];
  onDeleteClick: (card: CardListItem) => void;
};

export function BusinessCardList({ cards, onDeleteClick }: Props) {
  return (
    <div className={styles.list}>
      {cards.map((card) => (
        <BusinessCardItem
          key={card.id}
          card={card}
          onDeleteClick={onDeleteClick}
        />
      ))}
    </div>
  );
}
