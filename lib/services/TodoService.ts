import { isServer } from '@/utils';
import { TodoRepository } from './TodoFirebase';
import { Todo } from '@/stores/TodoStore';

export class TodoService {
  repository = new TodoRepository();
  constructor() {
    // needed?
  }

  async getTodos() {
    console.log('aaa isserver service', isServer);
    return this.repository.getAll();
  }

  async addTodo(newTodo: Todo) {
    return this.repository.create(newTodo);
  }

  async updateTodo(id: string, props: Partial<Todo>) {
    return this.repository.update(id, props);
  }
}
