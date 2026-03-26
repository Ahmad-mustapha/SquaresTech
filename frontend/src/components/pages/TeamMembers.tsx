import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/api';
import {
  Users,
  Plus,
  Pencil,
  Trash2,
  X,
  Mail,
  Briefcase,
  Search,
  User,
} from 'lucide-react';

interface Member {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface MemberFormData {
  name: string;
  email: string;
  role: string;
}

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

  React.useEffect(() => {
    if (initialData) {
      setForm({ name: initialData.name, email: initialData.email, role: initialData.role });
    } else {
      setForm({ name: '', email: '', role: '' });
    }
  }, [initialData, isOpen]);

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

const DeleteModal = ({
  isOpen,
  onClose,
  onConfirm,
  memberName,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  memberName: string;
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
            Delete Member?
          </h3>
          <p className="text-sm text-gray-400 mb-6" style={{ margin: '0 0 24px 0' }}>
            Are you sure you want to remove <strong className="text-gray-600">{memberName}</strong> from the team?
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

const getRoleBadgeClasses = (role: string) => {
  const r = role.toLowerCase();
  if (r.includes('frontend')) return 'bg-blue-50 text-blue-600';
  if (r.includes('backend')) return 'bg-emerald-50 text-emerald-600';
  if (r.includes('full stack') || r.includes('fullstack')) return 'bg-violet-50 text-violet-600';
  if (r.includes('design')) return 'bg-pink-50 text-pink-600';
  if (r.includes('devops') || r.includes('infra')) return 'bg-amber-50 text-amber-600';
  if (r.includes('manager') || r.includes('lead')) return 'bg-indigo-50 text-indigo-600';
  return 'bg-gray-50 text-gray-600';
};

export default function TeamMembers() {
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<Member | null>(null);
  const [deletingMember, setDeletingMember] = useState<Member | null>(null);

  const { data, isLoading, error } = useQuery({
    queryKey: ['members'],
    queryFn: async () => {
      const res = await apiRequest('/members');
      if (!res.success) throw new Error(res.message);
      return res.data as Member[];
    },
  });

  const createMutation = useMutation({
    mutationFn: async (newMember: MemberFormData) => {
      const res = await apiRequest('/members', { method: 'POST', data: newMember });
      if (!res.success) throw new Error(res.message);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['members'] });
      setIsAddModalOpen(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data: memberData }: { id: string; data: MemberFormData }) => {
      const res = await apiRequest(`/members/${id}`, { method: 'PUT', data: memberData });
      if (!res.success) throw new Error(res.message);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['members'] });
      setEditingMember(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await apiRequest(`/members/${id}`, { method: 'DELETE' });
      if (!res.success) throw new Error(res.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['members'] });
      setDeletingMember(null);
    },
  });

  const members = data || [];
  const filtered = members.filter(
    (m) =>
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-gray-800" style={{ margin: 0, fontSize: '1.25rem', lineHeight: '1.4' }}>
            Team Members
          </h1>
          <p className="text-xs text-gray-400 mt-0.5" style={{ margin: '2px 0 0 0' }}>
            {members.length} member{members.length !== 1 ? 's' : ''} in the team
          </p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="!bg-violet-600 !text-white !border-none !rounded-xl !text-xs !font-semibold hover:!bg-violet-700 !outline-none transition-colors flex items-center gap-2 self-start"
          style={{ padding: '10px 20px', fontSize: '12px' }}
        >
          <Plus className="w-4 h-4" />
          Add Member
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-50">
          <div className="flex items-center gap-3 bg-gray-50 px-4 py-2.5 rounded-xl max-w-sm">
            <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <input
              type="text"
              placeholder="Search members..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent text-sm font-medium text-gray-700 w-full placeholder:text-gray-400 !outline-none !ring-0 !border-none"
              style={{ outline: 'none', boxShadow: 'none' }}
            />
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-4 border-violet-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-sm text-red-400 font-medium" style={{ margin: 0 }}>
              Failed to load members. Is the backend running?
            </p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <Users className="w-10 h-10 text-gray-200 mx-auto mb-3" />
            <p className="text-sm text-gray-400 font-medium" style={{ margin: 0 }}>
              {searchQuery ? 'No members match your search.' : 'No team members yet. Add your first one!'}
            </p>
          </div>
        ) : (
          <>
            <div className="hidden md:block">
              <table className="w-full" style={{ borderCollapse: 'collapse' }}>
                <thead>
                  <tr className="border-b border-gray-50">
                    <th className="text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wider px-5 py-3">Name</th>
                    <th className="text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wider px-5 py-3">Email</th>
                    <th className="text-left text-[11px] font-semibold text-gray-400 uppercase tracking-wider px-5 py-3">Role</th>
                    <th className="text-right text-[11px] font-semibold text-gray-400 uppercase tracking-wider px-5 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((member) => (
                    <tr key={member.id} className="border-b border-gray-50 last:border-b-0 hover:bg-gray-50/50 transition-colors">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-violet-100 flex items-center justify-center flex-shrink-0">
                            <span className="text-xs font-bold text-violet-600">
                              {member.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                            </span>
                          </div>
                          <span className="text-sm font-semibold text-gray-800">{member.name}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-sm text-gray-500">{member.email}</td>
                      <td className="px-5 py-4">
                        <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-lg ${getRoleBadgeClasses(member.role)}`}>
                          {member.role}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => setEditingMember(member)}
                            className="!bg-transparent !border-none !p-2 !rounded-lg text-gray-400 hover:text-violet-600 hover:!bg-violet-50 !outline-none transition-colors"
                            style={{ fontSize: 'inherit' }}
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setDeletingMember(member)}
                            className="!bg-transparent !border-none !p-2 !rounded-lg text-gray-400 hover:text-red-500 hover:!bg-red-50 !outline-none transition-colors"
                            style={{ fontSize: 'inherit' }}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="md:hidden divide-y divide-gray-50">
              {filtered.map((member) => (
                <div key={member.id} className="p-4 flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-violet-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-violet-600">
                      {member.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-800 truncate" style={{ margin: 0 }}>{member.name}</p>
                    <p className="text-xs text-gray-400 truncate mt-0.5" style={{ margin: '2px 0 0 0' }}>{member.email}</p>
                    <span className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded-md mt-1.5 ${getRoleBadgeClasses(member.role)}`}>
                      {member.role}
                    </span>
                  </div>
                  <div className="flex gap-1 flex-shrink-0">
                    <button
                      onClick={() => setEditingMember(member)}
                      className="!bg-transparent !border-none !p-1.5 !rounded-md text-gray-400 hover:text-violet-600 !outline-none"
                      style={{ fontSize: 'inherit' }}
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setDeletingMember(member)}
                      className="!bg-transparent !border-none !p-1.5 !rounded-md text-gray-400 hover:text-red-500 !outline-none"
                      style={{ fontSize: 'inherit' }}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <MemberModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={(data) => createMutation.mutate(data)}
        isEditing={false}
      />

      <MemberModal
        isOpen={!!editingMember}
        onClose={() => setEditingMember(null)}
        onSubmit={(data) => {
          if (editingMember) updateMutation.mutate({ id: editingMember.id, data });
        }}
        initialData={editingMember}
        isEditing={true}
      />

      <DeleteModal
        isOpen={!!deletingMember}
        onClose={() => setDeletingMember(null)}
        onConfirm={() => {
          if (deletingMember) deleteMutation.mutate(deletingMember.id);
        }}
        memberName={deletingMember?.name || ''}
      />
    </div>
  );
}
