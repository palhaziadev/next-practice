'use client';
import { useTodoStore } from '@/stores';
import { observer } from 'mobx-react-lite';
import React from 'react';
import TodoItem from '../todo-item/TodoItem';
import styles from './TodoList.module.scss';
import { TodoView } from '@/utils/constants';
import cn from 'classnames';
import { Todo } from '@/stores/TodoStore';
import { TodoStatus } from '@/types';

type GridColumns = {
  [key in TodoStatus]?: Todo[];
};

const TodoList = observer(() => {
  const todoStore = useTodoStore();
  const { view, todos, updateTodo, deleteTodo, gridConfig } = todoStore;

  function openTodo(): void {
    // TODO
    console.log('aaa open todo modal');
  }

  function listRenderer(itemsToRender: Todo[] = []) {
    return itemsToRender.map((item) => {
      return (
        <TodoItem
          className={styles.item}
          key={item.id}
          {...item}
          updateTodo={updateTodo}
          openTodo={() => openTodo()}
          deleteTodo={deleteTodo}
        />
      );
    });
  }

  // TODO empty list view

  function gridRenderer() {
    // TODO put this logic to Store?
    const columns: GridColumns = todos.reduce(
      (acc: GridColumns, curr: Todo) => {
        if (acc?.[curr.status]) {
          acc[curr.status]?.push(curr);
        } else {
          acc[curr.status] = [curr];
        }
        return acc;
      },
      {}
    );

    return gridConfig.map((column, index) => {
      if (!column.isVisible) return null;
      return (
        <div className={styles.gridColumn} key={index}>
          {listRenderer(columns[column.column as TodoStatus])}
        </div>
      );
    });
  }

  return (
    <div
      className={cn(styles.container, {
        [styles['container--grid']]: view === TodoView.Grid,
      })}
    >
      {view === TodoView.List ? listRenderer(todos) : gridRenderer()}
    </div>
  );
});

export default TodoList;
