// 📁 src/components/common/BookingsTable.tsx
import React from 'react';
import { Edit, Trash2 } from 'lucide-react';
import type { Booking } from '../../types/index.ts';

interface BookingsTableProps {
  bookings: Booking[];
  onEdit: (booking: Booking) => void;
  onDelete: (id: number) => void;
  loading?: boolean;
}

const BookingsTable: React.FC<BookingsTableProps> = ({ bookings, onEdit, onDelete, loading = false }) => {
  if (loading) {
    // Индикатор загрузки (анимация)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h3 className="text-xl font-semibold mb-4">Список бронирований</h3>
      {bookings.length === 0 ? (
        <p className="text-gray-500">Нет доступных бронирований.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">#</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Маршрут</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Дата и время</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Автобус</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Пользователь</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Места</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Статус</th>
                <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">Действия</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {bookings.map((booking, index) => (
                <tr key={booking.id}>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">{index + 1}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">
                    {booking.trip.route.departureCity.name} &#8594; {booking.trip.route.arrivalCity.name}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">
                    {new Date(booking.trip.departureTime).toLocaleString('ru-RU', { dateStyle: 'short', timeStyle: 'short' })}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">
                    {/* Предполагаем, что у автобуса есть название или номер */}
                    {booking.trip.bus.numberPlate || booking.trip.bus.model || `Автобус ${booking.trip.bus.id}`}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">
                    {booking.user 
                      ? `${booking.user.firstName} ${booking.user.lastName} (${booking.user.email})` 
                      : booking.userId}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">
                    {booking.seatNumbers.join(', ')}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm">
                    {booking.status === 'PENDING' ? 'В ожидании'
                      : booking.status === 'CONFIRMED' ? 'Подтверждено'
                      : booking.status === 'CANCELLED' ? 'Отменено'
                      : booking.status}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-right space-x-2">
                    <button 
                      onClick={() => onEdit(booking)} 
                      className="inline-flex items-center px-2 py-1 text-sm text-blue-600 hover:text-blue-800"
                    >
                      <Edit className="w-4 h-4 mr-1" /> Ред.
                    </button>
                    <button 
                      onClick={() => onDelete(booking.id)} 
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

export default BookingsTable;
