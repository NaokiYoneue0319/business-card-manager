import { UserEditPageView } from '@/components/pages/UserEditPageView/UserEditPageView';

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function UserEditPage({ params }: Props) {
  const { id } = await params;

  return <UserEditPageView id={id} />;
}