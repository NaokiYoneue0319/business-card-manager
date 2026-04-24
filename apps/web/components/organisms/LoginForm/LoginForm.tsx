'use client';

import { Button } from '@/components/atoms/Button/Button';
import { PasswordInput } from '@/components/atoms/PasswordInput/PasswordInput';
import { TextInput } from '@/components/atoms/TextInput/TextInput';
import { FormField } from '@/components/molecules/FormField/FormField';
import { useLogin } from '@/features/auth/hooks/useLogin';
import styles from './LoginForm.module.css';

export function LoginForm() {
  const {
    loginId,
    password,
    errorMessage,
    isSubmitting,
    setLoginId,
    setPassword,
    handleSubmit,
  } = useLogin();

  return (
    <div className={styles.container}>
      <div className={styles.fields}>
        <FormField label="ログインID">
          <TextInput
            value={loginId}
            placeholder="ログインIDを入力"
            onChange={setLoginId}
          />
        </FormField>

        <FormField label="パスワード">
          <PasswordInput
            value={password}
            placeholder="パスワードを入力"
            onChange={setPassword}
          />
        </FormField>
      </div>

      {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}

      <Button onClick={handleSubmit} disabled={isSubmitting}>
        {isSubmitting ? 'ログイン中...' : 'ログイン'}
      </Button>
    </div>
  );
}