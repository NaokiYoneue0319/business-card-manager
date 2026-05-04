import { AuthGuard } from '@/components/organisms/AuthGuard/AuthGuard';
import { UserCreatePageView } from '@/components/pages/UserCreatePageView/UserCreatePageView';

export default function UserCreatePage() {
  <AuthGuard allowedRoles={['ADMIN']}>
    return <UserCreatePageView />;
  </AuthGuard>
}