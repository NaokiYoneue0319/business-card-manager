import { apiClient } from '@/lib/apiClient';
import { getAccessToken } from '@/features/auth/utils/authStorage';

export type TagOption = {
  id: string;
  tagName: string;
};

export type TagPayload = {
  tagName: string;
};

export async function fetchTags() {
  const token = getAccessToken();

  return apiClient<TagOption[]>('/tags', {
    method: 'GET',
    token: token ?? undefined,
  });
}

export async function fetchTagDetail(id: string) {
  const token = getAccessToken();

  return apiClient<TagOption>(`/tags/${id}`, {
    method: 'GET',
    token: token ?? undefined,
  });
}

export async function createTag(payload: TagPayload) {
  const token = getAccessToken();

  return apiClient('/tags', {
    method: 'POST',
    token: token ?? undefined,
    body: JSON.stringify(payload),
  });
}

export async function updateTag(id: string, payload: TagPayload) {
  const token = getAccessToken();

  return apiClient(`/tags/${id}`, {
    method: 'PUT',
    token: token ?? undefined,
    body: JSON.stringify(payload),
  });
}

export async function deleteTag(id: string) {
  const token = getAccessToken();

  return apiClient(`/tags/${id}`, {
    method: 'DELETE',
    token: token ?? undefined,
  });
}