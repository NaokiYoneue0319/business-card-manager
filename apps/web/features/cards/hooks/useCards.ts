'use client';

import { useEffect, useState } from 'react';
import { deleteCard, fetchCards } from '../api/cardsApi';
import type { CardListItem, SearchCardsParams } from '../types/cardTypes';

export function useCards() {
  const [cards, setCards] = useState<CardListItem[]>([]);
  const [searchParams, setSearchParams] = useState<SearchCardsParams>({});
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  async function loadCards(params: SearchCardsParams = searchParams) {
    try {
      setIsLoading(true);
      setErrorMessage('');

      const data = await fetchCards(params);
      setCards(data);
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : '名刺一覧の取得に失敗しました',
      );
    } finally {
      setIsLoading(false);
    }
  }

  async function removeCard(id: string) {
    await deleteCard(id);
    await loadCards();
  }

  function search(params: SearchCardsParams) {
    setSearchParams(params);
    loadCards(params);
  }

  useEffect(() => {
    loadCards({});
  }, []);

  return {
    cards,
    isLoading,
    errorMessage,
    searchParams,
    search,
    removeCard,
  };
}
