import { AuthGuard } from '@/components/organisms/AuthGuard/AuthGuard';
import { UserListPageView } from '@/components/pages/UserListPageView/UserListPageView';

export default function UsersPage() {
  return (
    <AuthGuard allowedRoles={['ADMIN']}>
      <UserListPageView />
    </AuthGuard>
  );
}