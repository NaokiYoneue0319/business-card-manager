import { AuthGuard } from '@/components/organisms/AuthGuard/AuthGuard';
import { CardListPageView } from '@/components/pages/CardListPageView/CardListPageView';

export default function CardsPage() {
  return (
    <AuthGuard>
      <CardListPageView />
    </AuthGuard>
  );
}