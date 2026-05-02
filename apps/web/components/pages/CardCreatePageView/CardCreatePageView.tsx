'use client';

import { useRouter } from 'next/navigation';
import { DetailHeader } from '@/components/organisms/DetailHeader/DetailHeader';
import { BusinessCardForm } from '@/components/organisms/BusinessCardForm/BusinessCardForm';
import { MobileListPageLayout } from '@/components/templates/MobileListPageLayout/MobileListPageLayout';
import { useCardForm } from '@/features/cards/hooks/useCardForm';

export function CardCreatePageView() {
  const router = useRouter();

  const {
    values,
    stores,
    tags,
    users,
    isLoading,
    isSubmitting,
    errorMessage,
    updateValue,
    toggleArrayValue,
    submit,
  } = useCardForm();

  async function handleSubmit() {
    await submit();
    router.push('/cards');
  }

  if (isLoading) {
    return <MobileListPageLayout>読み込み中...</MobileListPageLayout>;
  }

  return (
    <MobileListPageLayout>
      <DetailHeader
        onEditClick={() => {}}
        onDeleteClick={() => {}}
      />

      <BusinessCardForm
        values={values}
        stores={stores}
        tags={tags}
        users={users}
        isSubmitting={isSubmitting}
        errorMessage={errorMessage}
        submitLabel="登録"
        onChange={updateValue}
        onToggleArrayValue={toggleArrayValue}
        onSubmit={handleSubmit}
        onCancel={() => router.push('/cards')}
      />
    </MobileListPageLayout>
  );
}