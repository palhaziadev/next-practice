import { isServer } from '@/utils';
import Link from 'next/link';

export default function Notes() {
  console.log('hello from Notes component ', isServer);
  return (
    <div>
      <Link href="/">To Main</Link>
      <Link href="/todo">To Todo</Link>
    </div>
  );
}
