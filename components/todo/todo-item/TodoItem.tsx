import { Todo } from '@/stores/TodoStore';
import { BaseComponent } from '@/types';
import React, { memo } from 'react';
import styles from './TodoItem.module.scss';
import { useTranslations } from 'next-intl';
import Dropdown, { DropdownItem } from '@/components/lib/dropdown/Dropdown';
import Icon from '@/components/lib/icon/Icon';
import { TodoStatus } from '@/utils/constants';

interface TodoItemProps extends BaseComponent {
  todo: Todo;
  updateTodo?: (id: string, todoProps: Partial<Todo>) => void;
  openTodo?: (todo: Todo) => void;
  deleteTodo?: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  updateTodo,
  openTodo,
  deleteTodo,
  className,
}) => {
  const t = useTranslations('Todo');

  // TODO create TodoStatus dropdown?
  const items = Object.keys(TodoStatus).map((status) => ({
    id: status,
    value: status,
    displayValue: t(`status.${status}`),
  })) as DropdownItem[];

  function onDropdownChange(item: DropdownItem): void {
    if (todo.id) {
      updateTodo?.(todo.id, { status: item.value as TodoStatus });
    }
  }

  return (
    <div className={[styles.container, className].join(' ')}>
      <div onClick={() => openTodo?.(todo)} className={styles.titleContainer}>
        <div className={styles.title}>{todo.title}</div>
      </div>
      <Dropdown
        className={styles.dropdown}
        value={items.find((item) => item.value === todo.status)}
        items={items}
        onDropdownChange={onDropdownChange}
      />
      <Icon name="TrashIcon" onClick={() => todo.id && deleteTodo?.(todo.id)} />
    </div>
  );
};

function propsAreEqual(prevMovie: TodoItemProps, nextMovie: TodoItemProps) {
  return (
    prevMovie.className === nextMovie.className &&
    prevMovie.todo === nextMovie.todo
  );
}

export default memo(TodoItem, propsAreEqual);
