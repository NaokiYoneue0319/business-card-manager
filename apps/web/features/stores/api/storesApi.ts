import { apiClient } from '@/lib/apiClient';
import { getAccessToken } from '@/features/auth/utils/authStorage';

export type StoreOption = {
  id: string;
  storeName: string;
  prefecture: string;
  area: string;
};

export type StorePayload = {
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

export async function deleteStore(id: string) {
  const token = getAccessToken();

  return apiClient(`/stores/${id}`, {
    method: 'DELETE',
    token: token ?? undefined,
  });
}

export async function fetchStoreDetail(id: string) {
  const token = getAccessToken();

  return apiClient<StoreOption>(`/stores/${id}`, {
    method: 'GET',
    token: token ?? undefined,
  });
}

export async function createStore(payload: StorePayload) {
  const token = getAccessToken();

  return apiClient('/stores', {
    method: 'POST',
    token: token ?? undefined,
    body: JSON.stringify(payload),
  });
}

export async function updateStore(id: string, payload: StorePayload) {
  const token = getAccessToken();

  return apiClient(`/stores/${id}`, {
    method: 'PUT',
    token: token ?? undefined,
    body: JSON.stringify(payload),
  });
}