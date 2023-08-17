import { TodoRepository } from './TodoFirebase';
import { Todo } from '@/stores/TodoStore';

// TODO is the service needed?
export class TodoService {
  repository = new TodoRepository();
  constructor() {
    // needed?
  }

  async getTodos() {
    return this.repository.getAll();
  }

  async addTodo(newTodo: Todo) {
    return this.repository.create(newTodo);
  }

  async updateTodo(id: string, props: Partial<Todo>) {
    return this.repository.update(id, props);
  }

  async deleteTodo(id: string) {
    return this.repository.delete(id);
  }
}
