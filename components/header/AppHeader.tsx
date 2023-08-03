import { isServer } from '@/utils';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import React from 'react';

//TODO use in page layout
const AppHeader = () => {
  console.log('hello from appHeader component ', isServer);
  const t = useTranslations('Header');
  return (
    <div>
      <Link href="/">{t('main')}</Link>
      <Link href="/notes">{t('notes')}</Link>
    </div>
  );
};

export default AppHeader;
