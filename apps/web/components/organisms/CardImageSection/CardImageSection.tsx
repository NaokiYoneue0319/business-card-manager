import type { CardDetail } from '@/features/cards/types/cardTypes';
import styles from './CardImageSection.module.css';

type Props = {
  card: CardDetail;
};

export function CardImageSection({ card }: Props) {
  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>【名刺画像】</h2>

      <div className={styles.imageBlock}>
        <p className={styles.label}>表面</p>
        {card.images.front ? (
          <img className={styles.image} src={card.images.front} alt="名刺表面" />
        ) : (
          <div className={styles.placeholder}>🖼️</div>
        )}
      </div>

      <div className={styles.imageBlock}>
        <p className={styles.label}>裏面</p>
        {card.images.back ? (
          <img className={styles.image} src={card.images.back} alt="名刺裏面" />
        ) : (
          <div className={styles.placeholder}>🖼️</div>
        )}
      </div>
    </section>
  );
}
