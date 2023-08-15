import { isServer } from '@/utils';
import { TodoStatus } from '@/types';
import { action, flow, makeObservable, observable } from 'mobx';
import { enableStaticRendering } from 'mobx-react-lite';
import { TodoService } from '@/lib/services/TodoService';

enableStaticRendering(isServer);

export type Todo = {
  id?: string;
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
  todoService = new TodoService();

  constructor() {
    makeObservable(this, {
      todoItems: observable,
      theme: observable,
      hydrate: action,
      addTodo: action,
      getTodos: flow,
      setStatus: action.bound,
      // nextId: computed,
    });
  }

  *getTodos() {
    // TODO add try catch
    console.log('aaa flow function');
    this.todoItems = (yield this.todoService.getTodos()) as Todo[];
  }

  // get nextId() {
  //   return this.todoItems.length + 1;
  // }

  // onSnapshot Get realtime updates, check with mobx

  async addTodo(newTodo: Todo) {
    this.todoItems.push(await this.todoService.addTodo(newTodo));
  }

  // update doc?
  setStatus(id: string, status: TodoStatus) {
    console.log(id, status);
    for (const item of this.todoItems) {
      if (item.id === id) {
        item.status = status;
        this.todoService.updateTodo(id, { status });
        break;
      }
    }
  }

  hydrate(serializedStore: TodoState) {
    this.todoItems = serializedStore.todoItems;
    this.theme = serializedStore.theme;
  }
}
