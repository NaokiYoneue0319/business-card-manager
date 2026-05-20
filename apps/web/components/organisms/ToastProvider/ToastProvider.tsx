'use client';

import {
  createContext,
  useContext,
  useMemo,
  useState,
} from 'react';
import { Toast, type ToastType } from '@/components/atoms/Toast/Toast';
import styles from './ToastProvider.module.css';

type ToastItem = {
  id: number;
  message: string;
  type: ToastType;
};

type ToastContextValue = {
  showToast: (message: string, type?: ToastType) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const value = useMemo<ToastContextValue>(
    () => ({
      showToast: (message, type = 'info') => {
        const id = Date.now();

        setToasts((current) => [
          ...current,
          {
            id,
            message,
            type,
          },
        ]);

        setTimeout(() => {
          setToasts((current) => current.filter((toast) => toast.id !== id));
        }, 2500);
      },
    }),
    [],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}

      <div className={styles.container}>
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must be used within ToastProvider');
  }

  return context;
}