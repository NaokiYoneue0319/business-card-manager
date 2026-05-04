type JwtPayload = {
  role?: 'ADMIN' | 'GENERAL';
};

export function getRoleFromToken(token: string | null): 'ADMIN' | 'GENERAL' | null {
  if (!token) return null;

  try {
    const payloadBase64 = token.split('.')[1];
    const payloadJson = atob(payloadBase64);
    const payload = JSON.parse(payloadJson) as JwtPayload;

    return payload.role ?? null;
  } catch {
    return null;
  }
}