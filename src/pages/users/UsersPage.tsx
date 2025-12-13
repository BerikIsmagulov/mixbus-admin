// 📁 src/pages/users/UsersPage.tsx
import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { useUsers } from '../../hooks/api/useUsers';
import UsersTable from '../../components/common/UsersTable';
import UserModal from '../../components/common/UserModal';

const UsersPage: React.FC = () => {
  const { users, loading, fetchUsers, createUser, updateUser, deleteUser } = useUsers();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);

  const handleCreate = async (userData: any) => {
    const res = await createUser(userData);
    if (res?.success) {
      fetchUsers();
    }
    return res;
  };

  const handleUpdate = async (userData: any) => {
    if (!editingUser) return { success: false };
    const res = await updateUser(editingUser.id, userData);
    if (res?.success) {
      fetchUsers();
    }
    return res;
  };

  const handleDelete = async (id: number) => {
    const res = await deleteUser(id);
    if (res?.success) {
      fetchUsers();
    }
    return res;
  };

  const handleModalSubmit = async (formData: any) => {
    return editingUser ? handleUpdate(formData) : handleCreate(formData);
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Пользователи</h1>
        <button
          onClick={() => {
            setEditingUser(null);
            setIsModalOpen(true);
          }}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          <Plus className="h-4 w-4 mr-2" />
          Добавить пользователя
        </button>
      </div>

      <UsersTable
        users={users}
        onEdit={(user) => {
          setEditingUser(user);
          setIsModalOpen(true);
        }}
        onDelete={handleDelete}
        loading={loading}
      />

      <UserModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingUser(null);
        }}
        onSubmit={handleModalSubmit}
        user={editingUser}
        title={editingUser ? 'Редактировать пользователя' : 'Добавить пользователя'}
      />
    </div>
  );
};

export default UsersPage;
