import { apiClient } from '@/lib/apiClient';
import { getAccessToken } from '@/features/auth/utils/authStorage';
import type { CardListItem, SearchCardsParams } from '../types/cardTypes';

function buildQuery(params: SearchCardsParams) {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value) {
      query.append(key, value);
    }
  });

  const queryString = query.toString();
  return queryString ? `?${queryString}` : '';
}

export async function fetchCards(params: SearchCardsParams) {
  const token = getAccessToken();

  return apiClient<CardListItem[]>(`/cards${buildQuery(params)}`, {
    method: 'GET',
    token: token ?? undefined,
  });
}

export async function deleteCard(id: string) {
  const token = getAccessToken();

  return apiClient(`/cards/${id}`, {
    method: 'DELETE',
    token: token ?? undefined,
  });
}
