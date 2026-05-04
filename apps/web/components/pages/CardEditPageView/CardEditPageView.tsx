'use client';

import { useRouter } from 'next/navigation';
import { DetailHeader } from '@/components/organisms/DetailHeader/DetailHeader';
import { BusinessCardForm } from '@/components/organisms/BusinessCardForm/BusinessCardForm';
import { MobileListPageLayout } from '@/components/templates/MobileListPageLayout/MobileListPageLayout';
import { SideMenu } from '@/components/organisms/SideMenu/SideMenu';
import { useCardForm } from '@/features/cards/hooks/useCardForm';
import { useState } from 'react';

type Props = {
  id: string;
};

export function CardEditPageView({ id }: Props) {
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
  } = useCardForm(id);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  async function handleSubmit() {
    await submit();
    router.push(`/cards/${id}`);
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

      <BusinessCardForm
        values={values}
        stores={stores}
        tags={tags}
        users={users}
        isSubmitting={isSubmitting}
        errorMessage={errorMessage}
        submitLabel="保存"
        onChange={updateValue}
        onToggleArrayValue={toggleArrayValue}
        onSubmit={handleSubmit}
        onCancel={() => router.push(`/cards/${id}`)}
      />
      <SideMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />
    </MobileListPageLayout>
  );
}