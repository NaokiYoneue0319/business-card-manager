import type { TagOption } from '@/features/tags/api/tagsApi';
import { TagListItem } from '../TagListItem/TagListItem';
import styles from './TagList.module.css';

type Props = {
  tags: TagOption[];
  onDeleteClick: (tag: TagOption) => void;
};

export function TagList({ tags, onDeleteClick }: Props) {
  return (
    <div className={styles.list}>
      {tags.map((tag) => (
        <TagListItem key={tag.id} tag={tag} onDeleteClick={onDeleteClick} />
      ))}
    </div>
  );
}