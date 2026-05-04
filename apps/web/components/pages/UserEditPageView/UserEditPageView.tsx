'use client';

import { useRouter } from 'next/navigation';
import { DetailHeader } from '@/components/organisms/DetailHeader/DetailHeader';
import { UserForm } from '@/components/organisms/UserForm/UserForm';
import { MobileListPageLayout } from '@/components/templates/MobileListPageLayout/MobileListPageLayout';
import { SideMenu } from '@/components/organisms/SideMenu/SideMenu';
import { useUserForm } from '@/features/users/hooks/useUserForm';
import { useState } from 'react';

type Props = {
  id: string;
};

export function UserEditPageView({ id }: Props) {
  const router = useRouter();

  const {
    values,
    isEditMode,
    isLoading,
    isSubmitting,
    errorMessage,
    updateValue,
    submit,
  } = useUserForm(id);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  async function handleSubmit() {
    await submit();
    router.push('/users');
  }

  if (isLoading) {
    return <MobileListPageLayout>読み込み中...</MobileListPageLayout>;
  }

  return (
    <MobileListPageLayout>
      <DetailHeader
        onEditClick={() => {}}
        onDeleteClick={() => {}}
        onMenuClick={() => setIsMenuOpen(true)}
      />

      <UserForm
        values={values}
        isEditMode={isEditMode}
        isSubmitting={isSubmitting}
        errorMessage={errorMessage}
        submitLabel="保存"
        onChange={updateValue}
        onSubmit={handleSubmit}
        onCancel={() => router.push('/users')}
      />

      <SideMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />
    </MobileListPageLayout>
  );
}