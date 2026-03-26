import { ListTodo } from 'lucide-react';
import TaskCard from './TaskCard';
import type { Member, Task, TaskColumnDef } from './types';

const TaskColumn = ({
  column,
  tasks,
  getMemberDetails,
  onEdit,
  onDelete,
  onMove,
}: {
  column: TaskColumnDef;
  tasks: Task[];
  getMemberDetails: (memberId?: string) => Member | undefined;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
  onMove: (id: string, newStatus: Task['status']) => void;
}) => {
  return (
    <div className={`rounded-2xl border ${column.border} bg-white flex flex-col overflow-hidden max-h-[80vh]`}>
      <div className={`px-4 py-3 flex items-center justify-between border-b ${column.border} ${column.bg}`}>
        <div className={`flex items-center gap-2 font-bold ${column.text}`}>
          {column.icon}
          <span className="text-sm uppercase tracking-wider">{column.label}</span>
        </div>
        <div className={`text-xs font-bold px-2 py-0.5 rounded-full bg-white ${column.text} border ${column.border}`}>
          {tasks.length}
        </div>
      </div>

      <div className="p-3 overflow-y-auto bg-gray-50/30 flex-1 min-h-[150px] space-y-3">
        {tasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center text-gray-400">
            <ListTodo className="w-8 h-8 mb-2 opacity-20" />
            <p className="text-xs font-medium">No tasks here</p>
          </div>
        ) : (
          tasks.map((task) => {
            const assignee = getMemberDetails(task.memberId);
            return (
              <TaskCard
                key={task.id}
                task={task}
                assignee={assignee}
                onEdit={onEdit}
                onDelete={onDelete}
                onMove={onMove}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default TaskColumn;
