'use client';

import { useEffect, useState } from 'react';
import { deleteStore, fetchStores, type StoreOption } from '../api/storesApi';

export function useStores() {
  const [stores, setStores] = useState<StoreOption[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  async function loadStores() {
    try {
      setIsLoading(true);
      setErrorMessage('');

      const data = await fetchStores();
      setStores(data);
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : '店舗一覧の取得に失敗しました',
      );
    } finally {
      setIsLoading(false);
    }
  }

  async function removeStore(id: string) {
    await deleteStore(id);
    await loadStores();
  }

  useEffect(() => {
    loadStores();
  }, []);

  return {
    stores,
    isLoading,
    errorMessage,
    removeStore,
  };
}