'use client';

import { useRouter } from 'next/navigation';
import { DetailHeader } from '@/components/organisms/DetailHeader/DetailHeader';
import { TagForm } from '@/components/organisms/TagForm/TagForm';
import { MobileListPageLayout } from '@/components/templates/MobileListPageLayout/MobileListPageLayout';
import { useTagForm } from '@/features/tags/hooks/useTagForm';

export function TagCreatePageView() {
  const router = useRouter();

  const {
    values,
    isLoading,
    isSubmitting,
    errorMessage,
    updateValue,
    submit,
  } = useTagForm();

  async function handleSubmit() {
    await submit();
    router.push('/tags');
  }

  if (isLoading) {
    return <MobileListPageLayout>読み込み中...</MobileListPageLayout>;
  }

  return (
    <MobileListPageLayout>
      <DetailHeader onEditClick={() => {}} onDeleteClick={() => {}} />

      <TagForm
        values={values}
        isSubmitting={isSubmitting}
        errorMessage={errorMessage}
        submitLabel="登録"
        onChange={updateValue}
        onSubmit={handleSubmit}
        onCancel={() => router.push('/tags')}
      />
    </MobileListPageLayout>
  );
}