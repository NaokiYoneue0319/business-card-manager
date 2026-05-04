'use client';

import { useRouter } from 'next/navigation';
import { DetailHeader } from '@/components/organisms/DetailHeader/DetailHeader';
import { TagForm } from '@/components/organisms/TagForm/TagForm';
import { MobileListPageLayout } from '@/components/templates/MobileListPageLayout/MobileListPageLayout';
import { SideMenu } from '@/components/organisms/SideMenu/SideMenu';
import { useTagForm } from '@/features/tags/hooks/useTagForm';
import { useState } from 'react';

type Props = {
  id: string;
};

export function TagEditPageView({ id }: Props) {
  const router = useRouter();

  const {
    values,
    isLoading,
    isSubmitting,
    errorMessage,
    updateValue,
    submit,
  } = useTagForm(id);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  async function handleSubmit() {
    await submit();
    router.push('/tags');
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

      <TagForm
        values={values}
        isSubmitting={isSubmitting}
        errorMessage={errorMessage}
        submitLabel="保存"
        onChange={updateValue}
        onSubmit={handleSubmit}
        onCancel={() => router.push('/tags')}
      />

      <SideMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />
    </MobileListPageLayout>
  );
}