import { Todo } from '@/stores/TodoStore';
import { BaseComponent, TodoStatus } from '@/types';
import React from 'react';
import styles from './TodoItem.module.scss';
import { useTranslations } from 'next-intl';
import Dropdown, { DropdownItem } from '@/components/lib/dropdown/Dropdown';
import { todoStatus } from '@/utils/constants';

interface TodoItemProps extends Todo, BaseComponent {
  setStatus: (id: string, status: TodoStatus) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  id,
  title,
  status,
  setStatus,
  className,
}) => {
  const t = useTranslations('Todo');

  const items = todoStatus.map((status) => ({
    id: status,
    value: status,
    displayValue: t(`status.${status}`),
  })) as DropdownItem[];

  function onDropdownChange(item: DropdownItem): void {
    if (id) {
      setStatus(id, item.value as TodoStatus);
    }
  }

  return (
    <div className={[styles.container, className].join(' ')}>
      <div className={styles.titleContainer}>
        <div>{id}</div>
        <div className={styles.title}>{title}</div>
      </div>
      <Dropdown
        className={styles.dropdown}
        value={items.find((item) => item.value === status)}
        items={items}
        onDropdownChange={onDropdownChange}
      />
    </div>
  );
};

export default TodoItem;
