import { isServer } from '@/utils';
import { TodoStatus } from '@/types';
import { action, computed, flow, makeObservable, observable } from 'mobx';
import { enableStaticRendering } from 'mobx-react-lite';
import { TodoView } from '@/utils/constants';
import IRepository from '@/lib/services/IRepository';

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

type TodoFilterProps = Pick<Todo, 'title'>;

export type TodoState = {
  todoItems: Array<Todo>;
  view: TodoView;
};

export class TodoStore {
  todoItems: Array<Todo> = [];
  filteredTodos: Array<Todo> | undefined = undefined;
  view = TodoView.List;
  repository;
  gridConfig = [
    {
      column: TodoStatus.Created,
      isVisible: true,
    },
    {
      column: TodoStatus.InProgress,
      isVisible: true,
    },
    {
      column: TodoStatus.Blocked,
      isVisible: true,
    },
    {
      column: TodoStatus.Done,
      isVisible: true,
    },
    {
      column: TodoStatus.Archived,
      isVisible: false,
    },
  ];
  // sort config?
  // filter config?

  constructor(repository: IRepository<Todo>) {
    this.repository = repository;
    makeObservable(this, {
      todoItems: observable,
      filteredTodos: observable,
      view: observable,
      hydrate: action,
      setView: action,
      filterTodos: action,
      addTodo: flow,
      getTodos: flow,
      updateTodo: flow.bound,
      deleteTodo: flow.bound,
      // nextId: computed,
      todos: computed,
    });
  }

  // TODO getter for grid view structure?
  // get todosForGrid () {}

  *getTodos() {
    try {
      this.todoItems = (yield this.repository.getAll()) as Todo[];
    } catch (e) {
      console.error('get all todo error: ', e);
    }
  }

  // get nextId() {
  //   return this.todoItems.length + 1;
  // }

  // onSnapshot Get realtime updates, check with mobx

  // TODO maybe shouldn't be computed?
  get todos() {
    console.log('aaa get todos');
    return this.filteredTodos ? this.filteredTodos : this.todoItems;
  }

  *addTodo(newTodo: Todo) {
    try {
      this.todoItems.unshift(yield this.repository.create(newTodo));
    } catch (e) {
      console.error('add todo error: ', e);
    }
  }

  *updateTodo(id: string, todoProps: Partial<Todo>) {
    const itemIndex = this.todoItems.findIndex((todo) => todo.id === id);
    try {
      yield this.repository.update(id, todoProps);
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
      yield this.repository.delete(id);
      this.todoItems = this.todoItems.filter((todo) => todo.id !== id);
    } catch (e) {
      console.error('delete todo error: ', e);
    }
  }

  filterTodos(filterProps: TodoFilterProps): void {
    if (!filterProps.title.length) {
      this.filteredTodos = undefined;
    }
    this.filteredTodos = this.todoItems.filter((item) => {
      return item.title.includes(filterProps.title);
    });
  }

  setView(view: TodoView): void {
    this.view = view;
  }

  hydrate(serializedStore: TodoState) {
    this.todoItems = serializedStore.todoItems;
    this.view = serializedStore.view;
  }
}
