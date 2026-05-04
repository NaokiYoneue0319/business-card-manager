import { AuthGuard } from '@/components/organisms/AuthGuard/AuthGuard';
import { TagListPageView } from '@/components/pages/TagListPageView/TagListPageView';

export default function TagsPage() {
  return (
    <AuthGuard>
      <TagListPageView />
    </AuthGuard>
  );
}