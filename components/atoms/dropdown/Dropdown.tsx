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

// TODO fix selected item eventhandler when custom renderer is given
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

  const toggleDropdown = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setClosed((currentValue) => !currentValue);
  };

  useOnClickOutside(ref, () => setClosed(true));

  // TODO add default color and hover to every item in dropdown

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

  function renderSelected(item: DropdownItem) {
    return itemRenderer ? itemRenderer(item) : defaultItemRenderer(item);
  }

  return (
    <div
      ref={ref}
      className={cn(styles.container, className)}
      onClick={(e) => toggleDropdown(e)}
    >
      <div className={styles.selectedItem}>
        {value ? renderSelected(value) : t('noItem')}
        {closed ? (
          <Icon name="ChevronDownIcon" />
        ) : (
          <Icon name="ChevronUpIcon" />
        )}
      </div>
      {!closed ? (
        <div className={cn(styles.itemContainer)}>
          {items.map((item) => {
            return itemRenderer
              ? itemRenderer(item)
              : defaultItemRenderer(item);
          })}
        </div>
      ) : null}
    </div>
  );
};

export default Dropdown;
