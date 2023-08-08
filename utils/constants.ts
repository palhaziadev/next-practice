import { TodoStatus } from '@/types';

export const todoStatus: TodoStatus[] = [
  TodoStatus.Created,
  TodoStatus.InProgress,
  TodoStatus.Blocked,
  TodoStatus.Done,
  TodoStatus.Cancelled,
];

export const themes = ['light', 'dark', 'mario'];

export const locales = ['en', 'es', 'hu'];
