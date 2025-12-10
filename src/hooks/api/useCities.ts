// 📁 src/hooks/api/useCities.ts
import { useState, useEffect } from 'react';
import apiClient from '../../api/client';
import type { City } from '../../types/index.ts';

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
      return { success: true, data: response.data };
    } catch (err: any) {
      return { 
        success: false, 
        error: err.response?.data?.error || 'Ошибка создания города' 
      };
    }
  };

  const createCitiesBulk = async (cities: Omit<City, 'id'>[]) => {
    try {
      const response = await apiClient.post('/cities/bulk', cities);
      return { success: true, count: response.data.count };
    } catch (err: any) {
      return {
        success: false,
        error: err.response?.data?.error || 'Ошибка массовой загрузки'
      };
    }
  };

  const updateCity = async (id: number, cityData: Partial<City>) => {
    try {
      const response = await apiClient.put(`/cities/${id}`, cityData);
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
    createCitiesBulk,
    updateCity,
    deleteCity,
  };
};
