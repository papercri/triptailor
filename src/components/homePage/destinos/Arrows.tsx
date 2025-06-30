
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const PrevArrow = ({ onClick }: { onClick?: () => void }) => (
  <button
    onClick={onClick}
    className="hidden md:block absolute z-10 left-[-15px] top-1/2 -translate-y-1/2 bg-gray-200 shadow p-2 rounded-full hover:bg-gray-100 opacity-75 hover:opacity-95"
  >
    <ChevronLeft className="w-5 h-5" />
  </button>
);

export const NextArrow = ({ onClick }: { onClick?: () => void }) => (
  <button
    onClick={onClick}
    className="hidden md:block absolute z-10 right-[-15px] top-1/2 -translate-y-1/2 bg-gray-200 shadow p-2 rounded-full hover:bg-gray-100 opacity-75 hover:opacity-95"
  >
    <ChevronRight className="w-5 h-5" />
  </button>
);
