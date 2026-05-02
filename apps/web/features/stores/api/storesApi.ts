import { apiClient } from '@/lib/apiClient';
import { getAccessToken } from '@/features/auth/utils/authStorage';

export type StoreOption = {
  id: string;
  storeName: string;
  prefecture: string;
  area: string;
};

export async function fetchStores() {
  const token = getAccessToken();

  return apiClient<StoreOption[]>('/stores', {
    method: 'GET',
    token: token ?? undefined,
  });
}