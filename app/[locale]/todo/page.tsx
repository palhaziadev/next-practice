import { isServer } from '@/utils';
import styles from './page.module.scss';
import TodoList from '@/components/todo/todoList/TodoList';
import NewTodo from '@/components/todo/newTodo/NewTodo';

// TODO try https://next-intl-docs.vercel.app/docs/getting-started/app-router-server-components#static-rendering
// import {getTranslator} from 'next-intl/server';

// export default async function Index({params: {locale}}) {
//   const t = await getTranslator(locale, 'Index');
//   return <h1>{t('title')}</h1>;
// }

export default function Todo() {
  console.log('hello from Todo component ', isServer);

  return (
    <div className={styles.page}>
      <div>
        <div className={`m-auto ${styles.container}`}>
          <div className={styles.newContainer}>
            <NewTodo />
          </div>
          <TodoList />
        </div>
      </div>
    </div>
  );
}
