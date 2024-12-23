export type TodoStatus = 'pending' | 'in-progress' | 'completed';

export interface Todo {
  id: string;
  title: string;
  status: TodoStatus;
  progress: number;
  createdAt: Date;
  assigneeId?: string;
}