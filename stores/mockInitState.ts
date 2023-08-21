import { RootStoreHydration } from './RootStore';
import { Todo } from './TodoStore';
import { TodoView } from '@/utils/constants';
import { TodoRepository } from '@/lib/services/TodoRepository';

export async function fetchInitialStoreState(): Promise<RootStoreHydration> {
  let todos: Todo[] = [];
  try {
    todos = (await new TodoRepository().getAll()) as Todo[];
  } catch (e) {
    console.error('error getAll todo', e);
  }
  return {
    todoStore: {
      todoItems: [...todos],
      view: TodoView.List,
    },
    notesStore: {
      noteItems: [
        {
          id: '1',
          title: 'asd',
          content: 'lorem imsum',
          color: 'blue',
        },
        {
          id: '2',
          title: 'asd2',
          content: 'lorem imsum2',
          color: 'yellow',
        },
      ],
      size: 'small',
    },
  };
}
