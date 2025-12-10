// 📁 src/pages/cities/CitiesPage.tsx
import React, { useState } from 'react';
import { Plus, Upload } from 'lucide-react';
import { useCities } from '../../hooks/api/useCities';
import CitiesTable from '../../components/common/CitiesTable';
import CityModal from '../../components/common/CityModal';

const CitiesPage: React.FC = () => {
  const { cities, fetchCities, createCity, createCitiesBulk, updateCity, deleteCity } = useCities();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCity, setEditingCity] = useState<any>(null);

  const handleCreate = async (cityData: any) => {
    const newCity = { ...cityData, id: Date.now() };
    await createCity(newCity);
    fetchCities();
    return { success: true };
  };

  const handleUpdate = async (cityData: any) => {
    if (!editingCity) return { success: false };
    await updateCity(editingCity.id, cityData);
    fetchCities();
    return { success: true };
  };

  const handleDelete = async (id: number) => {
    await deleteCity(id);
    fetchCities();
  };

  const handleModalSubmit = async (cityData: any) => {
    return editingCity ? handleUpdate(cityData) : handleCreate(cityData);
  };

  const handleImportFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const text = await file.text();
    try {
      const data = JSON.parse(text);
      if (!Array.isArray(data)) throw new Error('Invalid format');

      const result = await createCitiesBulk(data);
      if (result.success) {
        fetchCities();
        alert(`Импортировано городов: ${result.count}`);
      } else {
        throw new Error(result.error);
      }
    } catch (err: any) {
      console.error(err);
      alert('Ошибка при импорте файла: ' + err.message);
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Города</h1>
        <div className="space-x-2">
          <label className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg cursor-pointer">
            <Upload className="w-4 h-4 mr-2" /> Импорт
            <input type="file" accept=".json" onChange={handleImportFile} className="hidden" />
          </label>
          <button
            onClick={() => {
              setEditingCity(null);
              setIsModalOpen(true);
            }}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg"
          >
            <Plus className="h-4 w-4 mr-2" /> Добавить город
          </button>
        </div>
      </div>

      <CitiesTable cities={cities} onEdit={setEditingCity} onDelete={handleDelete} />

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

export default CitiesPage;
