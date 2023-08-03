import { TodoStatus } from '@/types';

export const todoStatus: TodoStatus[] = [
  TodoStatus.Created,
  TodoStatus.InProgress,
  TodoStatus.Blocked,
  TodoStatus.Done,
  TodoStatus.Cancelled,
];
