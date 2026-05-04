'use client';

import { useRouter } from 'next/navigation';
import { DetailHeader } from '@/components/organisms/DetailHeader/DetailHeader';
import { StoreForm } from '@/components/organisms/StoreForm/StoreForm';
import { MobileListPageLayout } from '@/components/templates/MobileListPageLayout/MobileListPageLayout';
import { SideMenu } from '@/components/organisms/SideMenu/SideMenu';
import { useStoreForm } from '@/features/stores/hooks/useStoreForm';
import { useState } from 'react';

type Props = {
  id: string;
};

export function StoreEditPageView({ id }: Props) {
  const router = useRouter();

  const {
    values,
    isLoading,
    isSubmitting,
    errorMessage,
    updateValue,
    submit,
  } = useStoreForm(id);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  async function handleSubmit() {
    await submit();
    router.push('/stores');
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

      <StoreForm
        values={values}
        isSubmitting={isSubmitting}
        errorMessage={errorMessage}
        submitLabel="保存"
        onChange={updateValue}
        onSubmit={handleSubmit}
        onCancel={() => router.push('/stores')}
      />

      <SideMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />
    </MobileListPageLayout>
  );
}