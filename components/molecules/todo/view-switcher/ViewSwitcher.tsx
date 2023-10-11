'use client';
import Icon from '@/components/atoms/icon/Icon';
import { useTodoStore } from '@/stores';
import { TodoView } from '@/utils/constants';
import { observer } from 'mobx-react-lite';
import React from 'react';
import styles from './ViewSwitcher.module.scss';

const ViewSwitcher = observer(() => {
  const todoStore = useTodoStore();

  return (
    <div className={styles.container}>
      {todoStore.view === TodoView.List ? (
        <Icon
          fill="white"
          stroke="var(--primary-brand-color)"
          name="ViewColumnsIcon"
          onClick={() => todoStore.setView(TodoView.Grid)}
        />
      ) : (
        <Icon
          fill="white"
          stroke="var(--primary-brand-color)"
          name="ListBulletIcon"
          onClick={() => todoStore.setView(TodoView.List)}
        />
      )}
    </div>
  );
});

export default ViewSwitcher;
