import { API_BASE_URL } from '@/lib/env';
import styles from './ThumbnailImage.module.css';

type Props = {
  src?: string;
  alt: string;
  onClick?: () => void;
};

function resolveImageUrl(src?: string) {
  if (!src) return '';

  if (src.startsWith('http')) return src;

  return `${API_BASE_URL}${src}`;
}

export function ThumbnailImage({ src, alt, onClick }: Props) {
  const imageUrl = resolveImageUrl(src);

  return (
    <button
      type="button"
      className={styles.button}
      onClick={(event) => {
        event.stopPropagation();
        onClick?.();
      }}
    >
      {imageUrl ? (
        <img src={imageUrl} alt={alt} className={styles.image} />
      ) : (
        <div className={styles.placeholder}>🖼️</div>
      )}
    </button>
  );
}