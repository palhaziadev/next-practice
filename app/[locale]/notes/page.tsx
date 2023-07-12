import Link from 'next/link';

export default function Notes() {
  return (
    <div>
      <Link href="/">To Main</Link>
      <Link href="/todo">To Todo</Link>
    </div>
  );
}
