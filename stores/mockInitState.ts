import { TodoStatus } from '@/types';
import { RootStoreHydration } from './RootStore';

export async function fetchInitialStoreState(): Promise<RootStoreHydration> {
  return {
    todoStore: {
      todoItems: [
        {
          id: 1,
          title: 'created title',
          description: '',
          status: TodoStatus.Created,
          createdBy: '',
          createdDate: '',
          orderNumber: 0,
          owner: '',
        },
        {
          id: 2,
          title: 'inprogress title',
          description: '',
          status: TodoStatus.InProgress,
          createdBy: '',
          createdDate: '',
          orderNumber: 0,
          owner: '',
        },
        {
          id: 3,
          title: 'done title',
          description: '',
          status: TodoStatus.Done,
          createdBy: '',
          createdDate: '',
          orderNumber: 0,
          owner: '',
        },
      ],
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
