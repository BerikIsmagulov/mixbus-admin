// 📁 src/components/common/CityModal.tsx
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface City {
  id: number;
  name: string;
  nameKz?: string;
  timezone: string;
}

interface CityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (cityData: Omit<City, 'id'>) => Promise<any>;
  city?: City | null;
  title: string;
}

const CityModal: React.FC<CityModalProps> = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  city, 
  title 
}) => {
  const [formData, setFormData] = useState({
    name: '',
    nameKz: '',
    timezone: 'Asia/Almaty',
  });

  useEffect(() => {
    if (city) {
      setFormData({
        name: city.name,
        nameKz: city.nameKz || '',
        timezone: city.timezone,
      });
    }
  }, [city]);

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
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Название города</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-400"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Название (казахский)</label>
              <input
                type="text"
                value={formData.nameKz}
                onChange={(e) => setFormData({...formData, nameKz: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Часовой пояс</label>
              <input
                type="text"
                value={formData.timezone}
                onChange={(e) => setFormData({...formData, timezone: e.target.value})}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-400"
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
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

export default CityModal;