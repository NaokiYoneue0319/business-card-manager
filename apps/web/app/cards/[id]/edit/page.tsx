import { CardEditPageView } from '@/components/pages/CardEditPageView/CardEditPageView';

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function CardEditPage({ params }: Props) {
  const { id } = await params;

  return <CardEditPageView id={id} />;
}