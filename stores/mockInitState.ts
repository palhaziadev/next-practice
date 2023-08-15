import { TodoService } from '@/lib/services/TodoService';
import { RootStoreHydration } from './RootStore';
import { Todo } from './TodoStore';

export async function fetchInitialStoreState(): Promise<RootStoreHydration> {
  return {
    todoStore: {
      todoItems: [...((await new TodoService().getTodos()) as Todo[])],
      theme: 'dark',
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
