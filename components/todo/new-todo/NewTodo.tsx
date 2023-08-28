'use client';
import Button from '@/components/lib/button/Button';
import React, { useState } from 'react';
import styles from './NewTodo.module.scss';
import { useTranslations } from 'next-intl';
import Modal from '@/components/lib/modal/Modal';
import TodoForm from '../todo-form/TodoForm';
import { useTodoStore } from '@/stores';
import { Todo } from '@/stores/TodoStore';

const NewTodo = () => {
  const todoStore = useTodoStore();
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
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
        className="asd"
      >
        <TodoForm onSubmit={(todo) => handleSubmit(todo)} />
        <Button
          text={t('addTodo')}
          onClick={() => setShowModal2(true)}
        ></Button>
        <Modal
          title={'fuuu'}
          onClose={() => setShowModal2(false)}
          show={showModal2}
          parentRef=".asd"
        >
          second modal
        </Modal>
      </Modal>
    </div>
  );
};

export default NewTodo;
