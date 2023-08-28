import { db } from '@/firebase';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from 'firebase/firestore';
import IRepository from './IRepository';
import { Todo } from '@/stores/TodoStore';

export class TodoRepository implements IRepository<Todo> {
  private readonly collectionName = 'todos';

  async create(newTodo: Todo): Promise<Todo> {
    let docRef = null;
    try {
      docRef = await addDoc(collection(db, this.collectionName), newTodo);
    } catch (e) {
      // console.error('Error adding document: ', e);
      throw new Error(e as string);
    }
    return {
      id: docRef?.id,
      ...newTodo,
    };
  }

  async getAll(): Promise<Todo[]> {
    const todos: Todo[] = [];
    try {
      const querySnapshot = await getDocs(collection(db, this.collectionName));
      // const querySnapshot =  await query(collection(db, this.collectionName), orderBy("createdDate"));
      for (const doc of querySnapshot.docs) {
        todos.push({
          ...doc.data(),
          id: doc.id,
        } as Todo);
      }
    } catch (e) {
      // console.error('Error getAll document: ', e);
      throw new Error(e as string);
    }
    // TODO fix sort
    return todos.sort(
      (a: Todo, b: Todo) =>
        new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime()
    );
  }

  async update(id: string, todoProps: Partial<Todo>): Promise<void> {
    try {
      const document = doc(db, this.collectionName, id);
      await updateDoc(document, { ...todoProps });
    } catch (e) {
      // console.error('Error updating document: ', e);
      throw new Error(e as string);
    }
  }
  // getOne(id: string): Promise<Todo> {
  //   console.log('Method not implemented.', 'getOne', id);
  //   return ;
  // }
  // search(data: object): Promise<Todo> {
  //   console.log('Method not implemented.');
  // }

  async delete(id: string): Promise<void> {
    try {
      await deleteDoc(doc(db, this.collectionName, id));
    } catch (e) {
      // console.log('Error removing document: ', e);
      throw new Error(e as string);
    }
  }
}
