'use client';

import { useRouter } from 'next/navigation';
import { ROUTES } from '@/constants/routes';
import { removeAccessToken, getAccessToken } from '@/features/auth/utils/authStorage';
import { getRoleFromToken } from '@/features/auth/utils/authToken';
import styles from './SideMenu.module.css';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export function SideMenu({ isOpen, onClose }: Props) {
  const router = useRouter();
  const role = getRoleFromToken(getAccessToken());
  const isAdmin = role === 'ADMIN';

  if (!isOpen) return null;

  function move(path: string) {
    onClose();
    router.push(path);
  }

  function logout() {
    removeAccessToken();
    onClose();
    router.push(ROUTES.LOGIN);
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <nav className={styles.menu} onClick={(event) => event.stopPropagation()}>
        <div className={styles.header}>
          <p className={styles.title}>メニュー</p>
          <button type="button" className={styles.closeButton} onClick={onClose}>
            ×
          </button>
        </div>

        <button type="button" className={styles.menuItem} onClick={() => move(ROUTES.CARDS)}>
          名刺一覧
        </button>

        <button type="button" className={styles.menuItem} onClick={() => move(ROUTES.STORES)}>
          店舗管理
        </button>

        <button type="button" className={styles.menuItem} onClick={() => move(ROUTES.TAGS)}>
          タグ管理
        </button>

        {isAdmin ? (
          <button type="button" className={styles.menuItem} onClick={() => move(ROUTES.USERS)}>
            ユーザー管理
          </button>
        ) : null}

        <button type="button" className={`${styles.menuItem} ${styles.logout}`} onClick={logout}>
          ログアウト
        </button>
      </nav>
    </div>
  );
}