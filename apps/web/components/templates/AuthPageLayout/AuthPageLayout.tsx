import styles from './AuthPageLayout.module.css';

type Props = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
};

export function AuthPageLayout({ title, children }: Props) {
  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <div className={styles.header}>
          <h1 className={styles.title}>{title}</h1>
        </div>

        {children}
      </section>
    </main>
  );
}