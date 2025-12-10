// 📁 src/components/common/CitiesTable.tsx
import React from 'react';
import { Edit, Trash2 } from 'lucide-react';

interface City {
  id: number;
  name: string;
  nameKz?: string;
  timezone: string;
}

interface CitiesTableProps {
  cities: City[];
  onEdit: (city: City) => void;
  onDelete: (id: number) => void;
  loading?: boolean;
}

const CitiesTable: React.FC<CitiesTableProps> = ({ 
  cities, 
  onEdit, 
  onDelete,
  loading = false 
}) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h3 className="text-xl font-semibold mb-4">Список городов</h3>
      {cities.length === 0 ? (
        <p className="text-gray-500">Нет доступных городов.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">#</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Название</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Название (KZ)</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Часовой пояс</th>
                <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">Действия</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {cities.map((city, index) => (
                <tr key={city.id}>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">{index + 1}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm font-medium">{city.name}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">{city.nameKz || '-'}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">{city.timezone}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-right space-x-2">
                    <button
                      onClick={() => onEdit(city)}
                      className="inline-flex items-center px-2 py-1 text-sm text-blue-600 hover:text-blue-800"
                    >
                      <Edit className="w-4 h-4 mr-1" /> Ред.
                    </button>
                    <button
                      onClick={() => onDelete(city.id)}
                      className="inline-flex items-center px-2 py-1 text-sm text-red-600 hover:text-red-800"
                    >
                      <Trash2 className="w-4 h-4 mr-1" /> Удал.
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

export default CitiesTable;