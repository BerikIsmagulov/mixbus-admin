// 📁 src/pages/stations/StationsPage.tsx
import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useStations } from '../../hooks/api/useStations';
import StationsTable from '../../components/common/StationsTable';
import StationModal from '../../components/common/StationModal';

const StationsPage: React.FC = () => {
  const { stations, fetchStations, createStation, updateStation, deleteStation } = useStations();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStation, setEditingStation] = useState<any>(null);

  const handleCreate = async (data: any) => {
    const res = await createStation(data);
    if (res?.success) fetchStations();
    return res;
  };

  const handleUpdate = async (data: any) => {
    if (!editingStation) return { success: false };
    const res = await updateStation(editingStation.id, data);
    if (res?.success) fetchStations();
    return res;
  };

  const handleDelete = async (id: number) => {
    const res = await deleteStation(id);
    if (res?.success) fetchStations();
    return res;
  };

  const handleModalSubmit = async (formData: any) => {
    return editingStation ? handleUpdate(formData) : handleCreate(formData);
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Станции</h1>
        <button
          onClick={() => {
            setEditingStation(null);
            setIsModalOpen(true);
          }}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          <Plus className="h-4 w-4 mr-2" />
          Добавить станцию
        </button>
      </div>

      <StationsTable
        stations={stations}
        onEdit={(s) => {
          setEditingStation(s);
          setIsModalOpen(true);
        }}
        onDelete={handleDelete}
      />

      <StationModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingStation(null);
        }}
        onSubmit={handleModalSubmit}
        station={editingStation}
        title={editingStation ? 'Редактировать станцию' : 'Добавить станцию'}
      />
    </div>
  );
};

export default StationsPage;
