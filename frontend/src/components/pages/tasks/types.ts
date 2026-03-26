import React from 'react';

export interface Member {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in_progress' | 'done';
  memberId?: string;
}

export interface TaskFormData {
  title: string;
  description: string;
  status: 'todo' | 'in_progress' | 'done';
  memberId: string;
}

export interface TaskColumnDef {
  id: Task['status'];
  label: string;
  icon: React.ReactNode;
  bg: string;
  border: string;
  text: string;
}
