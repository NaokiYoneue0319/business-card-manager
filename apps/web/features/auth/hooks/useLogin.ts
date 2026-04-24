'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ROUTES } from '@/constants/routes';
import { loginApi } from '../api/authApi';
import { saveAccessToken } from '../utils/authStorage';

export function useLogin() {
  const router = useRouter();

  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit() {
    if (!loginId.trim() || !password.trim()) {
      setErrorMessage('ログインIDとパスワードを入力してください');
      return;
    }

    try {
      setIsSubmitting(true);
      setErrorMessage('');

      const response = await loginApi({ loginId, password });

      saveAccessToken(response.accessToken);
      router.push(ROUTES.CARDS);
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : 'ログインに失敗しました',
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return {
    loginId,
    password,
    errorMessage,
    isSubmitting,
    setLoginId,
    setPassword,
    handleSubmit,
  };
}