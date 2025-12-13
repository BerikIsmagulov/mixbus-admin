// 📁 src/hooks/api/useUsers.ts
import { useState, useEffect } from 'react';
import apiClient from '../../api/client';

interface User {
  id: number;
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  // password и isAdmin исключены для простоты
}

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get('/users');
      setUsers(response.data);
      setError(null);
    } catch (err: any) {
      console.error('Error fetching users:', err);
      setError(err.response?.data?.error || 'Ошибка загрузки пользователей');
    } finally {
      setLoading(false);
    }
  };

  const createUser = async (userData: Omit<User, 'id'>) => {
    try {
      const response = await apiClient.post('/users', userData);
      return { success: true, data: response.data };
    } catch (err: any) {
      return {
        success: false,
        error: err.response?.data?.error || 'Ошибка создания пользователя'
      };
    }
  };

  const updateUser = async (id: number, userData: Partial<User>) => {
    try {
      const response = await apiClient.put(`/users/${id}`, userData);
      return { success: true, data: response.data };
    } catch (err: any) {
      return {
        success: false,
        error: err.response?.data?.error || 'Ошибка обновления пользователя'
      };
    }
  };

  const deleteUser = async (id: number) => {
    try {
      await apiClient.delete(`/users/${id}`);
      return { success: true };
    } catch (err: any) {
      return {
        success: false,
        error: err.response?.data?.error || 'Ошибка удаления пользователя'
      };
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    users,
    loading,
    error,
    fetchUsers,
    createUser,
    updateUser,
    deleteUser
  };
};
