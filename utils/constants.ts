export enum TodoStatus {
  Created = 'Created',
  InProgress = 'InProgress',
  Blocked = 'Blocked',
  Done = 'Done',
  Archived = 'Archived',
}

export enum TodoView {
  List = 'List',
  Grid = 'Grid',
}

export const themes = ['light', 'dark', 'mario'];

export const locales = ['en', 'es', 'hu'] as const;
