import { getAccessToken } from '@/features/auth/utils/authStorage';
import { API_BASE_URL } from '@/lib/env';

export type UploadImageResponse = {
  imageUrl: string;
};

export async function uploadCardImage(file: File) {
  const token = getAccessToken();

  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${API_BASE_URL}/uploads/cards`, {
    method: 'POST',
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: formData,
  });

  if (!response.ok) {
    const errorBody = await response.json();
    throw new Error(errorBody?.message ?? '画像アップロードに失敗しました');
  }

  return response.json() as Promise<UploadImageResponse>;
}