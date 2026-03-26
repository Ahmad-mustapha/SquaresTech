import { Trash2 } from 'lucide-react';

const DeleteMemberModal = ({
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

export default DeleteMemberModal;
