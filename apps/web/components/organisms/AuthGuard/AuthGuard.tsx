'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ROUTES } from '@/constants/routes';
import { getAccessToken, removeAccessToken } from '@/features/auth/utils/authStorage';
import { getRoleFromToken, isTokenExpired, type UserRole } from '@/features/auth/utils/authToken';

type Props = {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
};

export function AuthGuard({ children, allowedRoles }: Props) {
  const router = useRouter();
  const [canShow, setCanShow] = useState(false);

  useEffect(() => {
    const token = getAccessToken();

    if (!token || isTokenExpired(token)) {
      removeAccessToken();
      router.replace(ROUTES.LOGIN);
      return;
    }

    const role = getRoleFromToken(token);

    if (allowedRoles && (!role || !allowedRoles.includes(role))) {
      router.replace(ROUTES.CARDS);
      return;
    }

    setCanShow(true);
  }, [allowedRoles, router]);

  if (!canShow) {
    return null;
  }

  return <>{children}</>;
}