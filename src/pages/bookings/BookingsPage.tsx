// 📁 src/pages/bookings/BookingsPage.tsx
import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { useBookings } from '../../hooks/api/useBookings';
import { useTrips } from '../../hooks/api/useTrips';
import apiClient from '../../api/client';
import BookingsTable from '../../components/common/BookingsTable';
import BookingModal from '../../components/common/BookingModal';
import type { Booking, User } from '../../types';

const BookingsPage: React.FC = () => {
  const { bookings, fetchBookings, createBooking, updateBooking, deleteBooking } = useBookings();
  const { trips } = useTrips();

  const [users, setUsers] = useState<User[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBooking, setEditingBooking] = useState<Booking | null>(null);

 useEffect(() => {
  const fetchUsers = async () => {
    try {
      const res = await apiClient.get('/users');
      setUsers(res.data);
    } catch (err) {
      console.error('Ошибка загрузки пользователей:', err);
    }
  };
  fetchUsers();
}, []);


  const handleCreate = async (
  data: Omit<Booking, 'id' | 'createdAt' | 'updatedAt' | 'user' | 'trip'>
) => {
  console.log("Отправляем данные на сервер:", data);
  await createBooking(data);
  fetchBookings();
};


  const handleUpdate = async (
    data: Omit<Booking, 'id' | 'createdAt' | 'updatedAt' | 'user' | 'trip'>
  ) => {
    if (!editingBooking) return;
    await updateBooking(editingBooking.id, data);
    fetchBookings();
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Удалить бронирование?')) return;
    await deleteBooking(id);
    fetchBookings();
  };

  const handleModalSubmit = (
    formData: Omit<Booking, 'id' | 'createdAt' | 'updatedAt' | 'user' | 'trip'>
  ) => {
    return editingBooking ? handleUpdate(formData) : handleCreate(formData);
  };

  const handleEditClick = (booking: Booking) => {
    setEditingBooking(booking);
    setIsModalOpen(true);
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Бронирования</h1>
        <button
          onClick={() => {
                console.log('Кнопка нажата — открываем модалку'); // <== ДОБАВЬ
            setEditingBooking(null);
            setIsModalOpen(true);
          }}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          <Plus className="h-4 w-4 mr-2" /> Добавить бронирование
        </button>
      </div>

      <BookingsTable bookings={bookings} onEdit={handleEditClick} onDelete={handleDelete} />

      <BookingModal
        isOpen={isModalOpen}
        onClose={() => {
              console.log('Кнопка нажата — открываем модалку'); // <== ДОБАВЬ
          setIsModalOpen(false);
          setEditingBooking(null);
        }}
        
        onSubmit={handleModalSubmit}
        booking={editingBooking}
        title={editingBooking ? 'Редактировать бронирование' : 'Добавить бронирование'}
        trips={trips}
        users={users}
      />
    </div>
  );
};

export default BookingsPage;
