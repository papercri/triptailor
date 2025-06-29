
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const PrevArrow = ({ onClick }: { onClick?: () => void }) => (
  <button
    onClick={onClick}
    className="hidden md:block absolute z-10 left-0 top-1/2 -translate-y-1/2 bg-white shadow p-2 rounded-full hover:bg-gray-100"
  >
    <ChevronLeft className="w-5 h-5" />
  </button>
);

export const NextArrow = ({ onClick }: { onClick?: () => void }) => (
  <button
    onClick={onClick}
    className="hidden md:block absolute z-10 right-0 top-1/2 -translate-y-1/2 bg-white shadow p-2 rounded-full hover:bg-gray-100"
  >
    <ChevronRight className="w-5 h-5" />
  </button>
);
