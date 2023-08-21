import { TodoRepository } from '@/lib/services/TodoRepository';
import { NotesState, NotesStore } from './NotesStore';
import { TodoState, TodoStore } from './TodoStore';

export type RootStoreHydration = {
  todoStore?: TodoState;
  notesStore?: NotesState;
};
export class RootStore {
  todoStore: TodoStore;
  notesStore: NotesStore;

  constructor() {
    this.todoStore = new TodoStore(new TodoRepository());
    this.notesStore = new NotesStore();
  }

  hydrate(data: RootStoreHydration) {
    if (data.todoStore) {
      this.todoStore.hydrate(data.todoStore);
    }
    if (data.notesStore) {
      this.notesStore.hydrate(data.notesStore);
    }
  }
}
