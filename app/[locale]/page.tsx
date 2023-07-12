'use client';
import Button from '@/components/lib/button/Button';
import styles from './page.module.css';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function Home() {
  const t = useTranslations('Index');

  const btnClick = () => {
    console.log('clicked');
  };

  return (
    <main className={styles.main}>
      <Link href="/todo">To Todo</Link>
      <Link href="/notes">To Notes</Link>
      <Button text={'Button'} onClick={() => btnClick()} />
      <h1>{t('title')}</h1>;
    </main>
  );
}
