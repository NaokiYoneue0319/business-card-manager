'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { AppHeader } from '@/components/organisms/AppHeader/AppHeader';
import { SideMenu } from '@/components/organisms/SideMenu/SideMenu';
import { StoreList } from '@/components/organisms/StoreList/StoreList';
import { StoreDeleteConfirmModal } from '@/components/organisms/StoreDeleteConfirmModal/StoreDeleteConfirmModal';
import { MobileListPageLayout } from '@/components/templates/MobileListPageLayout/MobileListPageLayout';
import { useStores } from '@/features/stores/hooks/useStores';
import type { StoreOption } from '@/features/stores/api/storesApi';
import { useToast } from '@/components/organisms/ToastProvider/ToastProvider';
import { LoadingSpinner } from '@/components/atoms/LoadingSpinner/LoadingSpinner';
import { EmptyState } from '@/components/atoms/EmptyState/EmptyState';

export function StoreListPageView() {
  const router = useRouter();
  const { stores, isLoading, errorMessage, removeStore } = useStores();
  const { showToast } = useToast();

  const [deleteTarget, setDeleteTarget] = useState<StoreOption | null>(null);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  async function handleDelete() {
    if (!deleteTarget) return;

    try {
      await removeStore(deleteTarget.id);
      showToast('店舗を削除しました', 'success');
      setDeleteTarget(null);
    } catch {
      showToast('店舗の削除に失敗しました', 'error');
    }
  }

  return (
    <MobileListPageLayout>
      <AppHeader
        onSearchClick={() => {}}
        onCreateClick={() => router.push('/stores/new')}
        onMenuClick={() => setIsMenuOpen(true)}
      />

      {isLoading ? (
        <LoadingSpinner />
      ) : stores.length === 0 ? (
        <EmptyState message="店舗がありません" />
      ) : (
        <StoreList stores={stores} onDeleteClick={setDeleteTarget} />
      )}
      {errorMessage ? <p>{errorMessage}</p> : null}

      <StoreList stores={stores} onDeleteClick={setDeleteTarget} />

      <StoreDeleteConfirmModal
        store={deleteTarget}
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