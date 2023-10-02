'use client';

import { locales } from '@/utils/constants';
import { usePathname } from 'next-intl/client';
import { useLocale, useTranslations } from 'next-intl';
import styles from './LanguageSwitcher.module.scss';
import Dropdown, { DropdownItem } from '@/components/lib/dropdown/Dropdown';
import Link from 'next-intl/link';

const LocaleSwitcher: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
}) => {
  const t = useTranslations('Locale');
  const locale = useLocale();
  const pathname = usePathname();

  const items = locales.map((locale) => ({
    id: locale,
    value: locale,
    displayValue: t(`long.${locale}`),
  })) as DropdownItem[];

  function itemRenderer(item: DropdownItem): React.ReactElement {
    return (
      <div key={item.id} className={styles.itemContainer}>
        <Link href={pathname} locale={item.value}>
          {item.displayValue}
        </Link>
      </div>
    );
  }

  return (
    <div className={className}>
      <Dropdown
        className={styles.dropdown}
        value={items.find((item) => item.value === locale)}
        items={items}
        itemRenderer={itemRenderer}
      />
    </div>
  );
};

export default LocaleSwitcher;
