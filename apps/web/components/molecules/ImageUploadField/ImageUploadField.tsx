'use client';

import { useRef, useState } from 'react';
import { useToast } from '@/components/organisms/ToastProvider/ToastProvider';
import { uploadCardImage } from '@/features/uploads/api/uploadsApi';
import { API_BASE_URL } from '@/lib/env';
import styles from './ImageUploadField.module.css';

type Props = {
  label: string;
  imageUrl: string;
  onUploaded: (imageUrl: string) => void;
};

function resolveImageUrl(src: string) {
  if (!src) return '';

  if (src.startsWith('http')) return src;

  return `${API_BASE_URL}${src}`;
}

export function ImageUploadField({ label, imageUrl, onUploaded }: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { showToast } = useToast();
  const [isUploading, setIsUploading] = useState(false);

  async function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) return;

    try {
      setIsUploading(true);

      const result = await uploadCardImage(file);
      onUploaded(result.imageUrl);
      showToast(`${label}をアップロードしました`, 'success');
    } catch {
      showToast(`${label}のアップロードに失敗しました`, 'error');
    } finally {
      setIsUploading(false);

      if (inputRef.current) {
        inputRef.current.value = '';
      }
    }
  }

  const resolvedImageUrl = resolveImageUrl(imageUrl);

  return (
    <div className={styles.wrapper}>
      <p className={styles.label}>{label}</p>

      <label className={styles.uploadButton}>
        {isUploading ? 'アップロード中...' : imageUrl ? '画像を再選択' : '画像を選択'}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className={styles.fileInput}
          disabled={isUploading}
          onChange={handleChange}
        />
      </label>

      {resolvedImageUrl ? (
        <img
          src={resolvedImageUrl}
          alt={label}
          className={styles.preview}
        />
      ) : (
        <div className={styles.placeholder}>画像未選択</div>
      )}
    </div>
  );
}