// 📁 src/components/common/TripsTable.tsx
import React from 'react';
import type { Trip } from '../../types';
import { format } from 'date-fns';

interface TripsTableProps {
  trips: Trip[];
  onEdit: (trip: Trip) => void;
  onDelete: (id: number) => void;
  loading?: boolean;
}

const TripsTable: React.FC<TripsTableProps> = ({ trips, onEdit, onDelete, loading = false }) => {
  if (loading) return <div className="text-center py-10">Загрузка рейсов...</div>;


const statusLabels: Record<Trip['status'], string> = {
  SCHEDULED: 'Запланирован',
  DELAYED: 'Задержан',
  CANCELLED: 'Отменен',
  COMPLETED: 'Завершен'
};

  return (
    <div className="bg-white shadow rounded-xl p-6">
      <h3 className="text-xl font-semibold mb-4">Список рейсов</h3>
      <table className="w-full table-auto border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-left">Маршрут</th>
            <th className="p-2 text-left">Автобус</th>
            <th className="p-2 text-left">Отправление</th>
            <th className="p-2 text-left">Прибытие</th>
            <th className="p-2 text-left">Цена</th>
            <th className="p-2 text-left">Доступно мест</th>
            <th className="p-2 text-left">Статус</th>
            <th className="p-2"></th>
          </tr>
        </thead>
        <tbody>
          {trips.map(trip => (
            <tr key={trip.id} className="border-t">
              <td className="p-2">
                {trip.route?.departureCity?.name} → {trip.route?.arrivalCity?.name}
              </td>
              <td className="p-2">{trip.bus?.numberPlate}</td>
              <td className="p-2">{format(new Date(trip.departureTime), 'dd.MM.yyyy HH:mm')}</td>
              <td className="p-2">{format(new Date(trip.arrivalTime), 'dd.MM.yyyy HH:mm')}</td>
              <td className="p-2">{trip.price} ₸</td>
              <td className="p-2">{trip.availableSeatsCount}</td>
              <td className="p-2">{statusLabels[trip.status]}</td>
              <td className="p-2 space-x-2">
                <button onClick={() => onEdit(trip)} className="text-blue-600 hover:underline">Ред.</button>
                <button onClick={() => onDelete(trip.id)} className="text-red-600 hover:underline">Удалить</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TripsTable;
