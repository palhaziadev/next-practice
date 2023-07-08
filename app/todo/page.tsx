import AppHeader from '@/components/header/AppHeader';
import { isServer } from '@/utils';
import styles from './page.module.scss';
import TodoList from '@/components/todo/todoList/TodoList';
import NewTodo from '@/components/todo/newTodo/NewTodo';

export default function Todo() {
  console.log('hello from Todo component ', isServer);

  // const [newTodoText, setNewTodoText] = useState('');

  return (
    <div className={styles.page}>
      <AppHeader></AppHeader>
      <div>
        <div className={`m-auto ${styles.container}`}>
          <NewTodo />
          <TodoList />
        </div>
      </div>
    </div>
  );
}
