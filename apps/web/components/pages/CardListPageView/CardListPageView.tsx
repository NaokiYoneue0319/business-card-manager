'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ROUTES } from '@/constants/routes';
import { AppHeader } from '@/components/organisms/AppHeader/AppHeader';
import { BusinessCardList } from '@/components/organisms/BusinessCardList/BusinessCardList';
import { DeleteConfirmModal } from '@/components/organisms/DeleteConfirmModal/DeleteConfirmModal';
import { SearchConditionModal } from '@/components/organisms/SearchConditionModal/SearchConditionModal';
import { MobileListPageLayout } from '@/components/templates/MobileListPageLayout/MobileListPageLayout';
import { useCards } from '@/features/cards/hooks/useCards';
import type { CardListItem } from '@/features/cards/types/cardTypes';

export function CardListPageView() {
  const router = useRouter();
  const { cards, isLoading, errorMessage, search, removeCard } = useCards();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<CardListItem | null>(null);

  async function handleDelete() {
    if (!deleteTarget) return;

    await removeCard(deleteTarget.id);
    setDeleteTarget(null);
  }

  return (
    <MobileListPageLayout>
      <AppHeader
        onSearchClick={() => setIsSearchOpen(true)}
        onCreateClick={() => router.push('/cards/new')}
      />

      {isLoading ? <p>読み込み中...</p> : null}
      {errorMessage ? <p>{errorMessage}</p> : null}

      <BusinessCardList cards={cards} onDeleteClick={setDeleteTarget} />

      <SearchConditionModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSearch={search}
      />

      <DeleteConfirmModal
        card={deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
      />
    </MobileListPageLayout>
  );
}
