'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { AppHeader } from '@/components/organisms/AppHeader/AppHeader';
import { StoreList } from '@/components/organisms/StoreList/StoreList';
import { StoreDeleteConfirmModal } from '@/components/organisms/StoreDeleteConfirmModal/StoreDeleteConfirmModal';
import { MobileListPageLayout } from '@/components/templates/MobileListPageLayout/MobileListPageLayout';
import { useStores } from '@/features/stores/hooks/useStores';
import type { StoreOption } from '@/features/stores/api/storesApi';

export function StoreListPageView() {
  const router = useRouter();
  const { stores, isLoading, errorMessage, removeStore } = useStores();

  const [deleteTarget, setDeleteTarget] = useState<StoreOption | null>(null);

  async function handleDelete() {
    if (!deleteTarget) return;

    await removeStore(deleteTarget.id);
    setDeleteTarget(null);
  }

  return (
    <MobileListPageLayout>
      <AppHeader
        onSearchClick={() => {}}
        onCreateClick={() => router.push('/stores/new')}
      />

      {isLoading ? <p>読み込み中...</p> : null}
      {errorMessage ? <p>{errorMessage}</p> : null}

      <StoreList stores={stores} onDeleteClick={setDeleteTarget} />

      <StoreDeleteConfirmModal
        store={deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
      />
    </MobileListPageLayout>
  );
}