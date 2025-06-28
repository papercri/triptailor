'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function useDestinationSearch() {
  const [place, setPlace] = useState('');
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlace(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!place.trim()) return;
    router.push(`/destination/${encodeURIComponent(place)}`);
  };

  return {
    place,
    handleChange,
    handleSubmit,
  };
}
