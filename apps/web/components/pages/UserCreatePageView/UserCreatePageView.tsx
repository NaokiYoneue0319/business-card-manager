'use client';

import { useRouter } from 'next/navigation';
import { DetailHeader } from '@/components/organisms/DetailHeader/DetailHeader';
import { UserForm } from '@/components/organisms/UserForm/UserForm';
import { MobileListPageLayout } from '@/components/templates/MobileListPageLayout/MobileListPageLayout';
import { useUserForm } from '@/features/users/hooks/useUserForm';

export function UserCreatePageView() {
  const router = useRouter();

  const {
    values,
    isEditMode,
    isLoading,
    isSubmitting,
    errorMessage,
    updateValue,
    submit,
  } = useUserForm();

  async function handleSubmit() {
    await submit();
    router.push('/users');
  }

  if (isLoading) {
    return <MobileListPageLayout>読み込み中...</MobileListPageLayout>;
  }

  return (
    <MobileListPageLayout>
      <DetailHeader onEditClick={() => {}} onDeleteClick={() => {}} />

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
    </MobileListPageLayout>
  );
}