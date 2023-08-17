import { TodoStatus } from '@/types';

export enum TodoView {
  List = 'List',
  Grid = 'Grid',
}

export const todoStatus: TodoStatus[] = [
  TodoStatus.Created,
  TodoStatus.InProgress,
  TodoStatus.Blocked,
  TodoStatus.Done,
  TodoStatus.Archived,
];

export const themes = ['light', 'dark', 'mario'];

export const locales = ['en', 'es', 'hu'];
