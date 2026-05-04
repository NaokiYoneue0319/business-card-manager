import type { StoreOption } from '@/features/stores/api/storesApi';
import { StoreListItem } from '../StoreListItem/StoreListItem';
import styles from './StoreList.module.css';

type Props = {
  stores: StoreOption[];
  onDeleteClick: (store: StoreOption) => void;
};

export function StoreList({ stores, onDeleteClick }: Props) {
  return (
    <div className={styles.list}>
      {stores.map((store) => (
        <StoreListItem
          key={store.id}
          store={store}
          onDeleteClick={onDeleteClick}
        />
      ))}
    </div>
  );
}