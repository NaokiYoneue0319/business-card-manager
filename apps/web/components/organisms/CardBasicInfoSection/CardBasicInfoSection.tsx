import type { CardDetail } from '@/features/cards/types/cardTypes';
import styles from './CardBasicInfoSection.module.css';

type Props = {
  card: CardDetail;
};

export function CardBasicInfoSection({ card }: Props) {
  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>【基本情報】</h2>

      <dl className={styles.list}>
        <div className={styles.row}>
          <dt>氏名：</dt>
          <dd>{card.name}</dd>
        </div>
        <div className={styles.row}>
          <dt>店舗名：</dt>
          <dd>{card.store.storeName}</dd>
        </div>
        <div className={styles.row}>
          <dt>地域：</dt>
          <dd>{card.store.area}</dd>
        </div>
        <div className={styles.row}>
          <dt>利用年月日：</dt>
          <dd>{card.usedYearMonth.replace('-', '/')}</dd>
        </div>
      </dl>
    </section>
  );
}
