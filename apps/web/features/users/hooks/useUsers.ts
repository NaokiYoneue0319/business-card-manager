'use client';

import { useEffect, useState } from 'react';
import { deleteUser, fetchUsers, type UserOption } from '../api/usersApi';

export function useUsers() {
  const [users, setUsers] = useState<UserOption[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  async function loadUsers() {
    try {
      setIsLoading(true);
      setErrorMessage('');

      const data = await fetchUsers();
      setUsers(data);
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : 'ユーザー一覧の取得に失敗しました',
      );
    } finally {
      setIsLoading(false);
    }
  }

  async function removeUser(id: string) {
    await deleteUser(id);
    await loadUsers();
  }

  useEffect(() => {
    loadUsers();
  }, []);

  return {
    users,
    isLoading,
    errorMessage,
    removeUser,
  };
}