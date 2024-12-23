import React, { useState } from 'react';
import { CheckCircle2, ListTodo } from 'lucide-react';
import { Todo, TodoStatus } from './types/todo';
import { DEMO_USERS } from './types/user';
import { TodoItem } from './components/TodoItem';
import { AddTodo } from './components/AddTodo';
import { Dashboard } from './components/Dashboard';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (title: string) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      title,
      status: 'pending',
      progress: 0,
      createdAt: new Date(),
    };
    setTodos([newTodo, ...todos]);
  };

  const updateTodoStatus = (id: string, status: TodoStatus) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { 
        ...todo, 
        status,
        progress: status === 'completed' ? 100 : todo.progress 
      } : todo
    ));
  };

  const updateTodoProgress = (id: string, progress: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { 
        ...todo,
        progress,
        status: progress === 100 ? 'completed' : progress === 0 ? 'pending' : 'in-progress'
      } : todo
    ));
  };

  const updateTodoAssignee = (id: string, userId: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, assigneeId: userId } : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const completedTasks = todos.filter(todo => todo.status === 'completed').length;
  const totalTasks = todos.length;
  const completionPercentage = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-12 px-4">
        <div className="flex items-center gap-3 mb-8">
          <ListTodo className="w-8 h-8 text-blue-500" />
          <h1 className="text-3xl font-bold text-gray-900">Task Manager</h1>
        </div>

        <Dashboard todos={todos} users={DEMO_USERS} />

        <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-700">Overall Progress</h2>
              <p className="text-sm text-gray-500">
                {completedTasks} of {totalTasks} tasks completed
              </p>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-500" />
              <span className="text-lg font-semibold text-gray-700">
                {completionPercentage}%
              </span>
            </div>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full">
            <div
              className="h-full bg-green-500 rounded-full transition-all duration-300"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
        </div>

        <AddTodo onAdd={addTodo} />

        <div className="mt-8 space-y-4">
          {todos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              users={DEMO_USERS}
              onStatusChange={updateTodoStatus}
              onProgressChange={updateTodoProgress}
              onAssigneeChange={updateTodoAssignee}
              onDelete={deleteTodo}
            />
          ))}
          {todos.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              No tasks yet. Add one to get started!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;