'use client';

import { useEffect, useState } from 'react';
import { fetchCardDetail, deleteCard } from '../api/cardsApi';
import type { CardDetail } from '../types/cardTypes';

export function useCardDetail(id: string) {
  const [card, setCard] = useState<CardDetail | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  async function loadCard() {
    try {
      setIsLoading(true);
      setErrorMessage('');
      const data = await fetchCardDetail(id);
      setCard(data);
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : '名刺詳細の取得に失敗しました',
      );
    } finally {
      setIsLoading(false);
    }
  }

  async function removeCard() {
    await deleteCard(id);
  }

  useEffect(() => {
    loadCard();
  }, [id]);

  return {
    card,
    isLoading,
    errorMessage,
    removeCard,
  };
}
