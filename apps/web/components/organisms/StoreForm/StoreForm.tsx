'use client';

import { Button } from '@/components/atoms/Button/Button';
import { TextInput } from '@/components/atoms/TextInput/TextInput';
import { FormField } from '@/components/molecules/FormField/FormField';
import type { StoreFormValues } from '@/features/stores/hooks/useStoreForm';
import styles from './StoreForm.module.css';

type Props = {
  values: StoreFormValues;
  isSubmitting: boolean;
  errorMessage: string;
  submitLabel: string;
  onChange: <K extends keyof StoreFormValues>(
    key: K,
    value: StoreFormValues[K],
  ) => void;
  onSubmit: () => void;
  onCancel: () => void;
};

export function StoreForm({
  values,
  isSubmitting,
  errorMessage,
  submitLabel,
  onChange,
  onSubmit,
  onCancel,
}: Props) {
  return (
    <div className={styles.form}>
      <FormField label="店舗名">
        <TextInput
          value={values.storeName}
          placeholder="店舗名を入力"
          onChange={(value) => onChange('storeName', value)}
        />
      </FormField>

      <FormField label="都道府県">
        <TextInput
          value={values.prefecture}
          placeholder="大阪府"
          onChange={(value) => onChange('prefecture', value)}
        />
      </FormField>

      <FormField label="地域">
        <TextInput
          value={values.area}
          placeholder="大阪市北区"
          onChange={(value) => onChange('area', value)}
        />
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