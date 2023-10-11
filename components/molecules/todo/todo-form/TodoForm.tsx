'use client';
import Button from '@/components/atoms/button/Button';
import InputField from '@/components/atoms/input-field/InputField';
import { Todo } from '@/stores/TodoStore';
import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import styles from './TodoForm.module.scss';
import { useTranslations } from 'next-intl';
import Dropdown, { DropdownItem } from '@/components/atoms/dropdown/Dropdown';
import { TodoStatus } from '@/utils/constants';

type TodoFormProps = {
  todo?: Todo;
  onSubmit: (formData: Todo) => void;
};

const TodoForm: React.FC<TodoFormProps> = observer(({ todo, onSubmit }) => {
  const t = useTranslations('Todo');
  const [newTodo, setNewTodo] = useState<Todo>(
    todo
      ? todo
      : {
          title: '',
          description: '',
          status: TodoStatus.Created,
          createdBy: '',
          createdDate: new Date().toString(),
          owner: '',
          orderNumber: 0,
        }
  );

  // TODO create TodoStatus dropdown?
  const items = Object.keys(TodoStatus).map((status) => ({
    id: status,
    value: status,
    displayValue: t(`status.${status}`),
  })) as DropdownItem[];

  function onDropdownChange(item: DropdownItem): void {
    setNewTodo({ ...newTodo, status: item.value as TodoStatus });
  }

  return (
    <div className={styles.container}>
      <div className={styles.column}>
        <InputField
          onChange={(value) => setNewTodo({ ...newTodo, title: value })}
          value={newTodo.title}
        />
        <textarea
          className={styles.textarea}
          onChange={(e) =>
            setNewTodo({ ...newTodo, description: e.target.value })
          }
          rows={8}
          value={newTodo.description}
        />
      </div>
      <div className={styles.column}>
        <Dropdown
          className={styles.dropdown}
          value={items.find((item) => item.value === newTodo.status)}
          items={items}
          onDropdownChange={onDropdownChange}
        />
        <Button text={t('submit')} onClick={() => onSubmit(newTodo)}></Button>
      </div>
    </div>
  );
});

export default TodoForm;
