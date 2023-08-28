'use client';
import { useTodoStore } from '@/stores';
import { observer } from 'mobx-react-lite';
import React, { ReactNode, useState } from 'react';
import TodoItem from '../todo-item/TodoItem';
import styles from './TodoList.module.scss';
import { TodoStatus, TodoView } from '@/utils/constants';
import cn from 'classnames';
import { Todo } from '@/stores/TodoStore';
import Modal from '@/components/lib/modal/Modal';
import TodoForm from '../todo-form/TodoForm';
import { useTranslations } from 'next-intl';

type GridColumns = {
  [key in TodoStatus]?: Todo[];
};

const TodoList = observer(() => {
  const t = useTranslations('Todo');
  const todoStore = useTodoStore();
  // TODO modal context?
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState<Todo>();
  const { view, todos, updateTodo, deleteTodo, gridConfig } = todoStore;

  function openTodo(todo: Todo): void {
    setModalData(todo);
    setShowModal(true);
  }

  function listRenderer(itemsToRender: Todo[] = []) {
    return itemsToRender.map((item) => {
      return (
        <TodoItem
          className={styles.item}
          key={item.id}
          todo={item}
          updateTodo={updateTodo}
          openTodo={(todo) => openTodo(todo)}
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

  function handleSubmit(todo: Todo): void {
    setShowModal(false);
    if (todo.id) {
      updateTodo(todo.id, { ...todo });
    }
  }

  function renderItems(): ReactNode {
    return (
      <>
        {view === TodoView.List ? listRenderer(todos) : gridRenderer()}
        <Modal
          title={t('newTodo')}
          onClose={() => setShowModal(false)}
          show={showModal}
        >
          <TodoForm todo={modalData} onSubmit={(todo) => handleSubmit(todo)} />
        </Modal>
      </>
    );
  }

  function renderEmptyView(): ReactNode {
    return <div className={styles.empty}>{t('noItems')}</div>;
  }

  return (
    <div
      className={cn(styles.container, {
        [styles['container--grid']]: view === TodoView.Grid,
      })}
    >
      {!todos.length ? renderEmptyView() : renderItems()}
    </div>
  );
});

export default TodoList;
