import { Chip } from '@/components/atoms/Chip/Chip';
import type { CardDetail } from '@/features/cards/types/cardTypes';
import styles from './CardOtherInfoSection.module.css';

type Props = {
  card: CardDetail;
};

export function CardOtherInfoSection({ card }: Props) {
  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>【その他】</h2>

      <div className={styles.block}>
        <p className={styles.label}>メモ</p>
        <div className={styles.memo}>{card.memo || 'メモなし'}</div>
      </div>

      <div className={styles.block}>
        <p className={styles.label}>利用者</p>
        <ul className={styles.userList}>
          {card.usedByUsers.map((user) => (
            <li key={user.id}>{user.userName}</li>
          ))}
        </ul>
      </div>

      <div className={styles.block}>
        <p className={styles.label}>タグ</p>
        <div className={styles.tags}>
          {card.tags.map((tag) => (
            <Chip key={tag.id}>{tag.tagName}</Chip>
          ))}
        </div>
      </div>
    </section>
  );
}
