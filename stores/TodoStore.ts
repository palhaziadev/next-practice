import { isServer } from '@/utils';
import { action, computed, makeObservable, observable } from 'mobx';
import { enableStaticRendering } from 'mobx-react-lite';

enableStaticRendering(isServer);

type Todo = {
  id: string;
  title: string;
  done: boolean;
};

export type TodoState = {
  todoItems: Array<Todo>;
  theme: string;
};

export class TodoStore {
  todoItems: Array<Todo> = [];
  theme = '';

  constructor() {
    makeObservable(this, {
      todoItems: observable,
      theme: observable,
      hydrate: action,
      addTodo: action,
      toggleDone: action,
      nextId: computed,
      // timeString: computed,
    });
  }

  get nextId() {
    return this.todoItems.length + 1 + '';
  }

  addTodo(newTodo: Todo) {
    this.todoItems.push(newTodo);
  }

  toggleDone(todo: Todo) {
    for (const item of this.todoItems) {
      if (item.id === todo.id) {
        item.done = !item.done;
        break;
      }
    }
  }

  hydrate(serializedStore: TodoState) {
    this.todoItems = serializedStore.todoItems;
    this.theme = serializedStore.theme;
  }
}

export async function fetchInitialStoreState() {
  // You can do anything to fetch initial store state
  // Todo needed?
  return {};
}
