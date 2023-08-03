'use client';
import Button from '@/components/lib/button/Button';
import InputField from '@/components/lib/inputField/InputField';
import { useTodoStore } from '@/stores';
import { Todo } from '@/stores/TodoStore';
import { TodoStatus } from '@/types';
import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import styles from './NewTodo.module.scss';
import { useTranslations } from 'next-intl';

const NewTodo = observer(() => {
  const t = useTranslations('Todo');
  const todoStore = useTodoStore();
  const [newTodo, setNewTodo] = useState<Todo>({
    id: 0,
    title: '',
    description: '',
    status: TodoStatus.Created,
    createdBy: '',
    createdDate: new Date().toString(),
    owner: '',
    orderNumber: 0,
  });

  return (
    <div className={styles.container}>
      <InputField
        onChange={(value) => setNewTodo({ ...newTodo, title: value })}
        value={newTodo.title}
      />
      <Button
        text={t('addTodo')}
        onClick={() =>
          todoStore.addTodo({
            ...newTodo,
            id: todoStore.nextId,
          })
        }
      ></Button>
    </div>
  );
});

export default NewTodo;
