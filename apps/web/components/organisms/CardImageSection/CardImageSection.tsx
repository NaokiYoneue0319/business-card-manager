import { API_BASE_URL } from '@/lib/env';
import type { CardDetail } from '@/features/cards/types/cardTypes';
import styles from './CardImageSection.module.css';

type Props = {
  card: CardDetail;
};

function resolveImageUrl(src?: string | null) {
  if (!src) return '';

  if (src.startsWith('http')) return src;

  return `${API_BASE_URL}${src}`;
}

export function CardImageSection({ card }: Props) {
  const frontImageUrl = resolveImageUrl(card.images.front);
  const backImageUrl = resolveImageUrl(card.images.back);

  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>【名刺画像】</h2>

      <div className={styles.imageBlock}>
        <p className={styles.label}>表面</p>
        {frontImageUrl ? (
          <img className={styles.image} src={frontImageUrl} alt="名刺表面" />
        ) : (
          <div className={styles.placeholder}>🖼️</div>
        )}
      </div>

      <div className={styles.imageBlock}>
        <p className={styles.label}>裏面</p>
        {backImageUrl ? (
          <img className={styles.image} src={backImageUrl} alt="名刺裏面" />
        ) : (
          <div className={styles.placeholder}>🖼️</div>
        )}
      </div>
    </section>
  );
}