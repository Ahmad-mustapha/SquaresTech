import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/api';
import {
  Plus,
  Circle,
  Clock,
  CheckCircle2,
} from 'lucide-react';
import DeleteTaskModal from './tasks/DeleteTaskModal';
import TaskColumn from './tasks/TaskColumn';
import TaskModal from './tasks/TaskModal';
import type { Member, Task, TaskFormData, TaskColumnDef } from './tasks/types';

export default function Tasks() {
  const queryClient = useQueryClient();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [deletingTask, setDeletingTask] = useState<Task | null>(null);

  // Fetch tasks
  const { data: tasksData, isLoading: tasksLoading, error: tasksError } = useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      const res = await apiRequest('/tasks');
      if (!res.success) throw new Error(res.message);
      return res.data as Task[];
    },
  });

  // Fetch members for assignment
  const { data: membersData } = useQuery({
    queryKey: ['members'],
    queryFn: async () => {
      const res = await apiRequest('/members');
      if (!res.success) throw new Error(res.message);
      return res.data as Member[];
    },
  });

  // Create
  const createMutation = useMutation({
    mutationFn: async (newTask: TaskFormData) => {
      const payload = { ...newTask, memberId: newTask.memberId || undefined };
      const res = await apiRequest('/tasks', { method: 'POST', data: payload });
      if (!res.success) throw new Error(res.message);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      setIsAddModalOpen(false);
    },
  });

  // Update
  const updateMutation = useMutation({
    mutationFn: async ({ id, data: taskData }: { id: string; data: TaskFormData }) => {
      const payload = { ...taskData, memberId: taskData.memberId || undefined };
      const res = await apiRequest(`/tasks/${id}`, { method: 'PUT', data: payload });
      if (!res.success) throw new Error(res.message);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      setEditingTask(null);
    },
  });

  // Delete
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await apiRequest(`/tasks/${id}`, { method: 'DELETE' });
      if (!res.success) throw new Error(res.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      setDeletingTask(null);
    },
  });

  // Quick move status update
  const moveTaskMutation = useMutation({
    mutationFn: async ({ id, newStatus }: { id: string; newStatus: Task['status'] }) => {
      // Find current task
      const task = tasksData?.find(t => t.id === id);
      if (!task) throw new Error('Task not found');
      const payload = { ...task, status: newStatus };
      const res = await apiRequest(`/tasks/${id}`, { method: 'PUT', data: payload });
      if (!res.success) throw new Error(res.message);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  const tasks = tasksData || [];
  const members = membersData || [];

  const getMemberDetails = (memberId?: string) => {
    return members.find(m => m.id === memberId);
  };

  const columns: TaskColumnDef[] = [
    { id: 'todo', label: 'To Do', icon: <Circle className="w-4 h-4" />, bg: 'bg-gray-50', border: 'border-gray-200', text: 'text-gray-600' },
    { id: 'in_progress', label: 'In Progress', icon: <Clock className="w-4 h-4" />, bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-600' },
    { id: 'done', label: 'Completed', icon: <CheckCircle2 className="w-4 h-4" />, bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-600' }
  ];

  return (
    <div className="space-y-6 h-full flex flex-col">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-gray-800" style={{ margin: 0, fontSize: '1.25rem', lineHeight: '1.4' }}>
            Task Board
          </h1>
          <p className="text-xs text-gray-400 mt-0.5" style={{ margin: '2px 0 0 0' }}>
            Manage and track team progress
          </p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="!bg-amber-500 !text-white !border-none !rounded-xl !text-xs !font-semibold hover:!bg-amber-600 !outline-none transition-colors flex items-center gap-2 self-start"
          style={{ padding: '10px 20px', fontSize: '12px' }}
        >
          <Plus className="w-4 h-4" />
          New Task
        </button>
      </div>

      {tasksLoading ? (
        <div className="flex items-center justify-center py-20 flex-1">
          <div className="w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : tasksError ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 flex-1">
          <p className="text-sm text-red-400 font-medium" style={{ margin: 0 }}>
            Failed to load tasks.
          </p>
        </div>
      ) : (
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {columns.map((col) => {
            const colTasks = tasks.filter((t) => t.status === col.id);
            return (
              <TaskColumn
                key={col.id}
                column={col}
                tasks={colTasks}
                getMemberDetails={getMemberDetails}
                onEdit={(task) => setEditingTask(task)}
                onDelete={(task) => setDeletingTask(task)}
                onMove={(id, newStatus) => moveTaskMutation.mutate({ id, newStatus })}
              />
            );
          })}
        </div>
      )}

      {/* Modals */}
      <TaskModal
        key={isAddModalOpen ? 'add-open' : 'add-closed'}
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={(data) => createMutation.mutate(data)}
        isEditing={false}
        members={members}
      />

      <TaskModal
        key={editingTask?.id ?? 'edit-none'}
        isOpen={!!editingTask}
        onClose={() => setEditingTask(null)}
        onSubmit={(data) => {
          if (editingTask) updateMutation.mutate({ id: editingTask.id, data });
        }}
        initialData={editingTask}
        isEditing={true}
        members={members}
      />

      <DeleteTaskModal
        isOpen={!!deletingTask}
        onClose={() => setDeletingTask(null)}
        onConfirm={() => {
          if (deletingTask) deleteMutation.mutate(deletingTask.id);
        }}
        taskTitle={deletingTask?.title || ''}
      />
    </div>
  );
}
