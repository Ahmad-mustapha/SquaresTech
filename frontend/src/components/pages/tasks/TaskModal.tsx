import { useState } from 'react';
import { AlignLeft, Type, X } from 'lucide-react';
import type { Member, Task, TaskFormData } from './types';

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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose}></div>
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md relative z-10 overflow-hidden">
        <div className="p-6">
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
                    onChange={(e) => setForm({ ...form, status: e.target.value as Task['status'] })}
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

export default TaskModal;
