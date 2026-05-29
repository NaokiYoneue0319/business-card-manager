'use client';

import { useRouter } from 'next/navigation';
import { FormHeader } from '@/components/organisms/FormHeader/FormHeader';
import { TagForm } from '@/components/organisms/TagForm/TagForm';
import { MobileListPageLayout } from '@/components/templates/MobileListPageLayout/MobileListPageLayout';
import { SideMenu } from '@/components/organisms/SideMenu/SideMenu';
import { useTagForm } from '@/features/tags/hooks/useTagForm';
import { useState } from 'react';
import { useToast } from '@/components/organisms/ToastProvider/ToastProvider';

export function TagCreatePageView() {
  const router = useRouter();
  const { showToast } = useToast();
  const {
    values,
    isLoading,
    isSubmitting,
    errorMessage,
    updateValue,
    submit,
  } = useTagForm();

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
    return <MobileListPageLayout>読み込み中...</MobileListPageLayout>;
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
        submitLabel="登録"
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