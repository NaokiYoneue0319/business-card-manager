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

export function UserCreatePageView() {
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
  } = useUserForm();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  async function handleSubmit() {
    try {
      await submit();
      showToast('ユーザーを登録しました', 'success');
      router.push('/users');
    } catch {
      showToast('ユーザーの登録に失敗しました', 'error');
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
        submitLabel="登録"
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