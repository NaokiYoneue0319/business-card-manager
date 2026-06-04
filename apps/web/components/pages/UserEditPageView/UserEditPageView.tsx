'use client';

import { useRouter } from 'next/navigation';
import { FormHeader } from '@/components/organisms/FormHeader/FormHeader';
import { UserForm } from '@/components/organisms/UserForm/UserForm';
import { MobileListPageLayout } from '@/components/templates/MobileListPageLayout/MobileListPageLayout';
import { SideMenu } from '@/components/organisms/SideMenu/SideMenu';
import { useUserForm } from '@/features/users/hooks/useUserForm';
import { useState } from 'react';
import { useToast } from '@/components/organisms/ToastProvider/ToastProvider';
import { LoadingSpinner } from '@/components/atoms/LoadingSpinner/LoadingSpinner';

type Props = {
  id: string;
};

export function UserEditPageView({ id }: Props) {
  const router = useRouter();
  const { showToast } = useToast();
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
    try {
      await submit();
      showToast('ユーザーを更新しました', 'success');
      router.push('/users');
    } catch {
      showToast('ユーザーの更新に失敗しました', 'error');
    }
  }

  if (isLoading) {
    return (
      <MobileListPageLayout>
        <LoadingSpinner />
      </MobileListPageLayout>
    );
  }

  return (
    <MobileListPageLayout>
      <FormHeader
        onSubmitClick={handleSubmit}
        onCancelClick={() => router.push('/users')}
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