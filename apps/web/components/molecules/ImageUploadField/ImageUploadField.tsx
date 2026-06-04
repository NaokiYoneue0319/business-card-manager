'use client';

import { uploadCardImage } from '@/features/uploads/api/uploadsApi';
import styles from './ImageUploadField.module.css';

type Props = {
  label: string;
  imageUrl: string;
  onUploaded: (imageUrl: string) => void;
};

export function ImageUploadField({ label, imageUrl, onUploaded }: Props) {
  async function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) return;

    const result = await uploadCardImage(file);
    onUploaded(result.imageUrl);
  }

  return (
    <div className={styles.wrapper}>
      <p className={styles.label}>{label}</p>

      <label className={styles.uploadButton}>
        画像を選択
        <input
          type="file"
          accept="image/*"
          className={styles.fileInput}
          onChange={handleChange}
        />
      </label>

      {imageUrl ? (
        <img
          src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${imageUrl}`}
          alt={label}
          className={styles.preview}
        />
      ) : (
        <div className={styles.placeholder}>画像未選択</div>
      )}
    </div>
  );
}