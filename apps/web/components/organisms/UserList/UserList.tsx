import type { UserOption } from '@/features/users/api/usersApi';
import { UserListItem } from '../UserListItem/UserListItem';
import styles from './UserList.module.css';

type Props = {
  users: UserOption[];
  onDeleteClick: (user: UserOption) => void;
};

export function UserList({ users, onDeleteClick }: Props) {
  return (
    <div className={styles.list}>
      {users.map((user) => (
        <UserListItem key={user.id} user={user} onDeleteClick={onDeleteClick} />
      ))}
    </div>
  );
}