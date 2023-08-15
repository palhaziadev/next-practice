import { db } from '@/firebase';
import {
  addDoc,
  collection,
  doc,
  getDocs,
  updateDoc,
} from 'firebase/firestore';
import RepositoryInterface from './IRepository';
import { Todo } from '@/stores/TodoStore';

export class TodoRepository implements RepositoryInterface<Todo> {
  async create(newTodo: Todo): Promise<Todo> {
    let docRef = null;
    try {
      docRef = await addDoc(collection(db, 'todos'), { ...newTodo });
      console.log('aaa Added: ', docRef.id);
    } catch (e) {
      // TODO remove item from array
      console.error('Error adding document: ', e);
    }
    return {
      id: docRef?.id,
      ...newTodo,
    };
  }

  async getAll(): Promise<Todo[]> {
    console.log('getAll');
    const todos: Todo[] = [];
    const querySnapshot = await getDocs(collection(db, 'todos'));
    for (const doc of querySnapshot.docs) {
      console.log(`Document found at path: ${doc.ref.path}, id: ${doc.id}`);
      todos.push({
        ...doc.data(),
        id: doc.id,
      } as Todo);
    }
    return todos;
  }

  //fix return type
  async update(id: string, todoProps: Partial<Todo>): Promise<void> {
    let docRef = null;
    try {
      const document = doc(db, 'todos', id);
      docRef = await updateDoc(document, { ...todoProps });
      console.log('aaa updated: ', docRef);
    } catch (e) {
      // TODO remove item from array
      console.error('Error adding document: ', e);
    }
    // return {
    //   id: id,
    //   ...todoProps,
    // };
  }
  // getOne(id: string): Promise<Todo> {
  //   console.log('Method not implemented.', 'getOne', id);
  //   return ;
  // }
  // search(data: object): Promise<Todo> {
  //   console.log('Method not implemented.');
  // }
  // delete(data: Todo): Promise<Todo> {
  //   console.log('Method not implemented.');
  // }
}
