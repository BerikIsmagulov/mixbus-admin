import React from 'react';
import type { Bus as BusType } from '../../types';

interface BusesTableProps {
  buses: BusType[];
  onEdit: (bus: BusType) => void;
  onDelete: (id: number) => void;
  loading?: boolean;
}

const BusesTable: React.FC<BusesTableProps> = ({ buses, onEdit, onDelete, loading = false }) => {
  if (loading) return <div className="text-center py-10">Загрузка автобусов...</div>;

  return (
    <div className="bg-white shadow rounded-xl p-6">
      <h3 className="text-xl font-semibold mb-4">Список автобусов</h3>
      <table className="w-full table-auto border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-left">Номер</th>
            <th className="p-2 text-left">Модель</th>
            <th className="p-2 text-left">Мест</th>
            <th className="p-2 text-left">Удобства</th>
            <th className="p-2 text-left">Активен</th>
            <th className="p-2"></th>
          </tr>
        </thead>
        <tbody>
          {buses.map(bus => (
            <tr key={bus.id} className="border-t">
              <td className="p-2">{bus.numberPlate}</td>
              <td className="p-2">{bus.model}</td>
              <td className="p-2">{bus.totalSeats}</td>
              <td className="p-2">{bus.amenities.join(', ')}</td>
              <td className="p-2">{bus.isActive ? '✅' : '❌'}</td>
              <td className="p-2 space-x-2">
                <button onClick={() => onEdit(bus)} className="text-blue-600 hover:underline">Ред.</button>
                <button onClick={() => onDelete(bus.id)} className="text-red-600 hover:underline">Удалить</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BusesTable;
