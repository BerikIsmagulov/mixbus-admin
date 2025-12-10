// 📁 src/components/common/StationsTable.tsx
import React from 'react';
import { Edit, Trash2 } from 'lucide-react';
import type { Station } from '../../types/index.ts';

interface Props {
  stations: Station[];
  onEdit: (station: Station) => void;
  onDelete: (id: number) => void;
  loading?: boolean;
}

const StationsTable: React.FC<Props> = ({ stations, onEdit, onDelete, loading = false }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h3 className="text-xl font-semibold mb-4">Список станций</h3>
      {stations.length === 0 ? (
        <p className="text-gray-500">Нет станций.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">#</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Название</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Адрес</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Город</th>
                <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">Действия</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {stations.map((station, index) => (
                <tr key={station.id}>
                  <td className="px-4 py-2 text-sm">{index + 1}</td>
                  <td className="px-4 py-2 text-sm font-medium">{station.name}</td>
                  <td className="px-4 py-2 text-sm">{station.address || '-'}</td>
                  <td className="px-4 py-2 text-sm">{station.city?.name || '-'}</td>
                  <td className="px-4 py-2 text-right space-x-2">
                    <button onClick={() => onEdit(station)} className="text-blue-600 hover:text-blue-800">
                      <Edit className="w-4 h-4 inline mr-1" /> Ред.
                    </button>
                    <button onClick={() => onDelete(station.id)} className="text-red-600 hover:text-red-800">
                      <Trash2 className="w-4 h-4 inline mr-1" /> Удал.
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default StationsTable;