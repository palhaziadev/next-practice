import { isServer } from '@/utils';
import { TodoStatus } from '@/types';
import { action, flow, makeObservable, observable } from 'mobx';
import { enableStaticRendering } from 'mobx-react-lite';
import { TodoService } from '@/lib/services/TodoService';
import { TodoView } from '@/utils/constants';

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
  view: TodoView;
};

export class TodoStore {
  todoItems: Array<Todo> = [];
  view = TodoView.List;
  todoService = new TodoService();
  // TODO create array for column order for grid view
  // sort config?
  // filter config?

  constructor() {
    makeObservable(this, {
      todoItems: observable,
      view: observable,
      hydrate: action,
      addTodo: flow,
      getTodos: flow,
      updateTodo: flow.bound,
      deleteTodo: flow.bound,
      // nextId: computed,
    });
  }

  *getTodos() {
    try {
      this.todoItems = (yield this.todoService.getTodos()) as Todo[];
    } catch (e) {
      console.error('get all todo error: ', e);
    }
  }

  // get nextId() {
  //   return this.todoItems.length + 1;
  // }

  // onSnapshot Get realtime updates, check with mobx

  *addTodo(newTodo: Todo) {
    try {
      this.todoItems.unshift(yield this.todoService.addTodo(newTodo));
    } catch (e) {
      console.error('add todo error: ', e);
    }
  }

  *updateTodo(id: string, todoProps: Partial<Todo>) {
    const itemIndex = this.todoItems.findIndex((todo) => todo.id === id);
    try {
      yield this.todoService.updateTodo(id, todoProps);
      this.todoItems.splice(itemIndex, 1, {
        ...this.todoItems[itemIndex],
        ...todoProps,
      });
    } catch (e) {
      console.error('update todo error: ', e);
    }
  }

  *deleteTodo(id: string) {
    try {
      yield this.todoService.deleteTodo(id);
      this.todoItems = this.todoItems.filter((todo) => todo.id !== id);
    } catch (e) {
      console.error('delete todo error: ', e);
    }
  }

  hydrate(serializedStore: TodoState) {
    this.todoItems = serializedStore.todoItems;
    this.view = serializedStore.view;
  }
}
