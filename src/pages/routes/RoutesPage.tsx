// 📁 src/pages/routes/RoutesPage.tsx
import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useRoutes } from '../../hooks/api/useRoutes';
import { useCities } from '../../hooks/api/useCities';
import RouteModal from '../../components/common/RouteModal';
import RoutesTable from '../../components/common/RoutesTable';
import type { RouteFormData, Route } from '../../types';

const RoutesPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRoute, setEditingRoute] = useState<Route | null>(null);
  const { routes, createRoute, updateRoute, deleteRoute } = useRoutes();
  const { cities } = useCities();

  const handleSubmit = async (data: RouteFormData) => {
    if (editingRoute) {
      await updateRoute(editingRoute.id, data);
    } else {
      await createRoute(data);
    }
    setIsModalOpen(false);
    setEditingRoute(null);
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Маршруты</h1>
        <button
          onClick={() => {
            setEditingRoute(null);
            setIsModalOpen(true);
          }}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          <Plus className="h-4 w-4 mr-2" /> Добавить маршрут
        </button>
      </div>

      <RoutesTable
        routes={routes}
        onEdit={(route) => {
          setEditingRoute(route);
          setIsModalOpen(true);
        }}
        onDelete={deleteRoute}
      />

      <RouteModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingRoute(null);
        }}
        onSubmit={handleSubmit}
        route={editingRoute}
        cities={cities}
        title={editingRoute ? 'Редактировать маршрут' : 'Добавить маршрут'}
      />
    </div>
  );
};

export default RoutesPage;
