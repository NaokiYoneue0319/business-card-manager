import { apiClient } from '@/lib/apiClient';
import { getAccessToken } from '@/features/auth/utils/authStorage';

export type TagOption = {
  id: string;
  tagName: string;
};

export async function fetchTags() {
  const token = getAccessToken();

  return apiClient<TagOption[]>('/tags', {
    method: 'GET',
    token: token ?? undefined,
  });
}