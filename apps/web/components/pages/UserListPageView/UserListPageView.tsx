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

export function UserListPageView() {
  const router = useRouter();
  const { users, isLoading, errorMessage, removeUser } = useUsers();

  const [deleteTarget, setDeleteTarget] = useState<UserOption | null>(null);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  async function handleDelete() {
    if (!deleteTarget) return;

    await removeUser(deleteTarget.id);
    setDeleteTarget(null);
  }

  return (
    <MobileListPageLayout>
      <AppHeader
        onSearchClick={() => {}}
        onCreateClick={() => router.push('/users/new')}
        onMenuClick={() => setIsMenuOpen(true)}
      />

      {isLoading ? <p>読み込み中...</p> : null}
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