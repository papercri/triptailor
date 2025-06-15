import { ReactNode } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
}

export default function Modal({ children, onClose }: ModalProps) {
  return (
    <div className="fixed inset-0 z-2000 flex items-center justify-center bg-black/60">
      <div className="relative bg-white w-full max-w-3xl mx-auto rounded-lg shadow-lg p-4 overflow-auto max-h-[90vh]">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-600 hover:text-black">
          <X />
        </button>
        {children}
      </div>
    </div>
  );
}
