'use client';
import Button from '@/components/atoms/button/Button';
import React, { useState } from 'react';
import styles from './NewTodo.module.scss';
import { useTranslations } from 'next-intl';
import Modal from '@/components/atoms/modal/Modal';
import TodoForm from '../../todo/todo-form/TodoForm';
import { useTodoStore } from '@/stores';
import { Todo } from '@/stores/TodoStore';

const NewTodo = () => {
  const todoStore = useTodoStore();
  const [showModal, setShowModal] = useState(false);
  const t = useTranslations('Todo');

  const handleSubmit = (todo: Todo) => {
    setShowModal(false);
    todoStore.addTodo(todo);
  };

  return (
    <div className={styles.container}>
      <Button text={t('addTodo')} onClick={() => setShowModal(true)}></Button>
      <Modal
        title={t('newTodo')}
        onClose={() => setShowModal(false)}
        show={showModal}
      >
        <TodoForm onSubmit={(todo) => handleSubmit(todo)} />
      </Modal>
    </div>
  );
};

export default NewTodo;
