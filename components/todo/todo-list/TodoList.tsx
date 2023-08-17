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
  const { view, todoItems, updateTodo, deleteTodo } = todoStore;

  function openTodo(): void {
    //TODO
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

  function gridRenderer() {
    // TODO create array for column order
    console.log('aaa items', todoItems);
    const columns: GridColumns = todoItems.reduce(
      (acc: GridColumns, curr: Todo) => {
        if (acc?.[curr.status]) {
          acc[curr.status]?.push(curr);
        } else {
          console.log('aaa else', acc, curr);
          acc[curr.status] = [curr];
        }
        return acc;
      },
      {}
    );
    console.log('aaa grid cols', columns);
    // TODO handle Archived properly
    delete columns[TodoStatus.Archived];

    return Object.keys(columns).map((column, index) => {
      return (
        <div className={styles.gridColumn} key={index}>
          {listRenderer(columns[column as TodoStatus])}
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
      {view === TodoView.List ? listRenderer(todoItems) : gridRenderer()}
    </div>
  );
});

export default TodoList;
