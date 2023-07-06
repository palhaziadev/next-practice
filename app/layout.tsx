import './globals.scss';
import { Inter } from 'next/font/google';
import { isServer } from '@/utils';
import { RootStoreProvider } from '@/stores';
import { fetchInitialStoreState } from '@/stores/mockInitState';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const initialStoreState = await fetchInitialStoreState();
  console.log('aaa root', isServer);
  return (
    <html lang="en">
      <RootStoreProvider hydrationData={initialStoreState}>
        <body className={inter.className}>{children}</body>
      </RootStoreProvider>
    </html>
  );
}
