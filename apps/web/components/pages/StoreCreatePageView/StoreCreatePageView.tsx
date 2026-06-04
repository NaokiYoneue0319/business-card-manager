'use client';

import { useRouter } from 'next/navigation';
import { FormHeader } from '@/components/organisms/FormHeader/FormHeader';
import { StoreForm } from '@/components/organisms/StoreForm/StoreForm';
import { MobileListPageLayout } from '@/components/templates/MobileListPageLayout/MobileListPageLayout';
import { SideMenu } from '@/components/organisms/SideMenu/SideMenu';
import { useStoreForm } from '@/features/stores/hooks/useStoreForm';
import { useState } from 'react';
import { useToast } from '@/components/organisms/ToastProvider/ToastProvider';
import { LoadingSpinner } from '@/components/atoms/LoadingSpinner/LoadingSpinner';

export function StoreCreatePageView() {
  const router = useRouter();
  const { showToast } = useToast();
  const {
    values,
    isLoading,
    isSubmitting,
    errorMessage,
    updateValue,
    submit,
  } = useStoreForm();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  async function handleSubmit() {
    try {
      await submit();
      showToast('店舗を登録しました', 'success');
      router.push('/stores');
    } catch {
      showToast('店舗の登録に失敗しました', 'error');
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
        onCancelClick={() => router.push('/stores')}
        onMenuClick={() => setIsMenuOpen(true)}
      />

      <StoreForm
        values={values}
        isSubmitting={isSubmitting}
        errorMessage={errorMessage}
        submitLabel="登録"
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