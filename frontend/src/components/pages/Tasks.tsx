import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/api';
import {
  Plus,
  Pencil,
  Trash2,
  X,
  Type,
  AlignLeft,
  User as UserIcon,
  Circle,
  Clock,
  CheckCircle2,
  ListTodo
} from 'lucide-react';

interface Member {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in_progress' | 'done';
  memberId?: string;
}

interface TaskFormData {
  title: string;
  description: string;
  status: 'todo' | 'in_progress' | 'done';
  memberId: string;
}

const TaskModal = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isEditing,
  members,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: TaskFormData) => void;
  initialData?: Task | null;
  isEditing: boolean;
  members: Member[];
}) => {
  const [form, setForm] = useState<TaskFormData>({
    title: initialData?.title || '',
    description: initialData?.description || '',
    status: initialData?.status || 'todo',
    memberId: initialData?.memberId || '',
  });

  React.useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.title,
        description: initialData.description || '',
        status: initialData.status,
        memberId: initialData.memberId || '',
      });
    } else {
      setForm({ title: '', description: '', status: 'todo', memberId: '' });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose}></div>
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md relative z-10 overflow-hidden">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-800" style={{ margin: 0 }}>
              {isEditing ? 'Edit Task' : 'Add New Task'}
            </h3>
            <button
              onClick={onClose}
              className="!bg-gray-100 !border-none !p-2 !rounded-lg text-gray-400 hover:text-gray-600 hover:!bg-gray-200 !outline-none"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Form */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                Task Title
              </label>
              <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3">
                <Type className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="e.g. Design HomePage"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="bg-transparent text-sm font-medium text-gray-800 w-full placeholder:text-gray-400 !outline-none !ring-0 !border-none"
                  style={{ outline: 'none', boxShadow: 'none' }}
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                Description
              </label>
              <div className="flex bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 gap-3">
                <AlignLeft className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                <textarea
                  placeholder="Task details..."
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="bg-transparent text-sm font-medium text-gray-800 w-full placeholder:text-gray-400 !outline-none !ring-0 !border-none resize-none h-20"
                  style={{ outline: 'none', boxShadow: 'none' }}
                />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                  Status
                </label>
                <div className="relative border border-gray-200 rounded-xl bg-gray-50 overflow-hidden">
                  <select
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value as 'todo' | 'in_progress' | 'done' })}
                    className="w-full bg-transparent text-sm font-medium text-gray-800 px-4 py-3 appearance-none !outline-none !ring-0 !border-none cursor-pointer"
                  >
                    <option value="todo">To Do</option>
                    <option value="in_progress">In Progress</option>
                    <option value="done">Done</option>
                  </select>
                </div>
              </div>
              <div className="flex-1">
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                  Assignee
                </label>
                <div className="relative border border-gray-200 rounded-xl bg-gray-50 overflow-hidden">
                  <select
                    value={form.memberId}
                    onChange={(e) => setForm({ ...form, memberId: e.target.value })}
                    className="w-full bg-transparent text-sm font-medium text-gray-800 px-4 py-3 appearance-none !outline-none !ring-0 !border-none cursor-pointer"
                  >
                    <option value="">Unassigned</option>
                    {members.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 mt-6">
            <button
              onClick={onClose}
              className="flex-1 !bg-gray-100 !text-gray-600 !border-none !rounded-xl !text-xs !font-semibold hover:!bg-gray-200 !outline-none transition-colors"
              style={{ padding: '12px', fontSize: '12px' }}
            >
              Cancel
            </button>
            <button
              onClick={() => {
                if (form.title) {
                  // If unassigned is selected, pass undefined or exclude memberId
                  onSubmit(form);
                }
              }}
              className="flex-1 !bg-amber-500 !text-white !border-none !rounded-xl !text-xs !font-semibold hover:!bg-amber-600 !outline-none transition-colors"
              style={{ padding: '12px', fontSize: '12px' }}
            >
              {isEditing ? 'Save Changes' : 'Add Task'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const DeleteModal = ({
  isOpen,
  onClose,
  onConfirm,
  taskTitle,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  taskTitle: string;
}) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose}></div>
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm relative z-10 overflow-hidden">
        <div className="p-8 text-center">
          <div className="w-14 h-14 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mx-auto mb-5">
            <Trash2 className="w-7 h-7" />
          </div>
          <h3 className="text-lg font-bold text-gray-800 mb-1.5" style={{ margin: '0 0 6px 0' }}>
            Delete Task?
          </h3>
          <p className="text-sm text-gray-400 mb-6" style={{ margin: '0 0 24px 0' }}>
            Are you sure you want to delete <strong className="text-gray-600">{taskTitle}</strong>?
          </p>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 !bg-gray-100 !text-gray-600 !border-none !rounded-xl !text-xs !font-semibold hover:!bg-gray-200 !outline-none transition-colors"
              style={{ padding: '12px', fontSize: '12px' }}
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 !bg-red-500 !text-white !border-none !rounded-xl !text-xs !font-semibold hover:!bg-red-600 !outline-none transition-colors"
              style={{ padding: '12px', fontSize: '12px' }}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

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

  const columns: { id: Task['status']; label: string; icon: React.ReactNode; bg: string; border: string; text: string }[] = [
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
          {columns.map(col => {
            const colTasks = tasks.filter(t => t.status === col.id);
            return (
              <div key={col.id} className={`rounded-2xl border ${col.border} bg-white flex flex-col overflow-hidden max-h-[80vh]`}>
                {/* Column Header */}
                <div className={`px-4 py-3 flex items-center justify-between border-b ${col.border} ${col.bg}`}>
                  <div className={`flex items-center gap-2 font-bold ${col.text}`}>
                    {col.icon}
                    <span className="text-sm uppercase tracking-wider">{col.label}</span>
                  </div>
                  <div className={`text-xs font-bold px-2 py-0.5 rounded-full bg-white ${col.text} border ${col.border}`}>
                    {colTasks.length}
                  </div>
                </div>

                {/* Task List */}
                <div className="p-3 overflow-y-auto bg-gray-50/30 flex-1 min-h-[150px] space-y-3">
                  {colTasks.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-8 text-center text-gray-400">
                      <ListTodo className="w-8 h-8 mb-2 opacity-20" />
                      <p className="text-xs font-medium">No tasks here</p>
                    </div>
                  ) : (
                    colTasks.map(task => {
                      const assignee = getMemberDetails(task.memberId);
                      return (
                        <div key={task.id} className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm hover:border-violet-200 transition-colors group">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <h4 className="font-semibold text-gray-800 text-sm leading-tight group-hover:text-violet-600 transition-colors">
                              {task.title}
                            </h4>
                            <div className="flex items-center gap-1 opacity-100 lg:opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                              <button
                                onClick={() => setEditingTask(task)}
                                className="text-gray-400 hover:text-violet-600 bg-gray-50 hover:bg-violet-50 p-1 rounded-md transition-colors"
                              >
                                <Pencil className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => setDeletingTask(task)}
                                className="text-gray-400 hover:text-red-500 bg-gray-50 hover:bg-red-50 p-1 rounded-md transition-colors"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                          
                          {task.description && (
                            <p className="text-xs text-gray-500 mb-3 line-clamp-2">
                              {task.description}
                            </p>
                          )}

                          <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                            {/* Assignee */}
                            <div className="flex items-center gap-2">
                              {assignee ? (
                                <div className="flex items-center gap-1.5" title={assignee.name}>
                                  <div className="w-6 h-6 rounded-full bg-violet-100 flex items-center justify-center">
                                    <span className="text-[10px] font-bold text-violet-600">
                                      {assignee.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                                    </span>
                                  </div>
                                  <span className="text-xs font-medium text-gray-600 max-w-[80px] truncate">{assignee.name}</span>
                                </div>
                              ) : (
                                <div className="flex items-center gap-1.5 opacity-50">
                                  <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
                                    <UserIcon className="w-3 h-3 text-gray-400" />
                                  </div>
                                  <span className="text-xs font-medium text-gray-400">Unassigned</span>
                                </div>
                              )}
                            </div>

                            {/* Status Quick Moves */}
                            <div className="flex gap-1">
                              {task.status !== 'todo' && (
                                <button
                                  onClick={() => moveTaskMutation.mutate({ id: task.id, newStatus: 'todo' })}
                                  className="w-6 h-6 rounded border border-gray-200 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors"
                                  title="Move to To Do"
                                >
                                  <Circle className="w-3 h-3" />
                                </button>
                              )}
                              {task.status !== 'in_progress' && (
                                <button
                                  onClick={() => moveTaskMutation.mutate({ id: task.id, newStatus: 'in_progress' })}
                                  className="w-6 h-6 rounded border border-amber-200 flex items-center justify-center text-amber-500 hover:bg-amber-50 transition-colors"
                                  title="Move to In Progress"
                                >
                                  <Clock className="w-3 h-3" />
                                </button>
                              )}
                              {task.status !== 'done' && (
                                <button
                                  onClick={() => moveTaskMutation.mutate({ id: task.id, newStatus: 'done' })}
                                  className="w-6 h-6 rounded border border-emerald-200 flex items-center justify-center text-emerald-500 hover:bg-emerald-50 transition-colors"
                                  title="Move to Done"
                                >
                                  <CheckCircle2 className="w-3 h-3" />
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modals */}
      <TaskModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={(data) => createMutation.mutate(data)}
        isEditing={false}
        members={members}
      />

      <TaskModal
        isOpen={!!editingTask}
        onClose={() => setEditingTask(null)}
        onSubmit={(data) => {
          if (editingTask) updateMutation.mutate({ id: editingTask.id, data });
        }}
        initialData={editingTask}
        isEditing={true}
        members={members}
      />

      <DeleteModal
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
