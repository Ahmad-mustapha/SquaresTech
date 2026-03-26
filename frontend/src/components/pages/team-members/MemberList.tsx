import { Pencil, Trash2 } from 'lucide-react';
import type { Member } from './types';

const MemberList = ({
  members,
  getRoleBadgeClasses,
  onEdit,
  onDelete,
}: {
  members: Member[];
  getRoleBadgeClasses: (role: string) => string;
  onEdit: (member: Member) => void;
  onDelete: (member: Member) => void;
}) => {
  return (
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
            {members.map((member) => (
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
                      onClick={() => onEdit(member)}
                      className="!bg-white/70 !border-none !p-2 !rounded-lg text-gray-400 hover:text-violet-600 hover:!bg-violet-50/60 !outline-none transition-colors"
                      style={{ fontSize: 'inherit' }}
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDelete(member)}
                      className="!bg-white/70 !border-none !p-2 !rounded-lg text-gray-400 hover:text-red-500 hover:!bg-red-50/60 !outline-none transition-colors"
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
        {members.map((member) => (
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
                onClick={() => onEdit(member)}
                className="bg-purple-500 !p-1.5 !rounded-md text-gray-400 hover:text-violet-600 hover:!bg-violet-50/60 !outline-none"
                style={{ fontSize: 'inherit' }}
              >
                <Pencil className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => onDelete(member)}
                className="bgp !p-1.5 !rounded-md text-gray-400 hover:text-red-500 hover:!bg-red-50/60 !outline-none"
                style={{ fontSize: 'inherit' }}
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default MemberList;
