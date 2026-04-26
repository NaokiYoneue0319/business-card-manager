import styles from './MobileListPageLayout.module.css';

type Props = {
  children: React.ReactNode;
};

export function MobileListPageLayout({ children }: Props) {
  return <main className={styles.page}>{children}</main>;
}
