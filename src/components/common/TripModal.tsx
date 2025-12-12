// 📁 src/components/common/TripModal.tsx
import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import type { Bus, Route, Trip } from '../../types';

interface TripModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (
    data: Omit<
      Trip,
      'id' | 'bookedSeats' | 'availableSeatsCount' | 'createdAt' | 'updatedAt' | '_count'
    >
  ) => Promise<{ success: boolean; error?: any }>;
  trip?: Trip | null;
  title: string;
  routes: Route[];
  buses: Bus[];
}

const TripModal: React.FC<TripModalProps> = ({ isOpen, onClose, onSubmit, trip, routes, buses, title }) => {
  const [formData, setFormData] = useState({
    routeId: routes[0]?.id || 0,
    busId: buses[0]?.id || 0,
    departureTime: '',
    arrivalTime: '',
    price: 0,
    availableSeats: 0,
    status: 'SCHEDULED' as Trip['status']
  });

  useEffect(() => {
    if (trip) {
      setFormData({
        routeId: trip.routeId,
        busId: trip.busId,
        departureTime: trip.departureTime.slice(0, 16),
        arrivalTime: trip.arrivalTime.slice(0, 16),
        price: trip.price,
        availableSeats: trip.availableSeats,
        status: trip.status
      });
    }
  }, [trip]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4">
        <div className="px-6 py-4 border-b flex justify-between items-center">
          <h3 className="text-xl font-semibold">{title}</h3>
          <button onClick={onClose} className="text-gray-600 hover:text-red-500">
            <X className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-1">Маршрут</label>
              <select
                value={formData.routeId}
                onChange={e => setFormData({ ...formData, routeId: Number(e.target.value) })}
                className="input w-full border rounded-lg px-3 py-2"
                required
              >
                {routes.map(route => (
                  <option key={route.id} value={route.id}>
                    {route.departureCity.name} ➔ {route.arrivalCity.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-medium mb-1">Автобус</label>
              <select
                value={formData.busId}
                onChange={e => setFormData({ ...formData, busId: Number(e.target.value) })}
                className="input w-full border rounded-lg px-3 py-2"
                required
              >
                {buses.map(bus => (
                  <option key={bus.id} value={bus.id}>
                    {bus.numberPlate} - {bus.model}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-medium mb-1">Отправление</label>
              <input
                type="datetime-local"
                value={formData.departureTime}
                onChange={e => setFormData({ ...formData, departureTime: e.target.value })}
                className="input w-full border rounded-lg px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Прибытие</label>
              <input
                type="datetime-local"
                value={formData.arrivalTime}
                onChange={e => setFormData({ ...formData, arrivalTime: e.target.value })}
                className="input w-full border rounded-lg px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Цена</label>
              <input
                type="number"
                value={formData.price}
                onChange={e => setFormData({ ...formData, price: +e.target.value })}
                className="input w-full border rounded-lg px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Места</label>
              <input
                type="number"
                value={formData.availableSeats}
                onChange={e => setFormData({ ...formData, availableSeats: +e.target.value })}
                className="input w-full border rounded-lg px-3 py-2"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block font-medium mb-1">Статус</label>
              <select
                value={formData.status}
                onChange={e => setFormData({ ...formData, status: e.target.value as Trip['status'] })}
                className="input w-full border rounded-lg px-3 py-2"
                required
              >
                <option value="SCHEDULED">Запланирован</option>
                <option value="DELAYED">Задержан</option>
                <option value="CANCELLED">Отменен</option>
                <option value="COMPLETED">Завершен</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end space-x-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-lg hover:bg-gray-100"
            >
              Отмена
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Сохранить
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TripModal;
