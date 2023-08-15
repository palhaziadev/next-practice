'use client';
import { useTodoStore } from '@/stores';
import { observer } from 'mobx-react-lite';
import React from 'react';
import TodoItem from '../todo-item/TodoItem';
import styles from './TodoList.module.scss';

const TodoList = observer(() => {
  const todoStore = useTodoStore();
  const todoItems = todoStore.todoItems;

  return (
    <div className={styles.container}>
      {todoItems.map((item) => {
        return (
          <TodoItem
            className={styles.item}
            key={item.id}
            {...item}
            setStatus={todoStore.setStatus}
          />
        );
      })}
    </div>
  );
});

export default TodoList;
