'use client';

import { useState } from 'react';
import { Button } from '@/components/atoms/Button/Button';
import { TextInput } from '@/components/atoms/TextInput/TextInput';
import { FormField } from '@/components/molecules/FormField/FormField';
import type { SearchCardsParams } from '@/features/cards/types/cardTypes';
import styles from './SearchConditionModal.module.css';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSearch: (params: SearchCardsParams) => void;
};

export function SearchConditionModal({ isOpen, onClose, onSearch }: Props) {
  const [name, setName] = useState('');
  const [storeName, setStoreName] = useState('');
  const [area, setArea] = useState('');
  const [usedByUserName, setUsedByUserName] = useState('');
  const [tagName, setTagName] = useState('');

  if (!isOpen) return null;

  function handleSearch() {
    onSearch({
      name,
      storeName,
      area,
      usedByUserName,
      tagName,
    });
    onClose();
  }

  return (
    <div className={styles.overlay}>
      <section className={styles.modal}>
        <div className={styles.header}>
          <p className={styles.title}>検索条件</p>
          <button type="button" className={styles.closeButton} onClick={onClose}>
            ×
          </button>
        </div>

        <div className={styles.body}>
          <FormField label="氏名">
            <TextInput value={name} placeholder="入力フィールド" onChange={setName} />
          </FormField>

          <FormField label="店舗名">
            <TextInput
              value={storeName}
              placeholder="入力フィールド"
              onChange={setStoreName}
            />
          </FormField>

          <FormField label="地域">
            <TextInput value={area} placeholder="入力フィールド" onChange={setArea} />
          </FormField>

          <FormField label="利用者">
            <TextInput
              value={usedByUserName}
              placeholder="入力フィールド"
              onChange={setUsedByUserName}
            />
          </FormField>

          <FormField label="タグ">
            <TextInput
              value={tagName}
              placeholder="入力フィールド"
              onChange={setTagName}
            />
          </FormField>

          <div className={styles.buttonArea}>
            <Button onClick={handleSearch}>検索</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
