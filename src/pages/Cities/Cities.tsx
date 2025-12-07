import React, { useState } from 'react';
import { Plus, Filter, Download } from 'lucide-react';
import CitiesTable from '../../components/common/CitiesTable';
import CityModal from '../../components/common/CityModal';
import { useCities } from '../../hooks/api/useCities';
import { City } from '../../types';

const Cities: React.FC = () => {
  const { 
    cities, 
    loading, 
    error, 
    createCity, 
    updateCity, 
    deleteCity,
    fetchCities 
  } = useCities();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCity, setEditingCity] = useState<City | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCities = cities.filter(city =>
    city.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (city.nameKz && city.nameKz.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleCreate = async (cityData: Omit<City, 'id'>) => {
    return await createCity(cityData);
  };

  const handleUpdate = async (cityData: Omit<City, 'id'>) => {
    if (!editingCity) return { success: false, error: 'Город не выбран' };
    return await updateCity(editingCity.id, cityData);
  };

  const handleEdit = (city: City) => {
    setEditingCity(city);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    const result = await deleteCity(id);
    if (!result.success) {
      alert(result.error);
    }
    return result;
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setEditingCity(null);
  };

  const handleModalSubmit = async (cityData: Omit<City, 'id'>) => {
    if (editingCity) {
      return await handleUpdate(cityData);
    } else {
      return await handleCreate(cityData);
    }
  };

  return (
    <div className="space-y-6 p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Города</h1>
          <p className="text-gray-600">Управление городами Казахстана</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg"
          >
            <Plus className="h-4 w-4 mr-2" />
            Добавить город
          </button>
        </div>
      </div>

      {/* Error message */}
      {error && !loading && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Ошибка</h3>
              <div className="mt-2 text-sm text-red-700">
                <p>{error}</p>
              </div>
              <button
                onClick={() => fetchCities()}
                className="mt-2 text-sm font-medium text-red-800 hover:text-red-900"
              >
                Попробовать снова →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex items-center">
            <div className="bg-blue-100 p-3 rounded-lg mr-4">
              <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-600">Всего городов</p>
              <p className="text-2xl font-bold text-gray-900">{cities.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex items-center">
            <div className="bg-green-100 p-3 rounded-lg mr-4">
              <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-600">С казахскими названиями</p>
              <p className="text-2xl font-bold text-gray-900">
                {cities.filter(c => c.nameKz).length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <div className="flex items-center">
            <div className="bg-purple-100 p-3 rounded-lg mr-4">
              <svg className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-gray-600">Основной часовой пояс</p>
              <p className="text-2xl font-bold text-gray-900">Asia/Almaty</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and filters */}
      <div className="bg-white rounded-xl shadow p-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Поиск городов..."
              />
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
              <Filter className="h-4 w-4 mr-2" />
              Фильтры
            </button>
            <button className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
              <Download className="h-4 w-4 mr-2" />
              Экспорт
            </button>
          </div>
        </div>
      </div>

      {/* Cities table */}
      <CitiesTable
        cities={filteredCities}
        onEdit={handleEdit}
        onDelete={handleDelete}
        loading={loading}
      />

      {/* Modal */}
      <CityModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSubmit={handleModalSubmit}
        city={editingCity}
        title={editingCity ? 'Редактировать город' : 'Добавить новый город'}
      />
    </div>
  );
};

export default Cities;
