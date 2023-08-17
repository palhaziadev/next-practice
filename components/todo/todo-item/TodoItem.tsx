import { Todo } from '@/stores/TodoStore';
import { BaseComponent, TodoStatus } from '@/types';
import React from 'react';
import styles from './TodoItem.module.scss';
import { useTranslations } from 'next-intl';
import Dropdown, { DropdownItem } from '@/components/lib/dropdown/Dropdown';
import { todoStatus } from '@/utils/constants';
import Icon from '@/components/lib/icon/Icon';

interface TodoItemProps extends Todo, BaseComponent {
  updateTodo: (id: string, todoProps: Partial<Todo>) => void;
  openTodo: () => void;
  deleteTodo: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  id,
  title,
  status,
  updateTodo,
  openTodo,
  deleteTodo,
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
      updateTodo(id, { status: item.value as TodoStatus });
    }
  }

  return (
    <div className={[styles.container, className].join(' ')}>
      <div onClick={() => openTodo()} className={styles.titleContainer}>
        {/* <div>{id}</div> */}
        <div className={styles.title}>{title}</div>
      </div>
      <Dropdown
        className={styles.dropdown}
        value={items.find((item) => item.value === status)}
        items={items}
        onDropdownChange={onDropdownChange}
      />
      <Icon name="TrashIcon" onClick={() => id && deleteTodo(id)} />
    </div>
  );
};

export default TodoItem;
