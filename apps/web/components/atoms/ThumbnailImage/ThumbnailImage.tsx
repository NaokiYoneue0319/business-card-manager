import styles from './ThumbnailImage.module.css';

type Props = {
  src?: string;
  alt: string;
  onClick?: () => void;
};

export function ThumbnailImage({ src, alt, onClick }: Props) {
  return (
    <button type="button" className={styles.button} onClick={onClick}>
      {src ? (
        <img src={src} alt={alt} className={styles.image} />
      ) : (
        <div className={styles.placeholder}>🖼️</div>
      )}
    </button>
  );
}
