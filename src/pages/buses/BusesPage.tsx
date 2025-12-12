import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useBuses } from '../../hooks/api/useBuses';
import BusModal from '../../components/common/BusModal';
import BusesTable from '../../components/common/BusesTable';
import type { Bus } from '../../types';

const BusesPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBus, setEditingBus] = useState<Bus | null>(null);
  const { buses, loading, createBus, updateBus, deleteBus } = useBuses();

  const handleSubmit = async (data: Omit<Bus, 'id'>) => {
    if (editingBus) {
      await updateBus(editingBus.id, data);
    } else {
      await createBus(data);
    }
    setIsModalOpen(false);
    setEditingBus(null);
  };

  const handleEdit = (bus: Bus) => {
    setEditingBus(bus);
    setIsModalOpen(true); // 👈 обязательно открываем модалку
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Автобусы</h1>
        <button
          onClick={() => {
            setEditingBus(null);
            setIsModalOpen(true);
          }}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          <Plus className="h-4 w-4 mr-2" /> Добавить автобус
        </button>
      </div>

      <BusesTable
        buses={buses}
        loading={loading}
        onEdit={handleEdit} // 👈 используем кастомную функцию
        onDelete={deleteBus}
      />

      <BusModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingBus(null);
        }}
        onSubmit={handleSubmit}
        bus={editingBus}
        title={editingBus ? 'Редактировать автобус' : 'Добавить автобус'}
      />
    </div>
  );
};

export default BusesPage;
