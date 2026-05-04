export type UserRole = 'ADMIN' | 'GENERAL';

type JwtPayload = {
  sub?: string;
  loginId?: string;
  role?: UserRole;
  exp?: number;
};

export function decodeToken(token: string | null): JwtPayload | null {
  if (!token) return null;

  try {
    const payloadBase64 = token.split('.')[1];
    const payloadJson = atob(payloadBase64);
    return JSON.parse(payloadJson) as JwtPayload;
  } catch {
    return null;
  }
}

export function getRoleFromToken(token: string | null): UserRole | null {
  return decodeToken(token)?.role ?? null;
}

export function isTokenExpired(token: string | null) {
  const payload = decodeToken(token);

  if (!payload?.exp) return true;

  return payload.exp * 1000 < Date.now();
}