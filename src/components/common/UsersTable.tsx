// 📁 src/components/common/UsersTable.tsx
import React from 'react';
import { Edit, Trash2 } from 'lucide-react';

interface User {
  id: number;
  firstName?: string;
  lastName?: string;
  email: string;
  phone?: string;
}

interface UsersTableProps {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (id: number) => void;
  loading?: boolean;
}

const UsersTable: React.FC<UsersTableProps> = ({ users, onEdit, onDelete, loading = false }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h3 className="text-xl font-semibold mb-4">Список пользователей</h3>
      {users.length === 0 ? (
        <p className="text-gray-500">Нет пользователей.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">#</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Имя</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Телефон</th>
                <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase">Действия</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.map((user, index) => {
                const fullName = [user.firstName, user.lastName].filter(Boolean).join(' ');
                return (
                  <tr key={user.id}>
                    <td className="px-4 py-2 text-sm">{index + 1}</td>
                    <td className="px-4 py-2 text-sm font-medium">{fullName || '-'}</td>
                    <td className="px-4 py-2 text-sm">{user.email}</td>
                    <td className="px-4 py-2 text-sm">{user.phone || '-'}</td>
                    <td className="px-4 py-2 text-right space-x-2">
                      <button
                        onClick={() => onEdit(user)}
                        className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800"
                      >
                        <Edit className="w-4 h-4 mr-1" /> Ред.
                      </button>
                      <button
                        onClick={() => onDelete(user.id)}
                        className="inline-flex items-center text-sm text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="w-4 h-4 mr-1" /> Удал.
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UsersTable;
