export interface User {
  id: string;
  name: string;
  avatar: string;
}

export const DEMO_USERS: User[] = [
  { id: '1', name: 'Alice Cooper', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop' },
  { id: '2', name: 'Bob Wilson', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop' },
  { id: '3', name: 'Carol Smith', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop' },
  { id: '4', name: 'Rutendo Chivima', avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100&h=100&fit=crop' },
];