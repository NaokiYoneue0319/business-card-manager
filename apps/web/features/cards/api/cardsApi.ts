import { apiClient } from '@/lib/apiClient';
import { getAccessToken } from '@/features/auth/utils/authStorage';
import type { CardListItem, SearchCardsParams } from '../types/cardTypes';
import type { CardDetail } from '../types/cardTypes';


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

export async function fetchCardDetail(id: string) {
  const token = getAccessToken();

  return apiClient<CardDetail>(`/cards/${id}`, {
    method: 'GET',
    token: token ?? undefined,
  });
}

export type UpdateCardPayload = {
  name: string;
  storeId: string;
  businessDetail?: string;
  memo?: string;
  usedAt: string;
  usedByUserIds: string[];
  frontImageUrl: string;
  backImageUrl?: string | null;
  tagIds?: string[];
};

export async function updateCard(id: string, payload: UpdateCardPayload) {
  const token = getAccessToken();

  return apiClient(`/cards/${id}`, {
    method: 'PUT',
    token: token ?? undefined,
    body: JSON.stringify(payload),
  });
}

export type CreateCardPayload = {
  name: string;
  storeId: string;
  businessDetail?: string;
  memo?: string;
  usedAt: string;
  usedByUserIds: string[];
  frontImageUrl: string;
  backImageUrl?: string | null;
  tagIds?: string[];
};

export async function createCard(payload: CreateCardPayload) {
  const token = getAccessToken();

  return apiClient('/cards', {
    method: 'POST',
    token: token ?? undefined,
    body: JSON.stringify(payload),
  });
}