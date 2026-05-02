'use client';

import { Button } from '@/components/atoms/Button/Button';
import { TextInput } from '@/components/atoms/TextInput/TextInput';
import { FormField } from '@/components/molecules/FormField/FormField';
import type {
  CardFormValues,
} from '@/features/cards/hooks/useCardForm';
import type { StoreOption } from '@/features/stores/api/storesApi';
import type { TagOption } from '@/features/tags/api/tagsApi';
import type { UserOption } from '@/features/users/api/usersApi';
import styles from './BusinessCardForm.module.css';

type Props = {
  values: CardFormValues;
  stores: StoreOption[];
  tags: TagOption[];
  users: UserOption[];
  isSubmitting: boolean;
  errorMessage: string;
  submitLabel: string;
  onChange: <K extends keyof CardFormValues>(
    key: K,
    value: CardFormValues[K],
  ) => void;
  onToggleArrayValue: (key: 'usedByUserIds' | 'tagIds', id: string) => void;
  onSubmit: () => void;
  onCancel: () => void;
};

export function BusinessCardForm({
  values,
  stores,
  tags,
  users,
  isSubmitting,
  errorMessage,
  submitLabel,
  onChange,
  onToggleArrayValue,
  onSubmit,
  onCancel,
}: Props) {
  return (
    <div className={styles.form}>
      <FormField label="氏名">
        <TextInput
          value={values.name}
          placeholder="氏名を入力"
          onChange={(value) => onChange('name', value)}
        />
      </FormField>

      <FormField label="店舗">
        <select
          className={styles.input}
          value={values.storeId}
          onChange={(event) => onChange('storeId', event.target.value)}
        >
          <option value="">店舗を選択</option>
          {stores.map((store) => (
            <option key={store.id} value={store.id}>
              {store.storeName}
            </option>
          ))}
        </select>
      </FormField>

      <FormField label="利用日時">
        <input
          className={styles.input}
          type="datetime-local"
          value={values.usedAt}
          onChange={(event) => onChange('usedAt', event.target.value)}
        />
      </FormField>

      <FormField label="名刺画像（表）URL">
        <TextInput
          value={values.frontImageUrl}
          placeholder="/images/front.png"
          onChange={(value) => onChange('frontImageUrl', value)}
        />
      </FormField>

      <FormField label="名刺画像（裏）URL">
        <TextInput
          value={values.backImageUrl}
          placeholder="/images/back.png"
          onChange={(value) => onChange('backImageUrl', value)}
        />
      </FormField>

      <FormField label="商談内容">
        <textarea
          className={styles.textarea}
          value={values.businessDetail}
          onChange={(event) => onChange('businessDetail', event.target.value)}
        />
      </FormField>

      <FormField label="メモ">
        <textarea
          className={styles.textarea}
          value={values.memo}
          onChange={(event) => onChange('memo', event.target.value)}
        />
      </FormField>

      <FormField label="利用者">
        <div className={styles.checkList}>
          {users.map((user) => (
            <label key={user.id} className={styles.checkItem}>
              <input
                type="checkbox"
                checked={values.usedByUserIds.includes(user.id)}
                onChange={() => onToggleArrayValue('usedByUserIds', user.id)}
              />
              <span>{user.userName}</span>
            </label>
          ))}
        </div>
      </FormField>

      <FormField label="タグ">
        <div className={styles.checkList}>
          {tags.map((tag) => (
            <label key={tag.id} className={styles.checkItem}>
              <input
                type="checkbox"
                checked={values.tagIds.includes(tag.id)}
                onChange={() => onToggleArrayValue('tagIds', tag.id)}
              />
              <span>{tag.tagName}</span>
            </label>
          ))}
        </div>
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