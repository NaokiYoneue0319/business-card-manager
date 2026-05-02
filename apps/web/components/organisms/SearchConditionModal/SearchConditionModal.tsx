'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/atoms/Button/Button';
import { TextInput } from '@/components/atoms/TextInput/TextInput';
import { FormField } from '@/components/molecules/FormField/FormField';
import { fetchStores } from '@/features/stores/api/storesApi';
import { fetchTags } from '@/features/tags/api/tagsApi';
import { fetchUsers } from '@/features/users/api/usersApi';
import type { StoreOption } from '@/features/stores/api/storesApi';
import type { TagOption } from '@/features/tags/api/tagsApi';
import type { UserOption } from '@/features/users/api/usersApi';
import type { SearchCardsParams } from '@/features/cards/types/cardTypes';
import styles from './SearchConditionModal.module.css';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSearch: (params: SearchCardsParams) => void;
};

export function SearchConditionModal({ isOpen, onClose, onSearch }: Props) {
  const [name, setName] = useState('');
  const [storeId, setStoreId] = useState('');
  const [userId, setUserId] = useState('');
  const [area, setArea] = useState('');
  const [tagId, setTagId] = useState('');

  const [stores, setStores] = useState<StoreOption[]>([]);
  const [users, setUsers] = useState<UserOption[]>([]);
  const [tags, setTags] = useState<TagOption[]>([]);

  useEffect(() => {
    if (!isOpen) return;

    async function loadOptions() {
      const [storeList, userList, tagList] = await Promise.all([
        fetchStores(),
        fetchUsers(),
        fetchTags(),
      ]);

      setStores(storeList);
      setUsers(userList);
      setTags(tagList);
    }

    loadOptions();
  }, [isOpen]);

  if (!isOpen) return null;

  function handleSearch() {
    const selectedStore = stores.find((store) => store.id === storeId);
    const selectedUser = users.find((user) => user.id === userId);
    const selectedTag = tags.find((tag) => tag.id === tagId);

    onSearch({
      name,
      storeName: selectedStore?.storeName,
      area,
      usedByUserName: selectedUser?.userName,
      tagName: selectedTag?.tagName,
    });

    onClose();
  }

  function handleClear() {
    setName('');
    setStoreId('');
    setArea('');
    setUserId('');
    setTagId('');

    onSearch({});
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
            <TextInput
              value={name}
              placeholder="氏名を入力"
              onChange={setName}
            />
          </FormField>

          <FormField label="店舗">
            <select
              className={styles.select}
              value={storeId}
              onChange={(event) => setStoreId(event.target.value)}
            >
              <option value="">指定なし</option>
              {stores.map((store) => (
                <option key={store.id} value={store.id}>
                  {store.storeName}
                </option>
              ))}
            </select>
          </FormField>

          <FormField label="地域">
            <TextInput
              value={area}
              placeholder="例：大阪"
              onChange={setArea}
            />
          </FormField>

          <FormField label="利用者">
            <select
              className={styles.select}
              value={userId}
              onChange={(event) => setUserId(event.target.value)}
            >
              <option value="">指定なし</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.userName}
                </option>
              ))}
            </select>
          </FormField>

          <FormField label="タグ">
            <div className={styles.chipList}>
              {tags.map((tag) => (
                <button
                  key={tag.id}
                  type="button"
                  className={`${styles.chip} ${
                    tagId === tag.id ? styles.selectedChip : ''
                  }`}
                  onClick={() => setTagId(tagId === tag.id ? '' : tag.id)}
                >
                  {tag.tagName}
                </button>
              ))}
            </div>
          </FormField>

          <div className={styles.buttonArea}>
            <Button onClick={handleSearch}>検索</Button>
            <Button onClick={handleClear}>クリア</Button>
          </div>
        </div>
      </section>
    </div>
  );
}