'use client';
import React, { useRef, useState } from 'react';
import styles from './Dropdown.module.scss';
import cn from 'classnames';
import Icon from '../icon/Icon';
import { useTranslations } from 'next-intl';
import useOnClickOutside from '@/lib/hooks/ClickOutside';
import { BaseComponent } from '@/types';

export type DropdownItem = {
  id: number | string;
  value: string;
  displayValue: string;
};

interface DropdownProps extends BaseComponent {
  value: DropdownItem | undefined;
  items: Array<DropdownItem>;
  onDropdownChange?: (value: DropdownItem) => void;
  itemRenderer?: (item: DropdownItem) => React.ReactElement;
}

// TODO add possibility to select 'No item selected' (clear the dropdown value)
// TODO use item rendered for selected value?
const Dropdown: React.FC<DropdownProps> = ({
  className,
  items,
  value,
  onDropdownChange,
  itemRenderer,
}) => {
  const t = useTranslations('Dropdown');
  const ref = useRef<HTMLDivElement>(null);
  const [closed, setClosed] = useState(true);

  const toggleDropdown = () => {
    setClosed((currentValue) => !currentValue);
  };

  useOnClickOutside(ref, () => setClosed(true));

  function defaultItemRenderer(item: DropdownItem) {
    return (
      <div
        className={styles.item}
        key={item.id}
        onClick={() => onDropdownChange?.(item)}
      >
        {item.displayValue}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={cn(styles.container, className)}
      onClick={() => toggleDropdown()}
    >
      <div className={styles.selectedItem}>
        <span>{value?.displayValue ?? t('noItem')}</span>
        {closed ? (
          <Icon name="ChevronDownIcon" />
        ) : (
          <Icon name="ChevronUpIcon" />
        )}
      </div>
      <div
        className={cn(styles.itemContainer, {
          [styles['itemContainer--closed']]: closed,
        })}
      >
        {items.map((item) => {
          return itemRenderer ? itemRenderer(item) : defaultItemRenderer(item);
        })}
      </div>
    </div>
  );
};

export default Dropdown;
