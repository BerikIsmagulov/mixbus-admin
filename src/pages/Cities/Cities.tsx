import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import CitiesTable from '../../components/common/CitiesTable';
import CityModal from '../../components/common/CityModal';

// Тестовые данные
const testCities = [
  { id: 1, name: 'Алматы', nameKz: 'Алматы', timezone: 'Asia/Almaty' },
  { id: 4, name: 'Нур-Султан', nameKz: 'Нұр-Сұлтан', timezone: 'Asia/Almaty' },
  { id: 5, name: 'Шымкент', nameKz: 'Шымкент', timezone: 'Asia/Almaty' },
];

const Cities: React.FC = () => {
  const [cities, setCities] = useState(testCities);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCity, setEditingCity] = useState<any>(null);

  const handleCreate = async (cityData: any) => {
    const newCity = { ...cityData, id: Date.now() };
    setCities([...cities, newCity]);
    return { success: true };
  };

  const handleUpdate = async (cityData: any) => {
    if (!editingCity) return { success: false };
    setCities(cities.map(c => c.id === editingCity.id ? { ...c, ...cityData } : c));
    return { success: true };
  };

  const handleEdit = (city: any) => {
    setEditingCity(city);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    setCities(cities.filter(c => c.id !== id));
    return { success: true };
  };

  const handleModalSubmit = async (cityData: any) => {
    if (editingCity) {
      return await handleUpdate(cityData);
    } else {
      return await handleCreate(cityData);
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Города</h1>
        <button
          onClick={() => {
            setEditingCity(null);
            setIsModalOpen(true);
          }}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          <Plus className="h-4 w-4 mr-2" />
          Добавить город
        </button>
      </div>
      
      <CitiesTable
        cities={cities}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      
      <CityModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingCity(null);
        }}
        onSubmit={handleModalSubmit}
        city={editingCity}
        title={editingCity ? 'Редактировать город' : 'Добавить город'}
      />
    </div>
  );
};

export default Cities;
