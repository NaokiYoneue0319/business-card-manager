'use client';

import { useEffect, useState } from 'react';
import { deleteTag, fetchTags, type TagOption } from '../api/tagsApi';

export function useTags() {
  const [tags, setTags] = useState<TagOption[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  async function loadTags() {
    try {
      setIsLoading(true);
      setErrorMessage('');

      const data = await fetchTags();
      setTags(data);
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : 'タグ一覧の取得に失敗しました',
      );
    } finally {
      setIsLoading(false);
    }
  }

  async function removeTag(id: string) {
    await deleteTag(id);
    await loadTags();
  }

  useEffect(() => {
    loadTags();
  }, []);

  return {
    tags,
    isLoading,
    errorMessage,
    removeTag,
  };
}