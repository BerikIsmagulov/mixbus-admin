import React, { useState, useEffect } from 'react';
import { X, MapPin } from 'lucide-react';
import { City } from '../../types';

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (city) {
      setFormData({
        name: city.name,
        nameKz: city.nameKz || '',
        timezone: city.timezone,
      });
    } else {
      setFormData({
        name: '',
        nameKz: '',
        timezone: 'Asia/Almaty',
      });
    }
    setError(null);
  }, [city]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!formData.name.trim()) {
      setError('Название города обязательно');
      setLoading(false);
      return;
    }

    const result = await onSubmit(formData);
    
    if (result.success) {
      onClose();
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  const timezones = [
    'Asia/Almaty',
    'Asia/Aqtobe',
    'Asia/Aqtau',
    'Asia/Oral',
    'Asia/Qostanay',
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div 
          className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" 
          onClick={onClose}
        />

        <div className="inline-block align-bottom bg-white rounded-xl shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <div className="flex items-center">
              <MapPin className="h-6 w-6 text-blue-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="px-6 py-4">
            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Название города (русский) *
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Например: Алматы"
                  required
                />
              </div>

              <div>
                <label htmlFor="nameKz" className="block text-sm font-medium text-gray-700 mb-1">
                  Название города (казахский)
                </label>
                <input
                  type="text"
                  id="nameKz"
                  value={formData.nameKz}
                  onChange={(e) => setFormData({...formData, nameKz: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Например: Алматы"
                />
              </div>

              <div>
                <label htmlFor="timezone" className="block text-sm font-medium text-gray-700 mb-1">
                  Часовой пояс
                </label>
                <select
                  id="timezone"
                  value={formData.timezone}
                  onChange={(e) => setFormData({...formData, timezone: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {timezones.map((tz) => (
                    <option key={tz} value={tz}>{tz}</option>
                  ))}
                </select>
                <p className="mt-1 text-xs text-gray-500">
                  Часовой пояс для расписания рейсов
                </p>
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg"
                disabled={loading}
              >
                Отмена
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg disabled:opacity-50"
              >
                {loading ? (
                  <div className="flex items-center">
                    <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                    Сохранение...
                  </div>
                ) : city ? 'Обновить' : 'Создать'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CityModal;
