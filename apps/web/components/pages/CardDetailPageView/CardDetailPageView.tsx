'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { DetailHeader } from '@/components/organisms/DetailHeader/DetailHeader';
import { CardBasicInfoSection } from '@/components/organisms/CardBasicInfoSection/CardBasicInfoSection';
import { CardImageSection } from '@/components/organisms/CardImageSection/CardImageSection';
import { CardOtherInfoSection } from '@/components/organisms/CardOtherInfoSection/CardOtherInfoSection';
import { DeleteConfirmModal } from '@/components/organisms/DeleteConfirmModal/DeleteConfirmModal';
import { MobileListPageLayout } from '@/components/templates/MobileListPageLayout/MobileListPageLayout';
import { SideMenu } from '@/components/organisms/SideMenu/SideMenu';
import { useCardDetail } from '@/features/cards/hooks/useCardDetail';

type Props = {
  id: string;
};

export function CardDetailPageView({ id }: Props) {
  const router = useRouter();
  const { card, isLoading, errorMessage, removeCard } = useCardDetail(id);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  async function handleDelete() {
    await removeCard();
    router.push('/cards');
  }

  if (isLoading) {
    return <MobileListPageLayout>読み込み中...</MobileListPageLayout>;
  }

  if (errorMessage) {
    return <MobileListPageLayout>{errorMessage}</MobileListPageLayout>;
  }

  if (!card) {
    return <MobileListPageLayout>名刺が見つかりません</MobileListPageLayout>;
  }

  return (
    <MobileListPageLayout>
      <DetailHeader
        onEditClick={() => router.push(`/cards/${id}/edit`)}
        onDeleteClick={() => setIsDeleteOpen(true)}
        onMenuClick={() => setIsMenuOpen(true)}
      />

      <CardBasicInfoSection card={card} />
      <CardImageSection card={card} />
      <CardOtherInfoSection card={card} />

      <DeleteConfirmModal
        card={
            isDeleteOpen
                ? {
                    id: card.id,
                    name: card.name,
                    frontImageUrl: card.images.front,
                    store: card.store,
                    cardUsers: [],
                    cardTags: [],
                }
            : null
        }
        onClose={() => setIsDeleteOpen(false)}
        onConfirm={handleDelete}
      />
      <SideMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />
    </MobileListPageLayout>
  );
}
