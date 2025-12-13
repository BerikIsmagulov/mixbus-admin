// 📁 src/hooks/api/useBookings.ts
import { useState, useEffect } from 'react';
import apiClient from '../../api/client';
import type { Booking } from '../../types/index.ts';

export const useBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get('/bookings');
      setBookings(response.data);
      setError(null);
    } catch (err: any) {
      console.error('Error fetching bookings:', err);
      setError(err.response?.data?.error || 'Ошибка загрузки списка бронирований');
    } finally {
      setLoading(false);
    }
  };

  const createBooking = async (data: Omit<Booking, 'id' | 'createdAt' | 'updatedAt' | 'user' | 'trip'>) => {
    await apiClient.post('/bookings', data);
  };

  const updateBooking = async (
    id: number,
    data: Omit<Booking, 'id' | 'createdAt' | 'updatedAt' | 'user' | 'trip'>
  ) => {
    await apiClient.put(`/bookings/${id}`, data);
  };

  const deleteBooking = async (id: number) => {
    await apiClient.delete(`/bookings/${id}`);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return {
    bookings,
    loading,
    error,
    fetchBookings,
    createBooking,
    updateBooking,
    deleteBooking,
  };
};
