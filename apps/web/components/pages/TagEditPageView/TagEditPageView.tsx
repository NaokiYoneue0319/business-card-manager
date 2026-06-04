'use client';

import { useRouter } from 'next/navigation';
import { FormHeader } from '@/components/organisms/FormHeader/FormHeader';
import { TagForm } from '@/components/organisms/TagForm/TagForm';
import { MobileListPageLayout } from '@/components/templates/MobileListPageLayout/MobileListPageLayout';
import { SideMenu } from '@/components/organisms/SideMenu/SideMenu';
import { useTagForm } from '@/features/tags/hooks/useTagForm';
import { useState } from 'react';
import { useToast } from '@/components/organisms/ToastProvider/ToastProvider';
import { LoadingSpinner } from '@/components/atoms/LoadingSpinner/LoadingSpinner';

type Props = {
  id: string;
};

export function TagEditPageView({ id }: Props) {
  const router = useRouter();
  const { showToast } = useToast();
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
    try {
      await submit();
      showToast('タグを登録しました', 'success');
      router.push('/tags');
    } catch {
      showToast('タグの登録に失敗しました', 'error');
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
        onCancelClick={() => router.push('/tags')}
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