import './globals.scss';
import { Inter } from 'next/font/google';
import { NextIntlClientProvider, useLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { RootStoreProvider } from '@/stores';
import { fetchInitialStoreState } from '@/stores/mockInitState';
import ClientProviders from '@/providers/ClientProviders';
import AppHeader from '@/components/header/AppHeader';
import styles from './layout.module.scss';

const inter = Inter({ subsets: ['latin'] });

// export const metadata = {
//   title: 'Create Next App',
//   description: 'Generated by create next app',
// };

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const locale = useLocale();
  const initialStoreState = await fetchInitialStoreState();

  // Show a 404 error if the user requests an unknown locale
  if (params.locale !== locale) {
    notFound();
  }

  // NextIntlClientProvider and this try catch is need only for client components
  // TODO remove when pages are all server rendered
  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body className={['body', inter.className].join(' ')}>
        <RootStoreProvider hydrationData={initialStoreState}>
          <ClientProviders>
            <NextIntlClientProvider locale={locale} messages={messages}>
              <AppHeader />
              <div className={styles.contentContainer}>{children}</div>
            </NextIntlClientProvider>
          </ClientProviders>
        </RootStoreProvider>
      </body>
    </html>
  );
}
