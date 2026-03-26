import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/api';
import {
  Users,
  Plus,
  Search,
} from 'lucide-react';
import DeleteMemberModal from './team-members/DeleteMemberModal';
import MemberList from './team-members/MemberList';
import MemberModal from './team-members/MemberModal';
import { getRoleBadgeClasses } from './team-members/roleBadge';
import type { Member, MemberFormData } from './team-members/types';

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
          <MemberList
            members={filtered}
            getRoleBadgeClasses={getRoleBadgeClasses}
            onEdit={(member) => setEditingMember(member)}
            onDelete={(member) => setDeletingMember(member)}
          />
        )}
      </div>

      <MemberModal
        key={isAddModalOpen ? 'add-open' : 'add-closed'}
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={(data) => createMutation.mutate(data)}
        isEditing={false}
      />

      <MemberModal
        key={editingMember?.id ?? 'edit-none'}
        isOpen={!!editingMember}
        onClose={() => setEditingMember(null)}
        onSubmit={(data) => {
          if (editingMember) updateMutation.mutate({ id: editingMember.id, data });
        }}
        initialData={editingMember}
        isEditing={true}
      />

      <DeleteMemberModal
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
