import React from 'react';
import { User } from '../types/user';
import { Todo } from '../types/todo';
import { BarChart3, CheckCircle2, Clock } from 'lucide-react';

interface DashboardProps {
  todos: Todo[];
  users: User[];
}

export function Dashboard({ todos, users }: DashboardProps) {
  const getTodosByUser = (userId: string) => {
    return todos.filter(todo => todo.assigneeId === userId);
  };

  const getUserProgress = (userId: string) => {
    const userTodos = getTodosByUser(userId);
    if (userTodos.length === 0) return 0;
    return Math.round(
      userTodos.reduce((acc, todo) => acc + todo.progress, 0) / userTodos.length
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
      <div className="bg-white p-6 rounded-xl shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <BarChart3 className="w-5 h-5 text-blue-500" />
          <h2 className="text-lg font-semibold">Team Progress</h2>
        </div>
        <div className="space-y-4">
          {users.map(user => (
            <div key={user.id} className="flex items-center gap-3">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-8 h-8 rounded-full"
              />
              <div className="flex-1">
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">{user.name}</span>
                  <span className="text-sm text-gray-500">
                    {getUserProgress(user.id)}%
                  </span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full">
                  <div
                    className="h-full bg-blue-500 rounded-full transition-all duration-300"
                    style={{ width: `${getUserProgress(user.id)}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-5 h-5 text-blue-500" />
          <h2 className="text-lg font-semibold">Status Overview</h2>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {(['pending', 'in-progress', 'completed'] as const).map(status => {
            const count = todos.filter(t => t.status === status).length;
            return (
              <div key={status} className="text-center">
                <div className="text-2xl font-bold text-gray-800">{count}</div>
                <div className="text-sm text-gray-500 capitalize">{status}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}