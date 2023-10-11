import { isServer } from '@/utils';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import React from 'react';
import ThemeSwitcher from '../../molecules/common/theme-switcher/ThemeSwitcher';
import LanguageSwitcher from '../../molecules/common/language-switcher/LanguageSwitcher';
import styles from './AppHeader.module.scss';

const AppHeader = () => {
  console.log('hello from appHeader component ', isServer);
  const t = useTranslations('Header');
  return (
    <div className={styles.container}>
      <div className={styles.itemContainer}>
        <Link className={styles.item} href="/">
          {t('index')}
        </Link>
        <Link className={styles.item} href="/notes">
          {t('notes')}
        </Link>
        <Link className={styles.item} href="/todo">
          {t('todo')}
        </Link>
      </div>
      <div className={styles.itemContainer}>
        <ThemeSwitcher className={styles.item} />
        <LanguageSwitcher className={styles.item} />
      </div>
    </div>
  );
};

export default AppHeader;
