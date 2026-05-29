'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { AppHeader } from '@/components/organisms/AppHeader/AppHeader';
import { SideMenu } from '@/components/organisms/SideMenu/SideMenu';
import { TagList } from '@/components/organisms/TagList/TagList';
import { TagDeleteConfirmModal } from '@/components/organisms/TagDeleteConfirmModal/TagDeleteConfirmModal';
import { MobileListPageLayout } from '@/components/templates/MobileListPageLayout/MobileListPageLayout';
import { useTags } from '@/features/tags/hooks/useTags';
import type { TagOption } from '@/features/tags/api/tagsApi';
import { useToast } from '@/components/organisms/ToastProvider/ToastProvider';

export function TagListPageView() {
  const router = useRouter();
  const { tags, isLoading, errorMessage, removeTag } = useTags();
  const [deleteTarget, setDeleteTarget] = useState<TagOption | null>(null);
  const { showToast } = useToast();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  async function handleDelete() {
    if (!deleteTarget) return;

    try {
      await removeTag(deleteTarget.id);
      showToast('タグを削除しました', 'success');
      setDeleteTarget(null);
    } catch {
      showToast('タグの削除に失敗しました', 'error');
    }
  }

  return (
    <MobileListPageLayout>
      <AppHeader
        onSearchClick={() => {}}
        onCreateClick={() => router.push('/tags/new')}
        onMenuClick={() => setIsMenuOpen(true)}
      />

      {isLoading ? <p>読み込み中...</p> : null}
      {errorMessage ? <p>{errorMessage}</p> : null}

      <TagList tags={tags} onDeleteClick={setDeleteTarget} />

      <TagDeleteConfirmModal
        tag={deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
      />
      <SideMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />
    </MobileListPageLayout>
  );
}