import styles from './AuthPageLayout.module.css';
import { Caveat } from 'next/font/google';

type Props = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
};

const caveat = Caveat({
  subsets: ['latin'],
  weight: ['700'],
});

export function AuthPageLayout({ title, children }: Props) {
  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <div className={styles.header}>
          <h1 className={`${styles.title} ${caveat.className}`}>
            {title}
          </h1>
        </div>

        {children}
      </section>
    </main>
  );
}