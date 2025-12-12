// 📁 src/hooks/api/useTrips.ts
import { useEffect, useState } from 'react';
import apiClient from '../../api/client';
import type { Trip } from '../../types';

export const useTrips = () => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTrips = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get('/trips');
      setTrips(response.data);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Ошибка загрузки рейсов');
    } finally {
      setLoading(false);
    }
  };

  const createTrip = async (
    data: Omit<Trip, 'id' | 'createdAt' | 'updatedAt' | 'route' | 'bus'>
  ): Promise<{ success: boolean; error?: any }> => {
    try {
      await apiClient.post('/trips', data);
      await fetchTrips();
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.response?.data?.error || 'Ошибка создания рейса' };
    }
  };

  const updateTrip = async (
    id: number,
    data: Partial<Trip>
  ): Promise<{ success: boolean; error?: any }> => {
    try {
      await apiClient.put(`/trips/${id}`, data);
      await fetchTrips();
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.response?.data?.error || 'Ошибка обновления рейса' };
    }
  };

  const deleteTrip = async (id: number): Promise<{ success: boolean; error?: any }> => {
    try {
      await apiClient.delete(`/trips/${id}`);
      await fetchTrips();
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err.response?.data?.error || 'Ошибка удаления рейса' };
    }
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  return {
    trips,
    loading,
    error,
    fetchTrips,
    createTrip,
    updateTrip,
    deleteTrip
  };
};
