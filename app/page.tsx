import styles from './page.module.css';
import { isServer } from '@/utils';
import Link from 'next/link';

export default function Home() {
  console.log('hello from Page component ', isServer);
  return (
    <main className={styles.main}>
      <Link href="/todo">To Todo</Link>
      <Link href="/notes">To Notes</Link>
    </main>
  );
}
