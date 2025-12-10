// 📁 src/hooks/api/useStations.ts
import { useState, useEffect } from 'react';
import apiClient from '../../api/client';
import type { Station } from '../../types/index.ts';

export const useStations = () => {
  const [stations, setStations] = useState<Station[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStations = async () => {
    try {
      setLoading(true);
      const res = await apiClient.get('/stations');
      setStations(res.data);
      setError(null);
    } catch (err: any) {
      console.error('Ошибка загрузки станций:', err);
      setError(err.response?.data?.error || 'Ошибка');
    } finally {
      setLoading(false);
    }
  };

  const createStation = async (data: Omit<Station, 'id' | 'createdAt' | 'updatedAt' | 'city'>) => {
    try {
      const res = await apiClient.post('/stations', data);
      return { success: true, data: res.data };
    } catch (err: any) {
      return { success: false, error: err.response?.data?.error || 'Ошибка создания' };
    }
  };

  const updateStation = async (id: number, data: Partial<Station>) => {
    try {
      const res = await apiClient.put(`/stations/${id}`, data);
      return { success: true, data: res.data };
    } catch (err: any) {
      return { success: false, error: err.response?.data?.error || 'Ошибка обновления' };
    }
  };

  const deleteStation = async (id: number) => {
    try {
      await apiClient.delete(`/stations/${id}`);
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.response?.data?.error || 'Ошибка удаления' };
    }
  };

  useEffect(() => {
    fetchStations();
  }, []);

  return {
    stations,
    loading,
    error,
    fetchStations,
    createStation,
    updateStation,
    deleteStation,
  };
};