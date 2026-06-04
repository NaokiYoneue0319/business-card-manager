'use client';

import { useRouter } from 'next/navigation';
import { FormHeader } from '@/components/organisms/FormHeader/FormHeader';
import { SideMenu } from '@/components/organisms/SideMenu/SideMenu';
import { BusinessCardForm } from '@/components/organisms/BusinessCardForm/BusinessCardForm';
import { MobileListPageLayout } from '@/components/templates/MobileListPageLayout/MobileListPageLayout';
import { useCardForm } from '@/features/cards/hooks/useCardForm';
import { useToast } from '@/components/organisms/ToastProvider/ToastProvider';
import { useState } from 'react';
import { LoadingSpinner } from '@/components/atoms/LoadingSpinner/LoadingSpinner';


export function CardCreatePageView() {
  const router = useRouter();
  const { showToast } = useToast();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
    try {
        await submit();
        showToast('名刺を登録しました', 'success');
        router.push('/cards');
    } catch {
        showToast('名刺の登録に失敗しました', 'error');
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
        onCancelClick={() => router.push('/cards')}
        onMenuClick={() => setIsMenuOpen(true)}
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

      <SideMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />
    </MobileListPageLayout>
  );
}