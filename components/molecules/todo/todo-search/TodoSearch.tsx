'use client';
import Search from '@/components/molecules/common/search/Search';
import { useTodoStore } from '@/stores';
import { observer } from 'mobx-react-lite';
import React from 'react';

const TodoSearch = observer(() => {
  const todoStore = useTodoStore();
  return (
    <div>
      <Search onSearch={(value) => todoStore.filterTodos({ title: value })} />
    </div>
  );
});

export default TodoSearch;
