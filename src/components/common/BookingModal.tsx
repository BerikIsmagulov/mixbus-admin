// 📁 src/components/common/BookingModal.tsx
import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import type { Booking, Trip, User } from '../../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (
    data: Omit<Booking, 'id' | 'createdAt' | 'updatedAt' | 'user' | 'trip'>
  ) => Promise<void>;
  booking?: Booking | null;
  trips: Trip[];
  users: User[];
  title: string;
}

const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  booking,
  trips,
  users,
  title
}) => {
  const [formData, setFormData] = useState<Omit<
    Booking,
    'id' | 'createdAt' | 'updatedAt' | 'user' | 'trip'
  > | null>(null);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (booking) {
      setFormData({
        userId: booking.userId,
        tripId: booking.tripId,
        seatNumbers: booking.seatNumbers,
        totalPrice: booking.totalPrice,
        status: booking.status,
        passengerName: booking.passengerName || '',
        passengerEmail: booking.passengerEmail || '',
        passengerPhone: booking.passengerPhone || ''
      });
    } else if (users.length > 0 && trips.length > 0) {
      setFormData({
        userId: users[0].id,
        tripId: trips[0].id,
        seatNumbers: [],
        totalPrice: 0,
        status: 'PENDING',
        passengerName: '',
        passengerEmail: '',
        passengerPhone: ''
      });
    } else {
      setFormData(null); // Ждём данные
    }
  }, [booking, users, trips]);

  if (!isOpen) return null;

  if (!formData) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl shadow-xl p-6">
          <p className="text-center">Загрузка данных...</p>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    try {
      await onSubmit(formData);
      onClose();
    } catch (err: any) {
      console.error('Ошибка при сохранении бронирования:', err);
      if (err.response?.data?.invalidSeats) {
        const invalid = err.response.data.invalidSeats.join(', ');
        const valid = err.response.data.validSeats.join(', ');
        setErrorMessage(`Некорректные места: ${invalid}. Допустимые: ${valid}`);
      } else if (err.response?.data?.error) {
        setErrorMessage(err.response.data.error);
      } else {
        setErrorMessage('Не удалось сохранить бронирование.');
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl mx-4">
        <div className="px-6 py-4 border-b flex justify-between items-center">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button onClick={onClose}><X /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {errorMessage && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded">
              {errorMessage}
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 font-medium">Пользователь</label>
              <select
                value={formData.userId}
                onChange={e => setFormData({ ...formData, userId: Number(e.target.value) })}
                className="input w-full border rounded-lg px-3 py-2"
              >
                {users.map(user => (
                  <option key={user.id} value={user.id}>
                    {user.firstName || ''} {user.lastName || ''} ({user.email})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block mb-1 font-medium">Рейс</label>
              <select
                value={formData.tripId}
                onChange={e => setFormData({ ...formData, tripId: Number(e.target.value) })}
                className="input w-full border rounded-lg px-3 py-2"
              >
                {trips.map(trip => {
                  if (!trip.route || !trip.route.departureCity || !trip.route.arrivalCity) return null;
                  return (
                    <option key={trip.id} value={trip.id}>
                      {trip.route.departureCity.name} ➔ {trip.route.arrivalCity.name} — {trip.departureTime}
                    </option>
                  );
                })}
              </select>
            </div>
            <div>
              <label className="block mb-1 font-medium">Места (через запятую)</label>
              <input
                type="text"
                value={formData.seatNumbers.join(',')}
                onChange={e =>
                  setFormData({ ...formData, seatNumbers: e.target.value.split(',').map(s => s.trim()) })
                }
                className="input w-full border rounded-lg px-3 py-2"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Сумма</label>
              <input
                type="number"
                value={formData.totalPrice}
                onChange={e => setFormData({ ...formData, totalPrice: +e.target.value })}
                className="input w-full border rounded-lg px-3 py-2"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Имя пассажира</label>
              <input
                type="text"
                value={formData.passengerName}
                onChange={e => setFormData({ ...formData, passengerName: e.target.value })}
                className="input w-full border rounded-lg px-3 py-2"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Email пассажира</label>
              <input
                type="email"
                value={formData.passengerEmail}
                onChange={e => setFormData({ ...formData, passengerEmail: e.target.value })}
                className="input w-full border rounded-lg px-3 py-2"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Телефон пассажира</label>
              <input
                type="tel"
                value={formData.passengerPhone}
                onChange={e => setFormData({ ...formData, passengerPhone: e.target.value })}
                className="input w-full border rounded-lg px-3 py-2"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">Статус</label>
              <select
                value={formData.status}
                onChange={e => setFormData({ ...formData, status: e.target.value as Booking['status'] })}
                className="input w-full border rounded-lg px-3 py-2"
              >
                <option value="PENDING">В ожидании</option>
                <option value="CONFIRMED">Подтверждено</option>
                <option value="CANCELLED">Отменено</option>
                <option value="REFUNDED">Возвращено</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end space-x-2 pt-4">
            <button type="button" onClick={onClose} className="btn border">Отмена</button>
            <button type="submit" className="btn bg-blue-600 text-white">Сохранить</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;
