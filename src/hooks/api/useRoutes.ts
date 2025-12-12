// 📁 src/hooks/api/useRoutes.ts
import { useState, useEffect } from 'react';
import apiClient from '../../api/client';
import type { Route, RouteFormData } from '../../types';

export const useRoutes = () => {
  const [routes, setRoutes] = useState<Route[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRoutes = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get('/routes');
      setRoutes(response.data);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Ошибка загрузки маршрутов');
    } finally {
      setLoading(false);
    }
  };

  const createRoute = async (routeData: RouteFormData) => {
    const response = await apiClient.post('/routes', routeData);
    await fetchRoutes();
    return response;
  };

  const updateRoute = async (id: number, routeData: RouteFormData) => {
    const response = await apiClient.put(`/routes/${id}`, routeData);
    await fetchRoutes();
    return response;
  };

  const deleteRoute = async (id: number) => {
    await apiClient.delete(`/routes/${id}`);
    await fetchRoutes();
  };

  useEffect(() => {
    fetchRoutes();
  }, []);

  return {
    routes,
    loading,
    error,
    fetchRoutes,
    createRoute,
    updateRoute,
    deleteRoute
  };
};
