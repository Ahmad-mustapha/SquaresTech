import { useState } from 'react';
import { Briefcase, Mail, User, X } from 'lucide-react';
import type { Member, MemberFormData } from './types';

const MemberModal = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isEditing,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: MemberFormData) => void;
  initialData?: Member | null;
  isEditing: boolean;
}) => {
  const [form, setForm] = useState<MemberFormData>({
    name: initialData?.name || '',
    email: initialData?.email || '',
    role: initialData?.role || '',
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose}></div>
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md relative z-10 overflow-hidden">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-gray-800" style={{ margin: 0 }}>
              {isEditing ? 'Edit Member' : 'Add New Member'}
            </h3>
            <button
              onClick={onClose}
              className="!bg-gray-100 !border-none !p-2 !rounded-lg text-gray-400 hover:text-gray-600 hover:!bg-gray-200 !outline-none"
              style={{ fontSize: 'inherit' }}
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                Full Name
              </label>
              <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3">
                <User className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="e.g. John Doe"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="bg-transparent text-sm font-medium text-gray-800 w-full placeholder:text-gray-400 !outline-none !ring-0 !border-none"
                  style={{ outline: 'none', boxShadow: 'none' }}
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3">
                <Mail className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <input
                  type="email"
                  placeholder="e.g. john@squarestech.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="bg-transparent text-sm font-medium text-gray-800 w-full placeholder:text-gray-400 !outline-none !ring-0 !border-none"
                  style={{ outline: 'none', boxShadow: 'none' }}
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                Role
              </label>
              <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3">
                <Briefcase className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="e.g. Frontend Developer"
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  className="bg-transparent text-sm font-medium text-gray-800 w-full placeholder:text-gray-400 !outline-none !ring-0 !border-none"
                  style={{ outline: 'none', boxShadow: 'none' }}
                />
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
                if (form.name && form.email && form.role) {
                  onSubmit(form);
                }
              }}
              className="flex-1 !bg-violet-600 !text-white !border-none !rounded-xl !text-xs !font-semibold hover:!bg-violet-700 !outline-none transition-colors"
              style={{ padding: '12px', fontSize: '12px' }}
            >
              {isEditing ? 'Save Changes' : 'Add Member'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberModal;
