'use client';
import styles from './page.module.css';
import { useTranslations } from 'next-intl';

export default function Home() {
  const t = useTranslations('Index');

  return (
    <main className={styles.main}>
      <h1>{t('title')}</h1>;
    </main>
  );
}
