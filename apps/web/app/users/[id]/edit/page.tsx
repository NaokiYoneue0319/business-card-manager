import { AuthGuard } from '@/components/organisms/AuthGuard/AuthGuard';
import { UserEditPageView } from '@/components/pages/UserEditPageView/UserEditPageView';

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function UserEditPage({ params }: Props) {
  const { id } = await params;
  <AuthGuard allowedRoles={['ADMIN']}>
    return <UserEditPageView id={id} />;
  </AuthGuard>
}