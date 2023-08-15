export enum TodoStatus {
  Created = 'Created',
  InProgress = 'InProgress',
  Blocked = 'Blocked',
  Done = 'Done',
  Archived = 'Archived',
}

export interface BaseComponent {
  className: string;
}
