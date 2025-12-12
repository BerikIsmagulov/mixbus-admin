// 📁 src/components/common/RouteModal.tsx
import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import type { City, Route } from '../../types';

export interface RouteFormData {
  departureCityId: number;
  arrivalCityId: number;
  distance: number;
  estimatedDuration: number;
}

interface RouteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: RouteFormData) => Promise<void>;
  route?: Route | null;
  cities: City[];
  title: string;
}

const RouteModal: React.FC<RouteModalProps> = ({ isOpen, onClose, onSubmit, route, cities, title }) => {
  const [formData, setFormData] = useState<RouteFormData>({
    departureCityId: cities[0]?.id ?? 0,
    arrivalCityId: cities[1]?.id ?? 0,
    distance: 0,
    estimatedDuration: 0
  });

  useEffect(() => {
  if (route) {
    setFormData({
      departureCityId: route.departureCityId ?? cities[0]?.id ?? 0,
      arrivalCityId: route.arrivalCityId ?? cities[1]?.id ?? cities[0]?.id ?? 0,
      distance: route.distance ?? 0,
      estimatedDuration: route.estimatedDuration ?? 0
    });
  }
}, [route, cities]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg mx-4">
        <div className="px-6 py-4 border-b flex justify-between items-center">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
            <X />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block font-medium mb-1">Город отправления</label>
            <select
              value={formData.departureCityId}
              onChange={e => setFormData({ ...formData, departureCityId: Number(e.target.value) })}
              className="w-full px-3 py-2 border rounded-md"
              required
            >
              {cities.map(city => (
                <option key={city.id} value={city.id}>{city.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-medium mb-1">Город прибытия</label>
            <select
              value={formData.arrivalCityId}
              onChange={e => setFormData({ ...formData, arrivalCityId: Number(e.target.value) })}
              className="w-full px-3 py-2 border rounded-md"
              required
            >
              {cities.map(city => (
                <option key={city.id} value={city.id}>{city.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-medium mb-1">Расстояние (км)</label>
            <input
              type="number"
              value={formData.distance}
              onChange={e => setFormData({ ...formData, distance: Number(e.target.value) })}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Длительность (мин)</label>
            <input
              type="number"
              value={formData.estimatedDuration}
              onChange={e => setFormData({ ...formData, estimatedDuration: Number(e.target.value) })}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 border rounded-md hover:bg-gray-100">Отмена</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Сохранить</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RouteModal;
