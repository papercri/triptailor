import { useEffect, useState } from 'react';
import { ref, get } from 'firebase/database';
import { database } from '@/services/firebaseConfig';

export interface City {
  id: number;
  name: string;
  slug: string;
}

export const useCities = () => {
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const snapshot = await get(ref(database, 'cities'));
        if (snapshot.exists()) {
          const data = snapshot.val();
          const cityArray = Object.values(data) as City[];
          setCities(cityArray);
        }
      } catch (error) {
        console.error('Error fetching cities:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCities();
  }, []);

  return { cities, loading };
};
