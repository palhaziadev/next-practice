'use client';
import Button from '@/components/lib/button/Button';
import InputField from '@/components/lib/inputField/InputField';
import { useTodoStore } from '@/stores';
import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';

const NewTodo = observer(() => {
  const todoStore = useTodoStore();
  const [newTodo, setNewTodo] = useState({
    id: '',
    title: '',
    done: false,
  });

  return (
    <div className="flex">
      <InputField
        onChange={(value) => setNewTodo({ ...newTodo, title: value })}
        value={newTodo.title}
      />
      <Button
        text="Add Todo"
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
