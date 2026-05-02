import { CardDetailPageView } from '@/components/pages/CardDetailPageView/CardDetailPageView';

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function CardDetailPage({ params }: Props) {
  const { id } = await params;

  return <CardDetailPageView id={id} />;
}
