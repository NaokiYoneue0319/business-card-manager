'use client';

import { useEffect, useState } from 'react';
import { fetchCardDetail, updateCard } from '../api/cardsApi';
import { fetchStores } from '@/features/stores/api/storesApi';
import { fetchTags } from '@/features/tags/api/tagsApi';
import { fetchUsers } from '@/features/users/api/usersApi';
import type { StoreOption } from '@/features/stores/api/storesApi';
import type { TagOption } from '@/features/tags/api/tagsApi';
import type { UserOption } from '@/features/users/api/usersApi';

export type CardFormValues = {
  name: string;
  storeId: string;
  businessDetail: string;
  memo: string;
  usedAt: string;
  usedByUserIds: string[];
  frontImageUrl: string;
  backImageUrl: string;
  tagIds: string[];
};

function toDateTimeLocalValue(value: string) {
  const date = new Date(value);
  const offset = date.getTimezoneOffset();
  const localDate = new Date(date.getTime() - offset * 60 * 1000);
  return localDate.toISOString().slice(0, 16);
}

export function useCardForm(id: string) {
  const [values, setValues] = useState<CardFormValues>({
    name: '',
    storeId: '',
    businessDetail: '',
    memo: '',
    usedAt: '',
    usedByUserIds: [],
    frontImageUrl: '',
    backImageUrl: '',
    tagIds: [],
  });

  const [stores, setStores] = useState<StoreOption[]>([]);
  const [tags, setTags] = useState<TagOption[]>([]);
  const [users, setUsers] = useState<UserOption[]>([]);

  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  function updateValue<K extends keyof CardFormValues>(
    key: K,
    value: CardFormValues[K],
  ) {
    setValues((current) => ({
      ...current,
      [key]: value,
    }));
  }

  function toggleArrayValue(key: 'usedByUserIds' | 'tagIds', id: string) {
    setValues((current) => {
      const exists = current[key].includes(id);

      return {
        ...current,
        [key]: exists
          ? current[key].filter((value) => value !== id)
          : [...current[key], id],
      };
    });
  }

  async function load() {
    try {
      setIsLoading(true);
      setErrorMessage('');

      const [card, storeList, tagList, userList] = await Promise.all([
        fetchCardDetail(id),
        fetchStores(),
        fetchTags(),
        fetchUsers(),
      ]);

      setStores(storeList);
      setTags(tagList);
      setUsers(userList);

      setValues({
        name: card.name,
        storeId: card.store.id,
        businessDetail: card.businessDetail ?? '',
        memo: card.memo ?? '',
        usedAt: toDateTimeLocalValue(card.usedAt),
        usedByUserIds: card.usedByUsers.map((user) => user.id),
        frontImageUrl: card.images.front,
        backImageUrl: card.images.back ?? '',
        tagIds: card.tags.map((tag) => tag.id),
      });
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : '名刺情報の取得に失敗しました',
      );
    } finally {
      setIsLoading(false);
    }
  }

  async function submit() {
    if (!values.name.trim()) {
      setErrorMessage('氏名を入力してください');
      return;
    }

    if (!values.storeId) {
      setErrorMessage('店舗を選択してください');
      return;
    }

    if (!values.usedAt) {
      setErrorMessage('利用日時を入力してください');
      return;
    }

    if (values.usedByUserIds.length === 0) {
      setErrorMessage('利用者を1人以上選択してください');
      return;
    }

    try {
      setIsSubmitting(true);
      setErrorMessage('');

      await updateCard(id, {
        name: values.name,
        storeId: values.storeId,
        businessDetail: values.businessDetail || undefined,
        memo: values.memo || undefined,
        usedAt: new Date(values.usedAt).toISOString(),
        usedByUserIds: values.usedByUserIds,
        frontImageUrl: values.frontImageUrl,
        backImageUrl: values.backImageUrl || null,
        tagIds: values.tagIds,
      });
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : '名刺の更新に失敗しました',
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
    stores,
    tags,
    users,
    isLoading,
    isSubmitting,
    errorMessage,
    updateValue,
    toggleArrayValue,
    submit,
  };
}