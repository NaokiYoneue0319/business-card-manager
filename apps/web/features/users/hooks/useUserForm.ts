'use client';

import { useEffect, useState } from 'react';
import {
  createUser,
  fetchUserDetail,
  updateUser,
  type UserRole,
} from '../api/usersApi';

export type UserFormValues = {
  loginId: string;
  password: string;
  userName: string;
  role: UserRole;
  isActive: boolean;
};

export function useUserForm(id?: string) {
  const [values, setValues] = useState<UserFormValues>({
    loginId: '',
    password: '',
    userName: '',
    role: 'GENERAL',
    isActive: true,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const isEditMode = Boolean(id);

  function updateValue<K extends keyof UserFormValues>(
    key: K,
    value: UserFormValues[K],
  ) {
    setValues((current) => ({
      ...current,
      [key]: value,
    }));
  }

  async function load() {
    if (!id) return;

    try {
      setIsLoading(true);
      setErrorMessage('');

      const user = await fetchUserDetail(id);

      setValues({
        loginId: user.loginId,
        password: '',
        userName: user.userName,
        role: user.role,
        isActive: user.isActive,
      });
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'ユーザー情報の取得に失敗しました',
      );
    } finally {
      setIsLoading(false);
    }
  }

  async function submit() {
    if (!values.loginId.trim()) {
      setErrorMessage('ログインIDを入力してください');
      return;
    }

    if (!isEditMode && !values.password.trim()) {
      setErrorMessage('パスワードを入力してください');
      return;
    }

    if (!values.userName.trim()) {
      setErrorMessage('ユーザー名を入力してください');
      return;
    }

    try {
      setIsSubmitting(true);
      setErrorMessage('');

      if (isEditMode && id) {
        await updateUser(id, {
          password: values.password.trim() || undefined,
          userName: values.userName,
          role: values.role,
          isActive: values.isActive,
        });
      } else {
        await createUser({
          loginId: values.loginId,
          password: values.password,
          userName: values.userName,
          role: values.role,
          isActive: values.isActive,
        });
      }
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'ユーザー情報の保存に失敗しました',
      );
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  }

  useEffect(() => {
    load();
  }, [id]);

  return {
    values,
    isEditMode,
    isLoading,
    isSubmitting,
    errorMessage,
    updateValue,
    submit,
  };
}