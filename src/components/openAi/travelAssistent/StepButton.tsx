import React from 'react';

interface StepButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  selected?: boolean;
}

export default function StepButton({ icon, label, onClick, selected = false }: StepButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`p-3 rounded flex flex-col items-center border transition ${
        selected
          ? 'bg-blue-500 text-white border-blue-500'
          : 'bg-gray-100 hover:bg-blue-100 text-gray-800 border-gray-300'
      }`}
    >
      <div className="text-2xl">{icon}</div>
      <span className="text-sm mt-1">{label}</span>
    </button>
  );
}