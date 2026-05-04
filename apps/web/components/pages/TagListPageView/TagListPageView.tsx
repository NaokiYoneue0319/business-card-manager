'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { AppHeader } from '@/components/organisms/AppHeader/AppHeader';
import { TagList } from '@/components/organisms/TagList/TagList';
import { TagDeleteConfirmModal } from '@/components/organisms/TagDeleteConfirmModal/TagDeleteConfirmModal';
import { MobileListPageLayout } from '@/components/templates/MobileListPageLayout/MobileListPageLayout';
import { useTags } from '@/features/tags/hooks/useTags';
import type { TagOption } from '@/features/tags/api/tagsApi';

export function TagListPageView() {
  const router = useRouter();
  const { tags, isLoading, errorMessage, removeTag } = useTags();

  const [deleteTarget, setDeleteTarget] = useState<TagOption | null>(null);

  async function handleDelete() {
    if (!deleteTarget) return;

    await removeTag(deleteTarget.id);
    setDeleteTarget(null);
  }

  return (
    <MobileListPageLayout>
      <AppHeader
        onSearchClick={() => {}}
        onCreateClick={() => router.push('/tags/new')}
      />

      {isLoading ? <p>読み込み中...</p> : null}
      {errorMessage ? <p>{errorMessage}</p> : null}

      <TagList tags={tags} onDeleteClick={setDeleteTarget} />

      <TagDeleteConfirmModal
        tag={deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
      />
    </MobileListPageLayout>
  );
}