import { StoreEditPageView } from '@/components/pages/StoreEditPageView/StoreEditPageView';

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function StoreEditPage({ params }: Props) {
  const { id } = await params;

  return <StoreEditPageView id={id} />;
}