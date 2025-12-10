// 📁 src/components/common/StationModal.tsx
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import type { Station, City } from '../../types/index.ts';
import { useCities } from '../../hooks/api/useCities';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<Station, 'id' | 'createdAt' | 'updatedAt' | 'city'>) => Promise<any>;
  station?: Station | null;
  title: string;
}

const StationModal: React.FC<Props> = ({ isOpen, onClose, onSubmit, station, title }) => {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    cityId: 1,
  });

  const { cities, loading } = useCities();

  useEffect(() => {
    if (station) {
      setFormData({
        name: station.name || '',
        address: station.address || '',
        cityId: station.city?.id || 1,
      });
    }
  }, [station]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md mx-4">
        <div className="px-6 py-4 border-b flex justify-between items-center">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="h-5 w-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Название</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Адрес</label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Город</label>
            <select
              value={formData.cityId}
              onChange={(e) => setFormData({ ...formData, cityId: +e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
              required
            >
              {loading ? (
                <option>Загрузка...</option>
              ) : (
                cities.map((city) => (
                  <option key={city.id} value={city.id}>
                    {city.name}
                  </option>
                ))
              )}
            </select>
          </div>

          <div className="pt-4 flex justify-end space-x-3">
            <button type="button" onClick={onClose} className="px-4 py-2 border rounded-lg">Отмена</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg">Сохранить</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StationModal;
