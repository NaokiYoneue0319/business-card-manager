'use client';

import { Button } from '@/components/atoms/Button/Button';
import { PasswordInput } from '@/components/atoms/PasswordInput/PasswordInput';
import { TextInput } from '@/components/atoms/TextInput/TextInput';
import { FormField } from '@/components/molecules/FormField/FormField';
import type { UserFormValues } from '@/features/users/hooks/useUserForm';
import styles from './UserForm.module.css';

type Props = {
  values: UserFormValues;
  isEditMode: boolean;
  isSubmitting: boolean;
  errorMessage: string;
  submitLabel: string;
  onChange: <K extends keyof UserFormValues>(
    key: K,
    value: UserFormValues[K],
  ) => void;
  onSubmit: () => void;
  onCancel: () => void;
};

export function UserForm({
  values,
  isEditMode,
  isSubmitting,
  errorMessage,
  submitLabel,
  onChange,
  onSubmit,
  onCancel,
}: Props) {
  return (
    <div className={styles.form}>
      <FormField label="ユーザー名">
        <TextInput
          value={values.userName}
          placeholder="ユーザー名を入力"
          onChange={(value) => onChange('userName', value)}
        />
      </FormField>

      <FormField label="ログインID">
        <TextInput
          value={values.loginId}
          placeholder="ログインIDを入力"
          onChange={(value) => onChange('loginId', value)}
        />
        {isEditMode ? (
          <p className={styles.helper}>編集時、ログインIDは変更しない想定です</p>
        ) : null}
      </FormField>

      <FormField label={isEditMode ? 'パスワード（変更時のみ入力）' : 'パスワード'}>
        <PasswordInput
          value={values.password}
          placeholder={isEditMode ? '空なら変更なし' : 'パスワードを入力'}
          onChange={(value) => onChange('password', value)}
        />
      </FormField>

      <FormField label="権限">
        <select
          className={styles.input}
          value={values.role}
          onChange={(event) =>
            onChange('role', event.target.value as UserFormValues['role'])
          }
        >
          <option value="GENERAL">GENERAL</option>
          <option value="ADMIN">ADMIN</option>
        </select>
      </FormField>

      <FormField label="有効状態">
        <label className={styles.switchRow}>
          <input
            type="checkbox"
            checked={values.isActive}
            onChange={(event) => onChange('isActive', event.target.checked)}
          />
          <span>{values.isActive ? '有効' : '無効'}</span>
        </label>
      </FormField>

      {errorMessage ? <p className={styles.error}>{errorMessage}</p> : null}

      <div className={styles.actions}>
        <Button onClick={onSubmit} disabled={isSubmitting}>
          {isSubmitting ? '保存中...' : submitLabel}
        </Button>
        <Button onClick={onCancel}>キャンセル</Button>
      </div>
    </div>
  );
}