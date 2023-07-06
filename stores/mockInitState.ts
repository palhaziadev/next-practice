import { RootStoreHydration } from './RootStore';

export async function fetchInitialStoreState(): Promise<RootStoreHydration> {
  return {
    todoStore: {
      todoItems: [
        {
          id: '1',
          title: 'test',
          done: false,
        },
        {
          id: '2',
          title: 'done',
          done: true,
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
