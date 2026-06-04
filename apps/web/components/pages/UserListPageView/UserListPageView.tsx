'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { AppHeader } from '@/components/organisms/AppHeader/AppHeader';
import { SideMenu } from '@/components/organisms/SideMenu/SideMenu';
import { UserList } from '@/components/organisms/UserList/UserList';
import { UserDeleteConfirmModal } from '@/components/organisms/UserDeleteConfirmModal/UserDeleteConfirmModal';
import { MobileListPageLayout } from '@/components/templates/MobileListPageLayout/MobileListPageLayout';
import { useUsers } from '@/features/users/hooks/useUsers';
import type { UserOption } from '@/features/users/api/usersApi';
import { useToast } from '@/components/organisms/ToastProvider/ToastProvider';
import { LoadingSpinner } from '@/components/atoms/LoadingSpinner/LoadingSpinner';
import { EmptyState } from '@/components/atoms/EmptyState/EmptyState';

export function UserListPageView() {
  const router = useRouter();
  const { users, isLoading, errorMessage, removeUser } = useUsers();
  const [deleteTarget, setDeleteTarget] = useState<UserOption | null>(null);
  const { showToast } = useToast();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  async function handleDelete() {
    if (!deleteTarget) return;

    try {
      await removeUser(deleteTarget.id);
      showToast('ユーザーを削除しました', 'success');
      setDeleteTarget(null);
    } catch {
      showToast('ユーザーの削除に失敗しました', 'error');
    }
  }

  return (
    <MobileListPageLayout>
      <AppHeader
        onSearchClick={() => {}}
        onCreateClick={() => router.push('/users/new')}
        onMenuClick={() => setIsMenuOpen(true)}
      />

      {isLoading ? (
        <LoadingSpinner />
      ) : users.length === 0 ? (
        <EmptyState message="ユーザーが存在しません" />
      ) : (
        <UserList users={users} onDeleteClick={setDeleteTarget} />
      )}
      {errorMessage ? <p>{errorMessage}</p> : null}

      <UserList users={users} onDeleteClick={setDeleteTarget} />

      <UserDeleteConfirmModal
        user={deleteTarget}
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