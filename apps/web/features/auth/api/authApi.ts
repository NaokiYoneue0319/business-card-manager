import { apiClient } from '@/lib/apiClient';
import type { LoginRequest, LoginResponse } from '../types/authTypes';

export async function loginApi(payload: LoginRequest) {
  return apiClient<LoginResponse>('/auth/login', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}