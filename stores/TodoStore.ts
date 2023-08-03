import { isServer } from '@/utils';
import { TodoStatus } from '@/types';
import { action, computed, makeObservable, observable } from 'mobx';
import { enableStaticRendering } from 'mobx-react-lite';

enableStaticRendering(isServer);

export type Todo = {
  id: number;
  title: string;
  description: string;
  status: TodoStatus;
  createdBy: string;
  createdDate: string;
  owner: string;
  orderNumber: number;
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
      setStatus: action.bound,
      nextId: computed,
      // timeString: computed,
    });
  }

  get nextId() {
    return this.todoItems.length + 1;
  }

  addTodo(newTodo: Todo) {
    this.todoItems.push(newTodo);
  }

  setStatus(id: number, status: TodoStatus) {
    console.log(id, status);
    for (const item of this.todoItems) {
      if (item.id === id) {
        item.status = status;
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
