import { locales } from '@/utils/constants';
import { render } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { ReactNode } from 'react';

export async function renderWithIntl(
  children: ReactNode,
  locale: (typeof locales)[number] = 'en'
) {
  const messages = (await import(`../messages/${locale}.json`)).default;
  return render(
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
