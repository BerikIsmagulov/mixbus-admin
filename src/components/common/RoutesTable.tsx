// 📁 src/components/common/RoutesTable.tsx
import React from 'react';
import type { Route } from '../../types';

interface RoutesTableProps {
  routes: Route[];
  onEdit: (route: Route) => void;
  onDelete: (id: number) => void;
  loading?: boolean;
}

const RoutesTable: React.FC<RoutesTableProps> = ({ routes, onEdit, onDelete, loading = false }) => {
  if (loading) return <div className="text-center py-10">Загрузка маршрутов...</div>;

  return (
    <div className="bg-white shadow rounded-xl p-6">
      <h3 className="text-xl font-semibold mb-4">Список маршрутов</h3>
      <table className="w-full table-auto border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-left">Откуда</th>
            <th className="p-2 text-left">Куда</th>
            <th className="p-2 text-left">Расстояние (км)</th>
            <th className="p-2 text-left">Время (мин)</th>
            <th className="p-2"></th>
          </tr>
        </thead>
        <tbody>
          {routes.map(route => (
            <tr key={route.id} className="border-t">
              <td className="p-2">{route.departureCity?.name || '—'}</td>
              <td className="p-2">{route.arrivalCity?.name || '—'}</td>
              <td className="p-2">{route.distance}</td>
              <td className="p-2">{route.estimatedDuration}</td>
              <td className="p-2 space-x-2">
                <button onClick={() => onEdit(route)} className="text-blue-600 hover:underline">Ред.</button>
                <button onClick={() => onDelete(route.id)} className="text-red-600 hover:underline">Удалить</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RoutesTable;