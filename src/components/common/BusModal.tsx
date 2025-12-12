// 📁 src/components/common/BusModal.tsx
import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import type { Bus } from '../../types';

interface BusModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (busData: Omit<Bus, 'id'>) => Promise<any>;
  bus?: Bus | null;
  title: string;
}

const BusModal: React.FC<BusModalProps> = ({ isOpen, onClose, onSubmit, bus, title }) => {
  const [formData, setFormData] = useState<Omit<Bus, 'id'>>({
    numberPlate: '',
    model: '',
    totalSeats: 20,
    amenities: [],
    isActive: true
  });

  useEffect(() => {
    if (bus) {
      const { id, ...rest } = bus;
      setFormData(rest);
    }
  }, [bus]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
    onClose();
  };

  const handleAmenityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(value)
        ? prev.amenities.filter(a => a !== value)
        : [...prev.amenities, value]
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4">
        <div className="px-6 py-4 border-b flex justify-between items-center">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="block font-medium text-sm text-gray-700">Номер автобуса</label>
            <input
              type="text"
              required
              value={formData.numberPlate}
              onChange={e => setFormData({ ...formData, numberPlate: e.target.value })}
              className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>
          <div>
            <label className="block font-medium text-sm text-gray-700">Модель</label>
            <input
              type="text"
              required
              value={formData.model}
              onChange={e => setFormData({ ...formData, model: e.target.value })}
              className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>
          <div>
            <label className="block font-medium text-sm text-gray-700">Мест</label>
            <input
              type="number"
              required
              value={formData.totalSeats}
              onChange={e => setFormData({ ...formData, totalSeats: +e.target.value })}
              className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>
          <div>
            <label className="block font-medium text-sm text-gray-700 mb-1">Удобства</label>
            <div className="space-y-1">
              {['wifi', 'ac', 'usb', 'toilet', 'tv'].map((a) => (
                <label key={a} className="flex items-center space-x-2 text-sm">
                  <input
                    type="checkbox"
                    value={a}
                    checked={formData.amenities.includes(a)}
                    onChange={handleAmenityChange}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span>{a}</span>
                </label>
              ))}
            </div>
          </div>

<div className="flex items-center space-x-2">
  <label className="block font-medium">Активен</label>
  <label className="relative inline-flex items-center cursor-pointer">
    <input
      type="checkbox"
      className="sr-only peer"
      checked={formData.isActive}
      onChange={() => setFormData(prev => ({ ...prev, isActive: !prev.isActive }))}
    />
    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-green-500 peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 relative">
      <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform peer-checked:translate-x-5" />
    </div>
  </label>
</div>


          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-100 transition"
            >
              Отмена
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Сохранить
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BusModal;
