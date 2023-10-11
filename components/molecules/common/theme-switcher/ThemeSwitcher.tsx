'use client';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { useTranslations } from 'next-intl';
import { themes } from '@/utils/constants';
import Dropdown, { DropdownItem } from '@/components/atoms/dropdown/Dropdown';

const ThemeSwitcher: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
}) => {
  const t = useTranslations('Theme');
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const items = themes.map((theme) => ({
    id: theme,
    value: theme,
    displayValue: t(theme),
  })) as DropdownItem[];

  function onDropdownChange(item: DropdownItem): void {
    setTheme(item.value);
  }

  return (
    <div className={className}>
      <Dropdown
        value={items.find((item) => item.value === theme)}
        items={items}
        onDropdownChange={onDropdownChange}
      />
    </div>
  );
};

export default ThemeSwitcher;
