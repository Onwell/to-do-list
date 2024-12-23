import React from 'react';
import { User } from '../types/user';

interface UserSelectProps {
  users: User[];
  selectedUserId?: string;
  onChange: (userId: string) => void;
}

export function UserSelect({ users, selectedUserId, onChange }: UserSelectProps) {
  return (
    <div className="flex -space-x-2 hover:space-x-1 transition-all">
      {users.map(user => (
        <button
          key={user.id}
          onClick={() => onChange(user.id)}
          className={`relative rounded-full hover:z-10 ring-2 transition-all ${
            selectedUserId === user.id
              ? 'ring-blue-500 z-10'
              : 'ring-white hover:ring-blue-200'
          }`}
        >
          <img
            src={user.avatar}
            alt={user.name}
            className="w-8 h-8 rounded-full"
            title={user.name}
          />
        </button>
      ))}
    </div>
  );
}