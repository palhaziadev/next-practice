import { Todo } from '@/stores/TodoStore';
import { BaseComponent, TodoStatus } from '@/types';
import React from 'react';
import styles from './TodoItem.module.scss';
import { todoStatus } from '@/utils/constants';
import { useTranslations } from 'next-intl';

interface TodoItemProps extends Todo, BaseComponent {
  setStatus: (id: number, status: TodoStatus) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  id,
  title,
  status,
  setStatus,
  className,
}) => {
  const t = useTranslations('Todo');
  return (
    <div className={[styles.container, className].join(' ')}>
      <div>
        <div>{id}</div>
        <div>{title}</div>
      </div>
      <select
        value={status}
        onChange={(e) => setStatus(id, e.target.value as TodoStatus)}
      >
        {todoStatus.map((status) => {
          return (
            <option key={status} value={status}>
              {t(`status.${status}`)}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default TodoItem;
