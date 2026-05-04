'use client';

import { useRouter } from 'next/navigation';
import { DetailHeader } from '@/components/organisms/DetailHeader/DetailHeader';
import { StoreForm } from '@/components/organisms/StoreForm/StoreForm';
import { MobileListPageLayout } from '@/components/templates/MobileListPageLayout/MobileListPageLayout';
import { useStoreForm } from '@/features/stores/hooks/useStoreForm';

export function StoreCreatePageView() {
  const router = useRouter();

  const {
    values,
    isLoading,
    isSubmitting,
    errorMessage,
    updateValue,
    submit,
  } = useStoreForm();

  async function handleSubmit() {
    await submit();
    router.push('/stores');
  }

  if (isLoading) {
    return <MobileListPageLayout>読み込み中...</MobileListPageLayout>;
  }

  return (
    <MobileListPageLayout>
      <DetailHeader onEditClick={() => {}} onDeleteClick={() => {}} />

      <StoreForm
        values={values}
        isSubmitting={isSubmitting}
        errorMessage={errorMessage}
        submitLabel="登録"
        onChange={updateValue}
        onSubmit={handleSubmit}
        onCancel={() => router.push('/stores')}
      />
    </MobileListPageLayout>
  );
}