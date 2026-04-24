import { LoginForm } from '@/components/organisms/LoginForm/LoginForm';
import { AuthPageLayout } from '@/components/templates/AuthPageLayout/AuthPageLayout';
import { TEXTS } from '../../../constants/texts';

export function LoginPageView() {
  return (
    <AuthPageLayout
      title={TEXTS.SYSTEMNAME}
    >
      <LoginForm />
    </AuthPageLayout>
  );
}