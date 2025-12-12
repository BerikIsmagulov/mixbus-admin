import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useTrips } from '../../hooks/api/useTrips';
import { useRoutes } from '../../hooks/api/useRoutes';
import { useBuses } from '../../hooks/api/useBuses';
import TripsTable from '../../components/common/TripsTable';
import TripModal from '../../components/common/TripModal';

const TripsPage: React.FC = () => {
  const { trips, loading, fetchTrips, createTrip, updateTrip, deleteTrip } = useTrips();
  const { routes } = useRoutes();
  const { buses } = useBuses();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTrip, setEditingTrip] = useState<any>(null);

  const handleCreate = async (tripData: any) => {
    const result = await createTrip(tripData);
    if (result.success) {
      fetchTrips();
      return { success: true };
    }
    return { success: false, error: result.error };
  };

  const handleUpdate = async (tripData: any) => {
    if (!editingTrip) return { success: false };
    const result = await updateTrip(editingTrip.id, tripData);
    if (result.success) {
      fetchTrips();
      return { success: true };
    }
    return { success: false, error: result.error };
  };

  const handleDelete = async (id: number) => {
    const result = await deleteTrip(id);
    if (result.success) fetchTrips();
    else alert(result.error || 'Не удалось удалить рейс');
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Рейсы</h1>
        <button
          onClick={() => {
            setEditingTrip(null);
            setIsModalOpen(true);
          }}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          <Plus className="h-4 w-4 mr-2" /> Добавить рейс
        </button>
      </div>

      <TripsTable
        trips={trips}
        onEdit={(trip) => {
          setEditingTrip(trip);
          setIsModalOpen(true);
        }}
        onDelete={handleDelete}
        loading={loading}
      />

      <TripModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTrip(null);
        }}
        onSubmit={editingTrip ? handleUpdate : handleCreate}
        trip={editingTrip}
        title={editingTrip ? 'Редактировать рейс' : 'Добавить рейс'}
        routes={routes}
        buses={buses}
      />
    </div>
  );
};

export default TripsPage;
