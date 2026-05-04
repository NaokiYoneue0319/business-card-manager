'use client';

import { Button } from '@/components/atoms/Button/Button';
import { TextInput } from '@/components/atoms/TextInput/TextInput';
import { FormField } from '@/components/molecules/FormField/FormField';
import type { TagFormValues } from '@/features/tags/hooks/useTagForm';
import styles from './TagForm.module.css';

type Props = {
  values: TagFormValues;
  isSubmitting: boolean;
  errorMessage: string;
  submitLabel: string;
  onChange: <K extends keyof TagFormValues>(
    key: K,
    value: TagFormValues[K],
  ) => void;
  onSubmit: () => void;
  onCancel: () => void;
};

export function TagForm({
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
      <FormField label="タグ名">
        <TextInput
          value={values.tagName}
          placeholder="タグ名を入力"
          onChange={(value) => onChange('tagName', value)}
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