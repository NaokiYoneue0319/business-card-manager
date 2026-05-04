'use client';

import { useEffect, useState } from 'react';
import { createTag, fetchTagDetail, updateTag } from '../api/tagsApi';

export type TagFormValues = {
  tagName: string;
};

export function useTagForm(id?: string) {
  const [values, setValues] = useState<TagFormValues>({
    tagName: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  function updateValue<K extends keyof TagFormValues>(
    key: K,
    value: TagFormValues[K],
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

      const tag = await fetchTagDetail(id);

      setValues({
        tagName: tag.tagName,
      });
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : 'タグ情報の取得に失敗しました',
      );
    } finally {
      setIsLoading(false);
    }
  }

  async function submit() {
    if (!values.tagName.trim()) {
      setErrorMessage('タグ名を入力してください');
      return;
    }

    try {
      setIsSubmitting(true);
      setErrorMessage('');

      const payload = {
        tagName: values.tagName,
      };

      if (id) {
        await updateTag(id, payload);
      } else {
        await createTag(payload);
      }
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : 'タグ情報の保存に失敗しました',
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