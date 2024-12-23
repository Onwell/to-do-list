import React from 'react';
import { CheckCircle2, Circle, Timer, Trash2 } from 'lucide-react';
import { Todo, TodoStatus } from '../types/todo';
import { User } from '../types/user';
import { UserSelect } from './UserSelect';

interface TodoItemProps {
  todo: Todo;
  users: User[];
  onStatusChange: (id: string, status: TodoStatus) => void;
  onProgressChange: (id: string, progress: number) => void;
  onAssigneeChange: (id: string, userId: string) => void;
  onDelete: (id: string) => void;
}

export function TodoItem({
  todo,
  users,
  onStatusChange,
  onProgressChange,
  onAssigneeChange,
  onDelete
}: TodoItemProps) {
  const statusIcons = {
    pending: <Circle className="w-5 h-5 text-gray-400" />,
    'in-progress': <Timer className="w-5 h-5 text-yellow-500" />,
    completed: <CheckCircle2 className="w-5 h-5 text-green-500" />
  };

  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm border border-gray-100">
      <button
        onClick={() => {
          const nextStatus: Record<TodoStatus, TodoStatus> = {
            pending: 'in-progress',
            'in-progress': 'completed',
            completed: 'pending'
          };
          onStatusChange(todo.id, nextStatus[todo.status]);
        }}
        className="hover:scale-110 transition-transform"
      >
        {statusIcons[todo.status]}
      </button>
      
      <div className="flex-1">
        <div className="flex items-center justify-between mb-2">
          <h3 className={`text-lg ${todo.status === 'completed' ? 'line-through text-gray-400' : 'text-gray-800'}`}>
            {todo.title}
          </h3>
          <UserSelect
            users={users}
            selectedUserId={todo.assigneeId}
            onChange={(userId) => onAssigneeChange(todo.id, userId)}
          />
        </div>
        <div className="flex items-center gap-2">
          <input
            type="range"
            min="0"
            max="100"
            value={todo.progress}
            onChange={(e) => onProgressChange(todo.id, Number(e.target.value))}
            className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <span className="text-sm text-gray-600 min-w-[3rem]">{todo.progress}%</span>
        </div>
      </div>

      <button
        onClick={() => onDelete(todo.id)}
        className="p-2 text-gray-400 hover:text-red-500 transition-colors"
      >
        <Trash2 className="w-5 h-5" />
      </button>
    </div>
  );
}