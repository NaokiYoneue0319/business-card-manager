import { TagEditPageView } from '@/components/pages/TagEditPageView/TagEditPageView';

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function TagEditPage({ params }: Props) {
  const { id } = await params;

  return <TagEditPageView id={id} />;
}