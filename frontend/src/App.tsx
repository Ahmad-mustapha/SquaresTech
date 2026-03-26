import { Routes, Route, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import AppLayout from '@/components/layout/AppLayout';
import TeamMembers from '@/components/pages/TeamMembers';
import Tasks from '@/components/pages/Tasks';
import { apiRequest } from '@/lib/api';
import {
  TrendingUp,
  Users as UsersIcon,
  ArrowUpRight,
  Circle,
  Clock,
  CheckCircle2,
  ListTodo,
} from 'lucide-react';

interface Member { id: string; name: string; email: string; role: string }
interface Task   { id: string; title: string; description: string; status: 'todo' | 'in_progress' | 'done'; memberId?: string }

const Dashboard = () => {
  const { data: members = [] } = useQuery<Member[]>({
    queryKey: ['members'],
    queryFn: async () => {
      const res = await apiRequest('/members');
      return res.success ? res.data : [];
    },
  });

  const { data: tasks = [] } = useQuery<Task[]>({
    queryKey: ['tasks'],
    queryFn: async () => {
      const res = await apiRequest('/tasks');
      return res.success ? res.data : [];
    },
  });

  const todoCount       = tasks.filter(t => t.status === 'todo').length;
  const inProgressCount = tasks.filter(t => t.status === 'in_progress').length;
  const doneCount       = tasks.filter(t => t.status === 'done').length;
  const recentTasks     = [...tasks].slice(-5).reverse();

  return (
    <div className="space-y-6">
      {/* Stats Banner */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="flex flex-col md:flex-row">
          {/* Total Members */}
          <div className="flex-1 p-6 lg:p-8 flex items-center gap-5 border-b md:border-b-0 md:border-r border-gray-100">
            <div className="w-12 h-12 rounded-xl bg-violet-50 flex items-center justify-center flex-shrink-0">
              <UsersIcon className="w-6 h-6 text-violet-500" />
            </div>
            <div>
              <p className="text-xs text-gray-400 font-medium" style={{ margin: '0 0 4px 0' }}>Total Members</p>
              <p className="text-3xl font-extrabold text-gray-800 leading-none" style={{ margin: 0 }}>{members.length}</p>
              <div className="flex items-center gap-1 mt-2">
                <ArrowUpRight className="w-3 h-3 text-emerald-500" />
                <Link to="/members" className="text-[11px] text-emerald-500 font-medium no-underline hover:underline">
                  View all members
                </Link>
              </div>
            </div>
          </div>

          {/* Task stats */}
          <div className="flex-1 p-6 lg:p-8 flex items-center gap-5 relative overflow-hidden">
            <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center flex-shrink-0">
              <TrendingUp className="w-6 h-6 text-amber-500" />
            </div>
            <div>
              <p className="text-xs text-gray-400 font-medium" style={{ margin: '0 0 4px 0' }}>Total Tasks</p>
              <p className="text-3xl font-extrabold text-gray-800 leading-none" style={{ margin: 0 }}>{tasks.length}</p>
              <div className="flex items-center gap-3 mt-2">
                <span className="text-[11px] text-gray-500 font-medium">
                  <span className="text-amber-500 font-bold">{inProgressCount}</span> in progress
                </span>
                <span className="text-[11px] text-gray-500 font-medium">
                  <span className="text-emerald-500 font-bold">{doneCount}</span> done
                </span>
              </div>
            </div>

            {/* Decorative */}
            <div className="absolute right-0 top-0 bottom-0 w-32 hidden md:block opacity-40 pointer-events-none overflow-hidden">
              <svg viewBox="0 0 120 120" className="w-full h-full" preserveAspectRatio="none">
                <line x1="20" y1="0" x2="80" y2="120" stroke="#7C3AED" strokeWidth="3" />
                <line x1="35" y1="0" x2="95" y2="120" stroke="#EC4899" strokeWidth="2" />
                <line x1="50" y1="0" x2="110" y2="120" stroke="#F59E0B" strokeWidth="3" />
                <line x1="65" y1="0" x2="120" y2="100" stroke="#10B981" strokeWidth="2" />
                <line x1="0"  y1="20" x2="60"  y2="120" stroke="#8B5CF6" strokeWidth="2" />
                <circle cx="90" cy="30" r="4" fill="#7C3AED" opacity="0.5" />
                <circle cx="70" cy="80" r="3" fill="#EC4899" opacity="0.5" />
                <circle cx="100" cy="60" r="5" fill="#F59E0B" opacity="0.4" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Task breakdown + Recent tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Status Breakdown */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-4">
          <h3 className="text-base font-bold text-gray-800" style={{ margin: 0 }}>Task Overview</h3>
          <div className="space-y-3">
            {[
              { label: 'To Do',       count: todoCount,       icon: <Circle className="w-4 h-4" />,        color: 'text-gray-500',   bg: 'bg-gray-100',    bar: 'bg-gray-300' },
              { label: 'In Progress', count: inProgressCount, icon: <Clock className="w-4 h-4" />,         color: 'text-amber-600',  bg: 'bg-amber-50',    bar: 'bg-amber-400' },
              { label: 'Completed',   count: doneCount,       icon: <CheckCircle2 className="w-4 h-4" />,  color: 'text-emerald-600',bg: 'bg-emerald-50',  bar: 'bg-emerald-500' },
            ].map(s => (
              <div key={s.label}>
                <div className={`flex items-center justify-between p-3 rounded-xl ${s.bg}`}>
                  <div className={`flex items-center gap-2 text-sm font-semibold ${s.color}`}>
                    {s.icon}
                    <span>{s.label}</span>
                  </div>
                  <span className={`text-lg font-extrabold ${s.color}`}>{s.count}</span>
                </div>
                {tasks.length > 0 && (
                  <div className="mt-1.5 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${s.bar}`}
                      style={{ width: `${Math.round((s.count / tasks.length) * 100)}%` }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Recent Tasks */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-base font-bold text-gray-800" style={{ margin: 0 }}>Recent Tasks</h3>
            <Link
              to="/tasks"
              className="text-xs font-semibold text-violet-600 hover:text-violet-700 no-underline"
            >
              View all →
            </Link>
          </div>

          {recentTasks.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center text-gray-400">
              <ListTodo className="w-10 h-10 mb-2 opacity-20" />
              <p className="text-sm font-medium">No tasks yet — create one on the Task Board!</p>
            </div>
          ) : (
            <div className="space-y-2">
              {recentTasks.map(task => {
                const statusMap: Record<Task['status'], { label: string; classes: string; icon: React.ReactNode }> = {
                  todo:        { label: 'To Do',       classes: 'bg-gray-100 text-gray-600',    icon: <Circle className="w-3 h-3" /> },
                  in_progress: { label: 'In Progress', classes: 'bg-amber-100 text-amber-600',  icon: <Clock className="w-3 h-3" /> },
                  done:        { label: 'Done',         classes: 'bg-emerald-100 text-emerald-600', icon: <CheckCircle2 className="w-3 h-3" /> },
                };
                const s = statusMap[task.status];
                return (
                  <div key={task.id} className="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-gray-50 transition-colors group">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`w-2 h-2 rounded-full flex-shrink-0 ${task.status === 'done' ? 'bg-emerald-500' : task.status === 'in_progress' ? 'bg-amber-400' : 'bg-gray-300'}`} />
                      <p className="text-sm font-medium text-gray-800 truncate">{task.title}</p>
                    </div>
                    <span className={`flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-lg flex-shrink-0 ml-3 ${s.classes}`}>
                      {s.icon}
                      {s.label}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/"        element={<Dashboard />} />
        <Route path="/members" element={<TeamMembers />} />
        <Route path="/tasks"   element={<Tasks />} />
      </Routes>
    </AppLayout>
  );
}

export default App;
