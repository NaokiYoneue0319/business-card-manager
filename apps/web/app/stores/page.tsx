import { AuthGuard } from '@/components/organisms/AuthGuard/AuthGuard';
import { StoreListPageView } from '@/components/pages/StoreListPageView/StoreListPageView';

export default function StoresPage() {
  return (
    <AuthGuard>
      <StoreListPageView />
    </AuthGuard>
  );
}