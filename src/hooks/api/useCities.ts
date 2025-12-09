import { useState, useEffect } from 'react';
import apiClient from '../../api/client';
import { City } from '../../types';

export const useCities = () => {
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCities = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get('/cities');
      setCities(response.data);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Ошибка загрузки городов');
      console.error('Error fetching cities:', err);
    } finally {
      setLoading(false);
    }
  };

  const createCity = async (cityData: Omit<City, 'id'>) => {
    try {
      const response = await apiClient.post('/cities', cityData);
      await fetchCities(); // Обновляем список
      return { success: true, data: response.data };
    } catch (err: any) {
      return { 
        success: false, 
        error: err.response?.data?.error || 'Ошибка создания города' 
      };
    }
  };

  const updateCity = async (id: number, cityData: Partial<City>) => {
    try {
      const response = await apiClient.put(`/cities/${id}`, cityData);
      await fetchCities(); // Обновляем список
      return { success: true, data: response.data };
    } catch (err: any) {
      return { 
        success: false, 
        error: err.response?.data?.error || 'Ошибка обновления города' 
      };
    }
  };

  const deleteCity = async (id: number) => {
    try {
      await apiClient.delete(`/cities/${id}`);
      await fetchCities(); // Обновляем список
      return { success: true };
    } catch (err: any) {
      return { 
        success: false, 
        error: err.response?.data?.error || 'Ошибка удаления города' 
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
