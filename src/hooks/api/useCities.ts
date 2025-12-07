import { useState, useEffect } from 'react';
import { City } from '../../types';

// Тестовые данные
const testCities: City[] = [
  { id: 1, name: 'Алматы', nameKz: 'Алматы', timezone: 'Asia/Almaty' },
  { id: 4, name: 'Нур-Султан', nameKz: 'Нұр-Сұлтан', timezone: 'Asia/Almaty' },
  { id: 5, name: 'Шымкент', nameKz: 'Шымкент', timezone: 'Asia/Almaty' },
];

export const useCities = () => {
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCities = async () => {
    try {
      setLoading(true);
      // Имитация загрузки
      await new Promise(resolve => setTimeout(resolve, 500));
      setCities(testCities);
      setError(null);
    } catch (err) {
      setError('Ошибка загрузки городов');
    } finally {
      setLoading(false);
    }
  };

  const createCity = async (cityData: Omit<City, 'id'>) => {
    try {
      const newCity: City = {
        ...cityData,
        id: Math.max(0, ...cities.map(c => c.id)) + 1,
      };
      setCities([...cities, newCity]);
      return { success: true, data: newCity };
    } catch (err) {
      return { 
        success: false, 
        error: 'Ошибка создания города' 
      };
    }
  };

  const updateCity = async (id: number, cityData: Partial<City>) => {
    try {
      const updatedCities = cities.map(city =>
        city.id === id ? { ...city, ...cityData } : city
      );
      setCities(updatedCities);
      return { success: true, data: updatedCities.find(c => c.id === id) };
    } catch (err) {
      return { 
        success: false, 
        error: 'Ошибка обновления города' 
      };
    }
  };

  const deleteCity = async (id: number) => {
    try {
      const filteredCities = cities.filter(city => city.id !== id);
      setCities(filteredCities);
      return { success: true };
    } catch (err) {
      return { 
        success: false, 
        error: 'Ошибка удаления города' 
      };
    }
  };

  useEffect(() => {
    fetchCities();
  }, []);

  return {
    cities,
    loading,
    error,
    fetchCities,
    createCity,
    updateCity,
    deleteCity,
  };
};
