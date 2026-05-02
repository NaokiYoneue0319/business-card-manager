import { apiClient } from '@/lib/apiClient';
import { getAccessToken } from '@/features/auth/utils/authStorage';

export type UserOption = {
  id: string;
  loginId: string;
  userName: string;
  role: 'ADMIN' | 'GENERAL';
  isActive: boolean;
};

export async function fetchUsers() {
  const token = getAccessToken();

  return apiClient<UserOption[]>('/users?isActive=true', {
    method: 'GET',
    token: token ?? undefined,
  });
}