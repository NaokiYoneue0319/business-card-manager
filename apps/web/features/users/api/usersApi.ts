import { apiClient } from '@/lib/apiClient';
import { getAccessToken } from '@/features/auth/utils/authStorage';

export type UserRole = 'ADMIN' | 'GENERAL';

export type UserOption = {
  id: string;
  loginId: string;
  userName: string;
  role: UserRole;
  isActive: boolean;
};

export type CreateUserPayload = {
  loginId: string;
  password: string;
  userName: string;
  role: UserRole;
  isActive: boolean;
};

export type UpdateUserPayload = {
  password?: string;
  userName: string;
  role: UserRole;
  isActive: boolean;
};

export async function fetchUsers() {
  const token = getAccessToken();

  return apiClient<UserOption[]>('/users', {
    method: 'GET',
    token: token ?? undefined,
  });
}

export async function fetchActiveUsers() {
  const token = getAccessToken();

  return apiClient<UserOption[]>('/users?isActive=true', {
    method: 'GET',
    token: token ?? undefined,
  });
}

export async function fetchUserDetail(id: string) {
  const token = getAccessToken();

  return apiClient<UserOption>(`/users/${id}`, {
    method: 'GET',
    token: token ?? undefined,
  });
}

export async function createUser(payload: CreateUserPayload) {
  const token = getAccessToken();

  return apiClient('/users', {
    method: 'POST',
    token: token ?? undefined,
    body: JSON.stringify(payload),
  });
}

export async function updateUser(id: string, payload: UpdateUserPayload) {
  const token = getAccessToken();

  return apiClient(`/users/${id}`, {
    method: 'PUT',
    token: token ?? undefined,
    body: JSON.stringify(payload),
  });
}

export async function deleteUser(id: string) {
  const token = getAccessToken();

  return apiClient(`/users/${id}`, {
    method: 'DELETE',
    token: token ?? undefined,
  });
}