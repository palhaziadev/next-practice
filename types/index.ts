export enum TodoStatus {
  Created = 'Created',
  InProgress = 'InProgress',
  Blocked = 'Blocked',
  Done = 'Done',
  Cancelled = 'Cancelled',
}

export interface BaseComponent {
  className: string;
}
