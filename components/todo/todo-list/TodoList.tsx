'use client';
import { useTodoStore } from '@/stores';
import { observer } from 'mobx-react-lite';
import React, { ReactNode, memo, useState } from 'react';
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

  function columnRenderer(itemsToRender: Todo[] = []) {
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

  function listRenderer() {
    return <div className={styles.column}>{columnRenderer(todos)}</div>;
  }

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
        <div
          className={cn(styles.column, {
            [styles['column--grid']]: view === TodoView.Grid,
          })}
          key={index}
        >
          {columnRenderer(columns[column.column as TodoStatus])}
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
    return <>{view === TodoView.List ? listRenderer() : gridRenderer()}</>;
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

      <ModalRenderer
        handleSubmit={handleSubmit}
        modalData={modalData}
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </div>
  );
});

type TodoFormModalProps = {
  handleSubmit: (todo: Todo) => void;
  modalData: Todo | undefined;
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
};

const ModalRenderer = memo(
  function ModalRenderer({
    handleSubmit,
    modalData,
    showModal,
    setShowModal,
  }: TodoFormModalProps) {
    const t = useTranslations('Todo');

    return (
      <Modal
        title={t('modifyTodo')}
        onClose={() => {
          setShowModal(false);
        }}
        show={showModal}
      >
        <TodoForm todo={modalData} onSubmit={(todo) => handleSubmit(todo)} />
      </Modal>
    );
  },
  (prev, next) => prev.showModal === next.showModal
);

export default TodoList;
