'use client';
import Icon from '@/components/lib/icon/Icon';
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
          fill="var(--primary-brand-color)"
          stroke="black"
          name="ViewColumnsIcon"
          onClick={() => (todoStore.view = TodoView.Grid)}
        />
      ) : (
        <Icon
          name="ListBulletIcon"
          onClick={() => (todoStore.view = TodoView.List)}
        />
      )}
    </div>
  );
});

export default ViewSwitcher;
