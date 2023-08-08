'use client';

import { locales } from '@/utils/constants';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next-intl/client';
import { useTransition } from 'react';
import styles from './LanguageSwitcher.module.scss';
import Dropdown, { DropdownItem } from '@/components/lib/dropdown/Dropdown';

const LocaleSwitcher: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
}) => {
  const t = useTranslations('Locale');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isPending, startTransition] = useTransition();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const items = locales.map((locale) => ({
    id: locale,
    value: locale,
    displayValue: t(`long.${locale}`),
  })) as DropdownItem[];

  function onDropdownChange(item: DropdownItem): void {
    const nextLocale = item.value;
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  }

  return (
    <div className={className}>
      <Dropdown
        className={styles.dropdown}
        value={items.find((item) => item.value === locale)}
        items={items}
        onDropdownChange={onDropdownChange}
      />
    </div>
  );
};

export default LocaleSwitcher;
