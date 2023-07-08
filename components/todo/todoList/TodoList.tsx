'use client';
import { useTodoStore } from '@/stores';
import { observer } from 'mobx-react-lite';
import React from 'react';

const TodoList = observer(() => {
  const todoStore = useTodoStore();
  const todoItems = todoStore.todoItems;
  return (
    <div>
      {todoItems.map((item) => {
        return (
          <div key={item.id}>
            {item.id} {item.title} {item.done ? 'done' : 'not done'}
            <button onClick={() => todoStore.toggleDone(item)}>Done</button>
          </div>
        );
      })}
    </div>
  );
});

export default TodoList;
