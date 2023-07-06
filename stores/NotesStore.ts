import { isServer } from '@/utils';
import { action, makeObservable, observable } from 'mobx';
import { enableStaticRendering } from 'mobx-react-lite';

enableStaticRendering(isServer);

type Note = {
  id: string;
  title: string;
  content: string;
  color: string;
};

export type NotesState = {
  noteItems: Array<Note>;
  size: string;
};

export class NotesStore {
  noteItems: Array<Note> = [];
  size = '';

  constructor() {
    makeObservable(this, {
      noteItems: observable,
      size: observable,
      hydrate: action,
    });
  }

  hydrate(serializedStore: NotesState) {
    this.noteItems = serializedStore.noteItems;
    this.size = serializedStore.size;
  }
}

export async function fetchInitialStoreState() {
  // You can do anything to fetch initial store state
  // Todo needed?
  return {};
}
