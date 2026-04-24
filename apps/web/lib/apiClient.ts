import { API_BASE_URL } from './env';

type RequestOptions = RequestInit & {
  token?: string;
};

export async function apiClient<T>(
  path: string,
  options: RequestOptions = {},
): Promise<T> {
  const { token, headers, ...rest } = options;

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...rest,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
  });

  const contentType = response.headers.get('content-type');

  if (!response.ok) {
    let message = 'APIエラーが発生しました';

    if (contentType?.includes('application/json')) {
      const errorBody = await response.json();
      message = errorBody?.message ?? message;
    }

    throw new Error(message);
  }

  if (contentType?.includes('application/json')) {
    return response.json();
  }

  return {} as T;
}