import { ArrowLeft, ArrowRight, Pencil, Trash2, User as UserIcon } from 'lucide-react';
import type { Member, Task } from './types';

const TaskCard = ({
  task,
  assignee,
  onEdit,
  onDelete,
  onMove,
}: {
  task: Task;
  assignee?: Member;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
  onMove: (id: string, newStatus: Task['status']) => void;
}) => {
  const getMoveIcon = (target: Task['status']) => {
    const order: Task['status'][] = ['todo', 'in_progress', 'done'];
    const fromIndex = order.indexOf(task.status);
    const toIndex = order.indexOf(target);
    return toIndex < fromIndex ? ArrowLeft : ArrowRight;
  };

  return (
    <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
      <div className="flex items-start justify-between gap-2 mb-2">
        <h4 className="font-semibold text-gray-800 text-sm leading-tight">
          {task.title}
        </h4>
        <div className="flex items-center gap-1 flex-shrink-0">
          <button
            onClick={() => onEdit(task)}
            className="text-gray-500 !bg-white p-1 rounded-md border border-gray-100"
          >
            <Pencil className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onDelete(task)}
            className="text-gray-500 !bg-white p-1 rounded-md border border-gray-100"
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

        <div className="flex items-center gap-1">
          {task.status !== 'todo' && (
            <button
              onClick={() => onMove(task.id, 'todo')}
              className="rounded border flex items-center justify-center"
              style={{ backgroundColor: '#7c3aed', borderColor: '#6d28d9', color: '#ffffff' }}
              title="Move to To Do"
            >
              {(() => {
                const Icon = getMoveIcon('todo');
                return <Icon className="w-3.5 h-3.5" />;
              })()}
            </button>
          )}
          {task.status !== 'in_progress' && (
            <button
              onClick={() => onMove(task.id, 'in_progress')}
              className="rounded border flex items-center justify-center"
              style={{ backgroundColor: '#7c3aed', borderColor: '#6d28d9', color: '#ffffff' }}
              title="Move to In Progress"
            >
              {(() => {
                const Icon = getMoveIcon('in_progress');
                return <Icon className="w-3.5 h-3.5" />;
              })()}
            </button>
          )}
          {task.status !== 'done' && (
            <button
              onClick={() => onMove(task.id, 'done')}
              className="rounded border flex items-center justify-center"
              style={{ backgroundColor: '#7c3aed', borderColor: '#6d28d9', color: '#ffffff' }}
              title="Move to Done"
            >
              {(() => {
                const Icon = getMoveIcon('done');
                return <Icon className="w-3.5 h-3.5" />;
              })()}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
