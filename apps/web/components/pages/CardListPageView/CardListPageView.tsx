'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { AppHeader } from '@/components/organisms/AppHeader/AppHeader';
import { BusinessCardList } from '@/components/organisms/BusinessCardList/BusinessCardList';
import { DeleteConfirmModal } from '@/components/organisms/DeleteConfirmModal/DeleteConfirmModal';
import { SearchConditionModal } from '@/components/organisms/SearchConditionModal/SearchConditionModal';
import { SideMenu } from '@/components/organisms/SideMenu/SideMenu';
import { MobileListPageLayout } from '@/components/templates/MobileListPageLayout/MobileListPageLayout';
import { useCards } from '@/features/cards/hooks/useCards';
import type { CardListItem } from '@/features/cards/types/cardTypes';
import { useToast } from '@/components/organisms/ToastProvider/ToastProvider';
import { LoadingSpinner } from '@/components/atoms/LoadingSpinner/LoadingSpinner';
import { EmptyState } from '@/components/atoms/EmptyState/EmptyState';

export function CardListPageView() {
  const router = useRouter();
  const { cards, isLoading, errorMessage, search, removeCard } = useCards();
  const { showToast } = useToast();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<CardListItem | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  async function handleDelete() {
    if (!deleteTarget) return;

    try {
      await removeCard(deleteTarget.id);
      showToast('名刺を削除しました', 'success');
      setDeleteTarget(null);
    } catch {
      showToast('名刺の削除に失敗しました', 'error');
    }
  }

  return (
    <MobileListPageLayout>
      <AppHeader
        onSearchClick={() => setIsSearchOpen(true)}
        onCreateClick={() => router.push('/cards/new')}
        onMenuClick={() => setIsMenuOpen(true)}
      />

      {isLoading ? (
        <LoadingSpinner />
      ) : cards.length === 0 ? (
        <EmptyState message="名刺がありません" />
      ) : (
        <BusinessCardList cards={cards} onDeleteClick={setDeleteTarget} />
      )}
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

      <SideMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />
    </MobileListPageLayout>
  );
}
