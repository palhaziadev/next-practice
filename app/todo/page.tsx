'use client';
import { useTodoStore } from '@/stores';
import { isServer } from '@/utils';
import { observer } from 'mobx-react-lite';
import Link from 'next/link';
import { useState } from 'react';

export default observer(function Todo() {
  const todoStore = useTodoStore();
  const todoItems = todoStore.todoItems;
  console.log('hello from Todo component ', isServer);
  const [newTodo, setNewTodo] = useState({
    id: '',
    title: '',
    done: false,
  });

  return (
    <div>
      <Link href="/">To Main</Link>
      <Link href="/notes">To Notes</Link>
      <div>
        <input
          type="text"
          onBlur={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
        ></input>
        <button
          onClick={() =>
            todoStore.addTodo({
              ...newTodo,
              id: todoStore.nextId,
            })
          }
        >
          add todo
        </button>
        {todoItems.map((item) => {
          return (
            <div key={item.id}>
              {item.id} {item.title} {item.done ? 'done' : 'not done'}
              <button onClick={() => todoStore.toggleDone(item)}>Done</button>
            </div>
          );
        })}
      </div>
      <div>lédaskdjéalskdjaéslkdjasélk</div>
    </div>
  );
});
