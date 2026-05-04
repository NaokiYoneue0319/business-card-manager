'use client';

import { useEffect, useState } from 'react';
import {
  createStore,
  fetchStoreDetail,
  updateStore,
} from '../api/storesApi';

export type StoreFormValues = {
  storeName: string;
  prefecture: string;
  area: string;
};

export function useStoreForm(id?: string) {
  const [values, setValues] = useState<StoreFormValues>({
    storeName: '',
    prefecture: '',
    area: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  function updateValue<K extends keyof StoreFormValues>(
    key: K,
    value: StoreFormValues[K],
  ) {
    setValues((current) => ({
      ...current,
      [key]: value,
    }));
  }

  async function load() {
    if (!id) return;

    try {
      setIsLoading(true);
      setErrorMessage('');

      const store = await fetchStoreDetail(id);

      setValues({
        storeName: store.storeName,
        prefecture: store.prefecture,
        area: store.area,
      });
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : '店舗情報の取得に失敗しました',
      );
    } finally {
      setIsLoading(false);
    }
  }

  async function submit() {
    if (!values.storeName.trim()) {
      setErrorMessage('店舗名を入力してください');
      return;
    }

    if (!values.prefecture.trim()) {
      setErrorMessage('都道府県を入力してください');
      return;
    }

    if (!values.area.trim()) {
      setErrorMessage('地域を入力してください');
      return;
    }

    try {
      setIsSubmitting(true);
      setErrorMessage('');

      const payload = {
        storeName: values.storeName,
        prefecture: values.prefecture,
        area: values.area,
      };

      if (id) {
        await updateStore(id, payload);
      } else {
        await createStore(payload);
      }
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : '店舗情報の保存に失敗しました',
      );
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  }

  useEffect(() => {
    load();
  }, [id]);

  return {
    values,
    isLoading,
    isSubmitting,
    errorMessage,
    updateValue,
    submit,
  };
}