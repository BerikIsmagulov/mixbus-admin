import React, { useState } from 'react';
import { Edit, Trash2, MapPin } from 'lucide-react';

// Временный тип
interface City {
  id: number;
  name: string;
  nameKz?: string;
  timezone: string;
}

interface CitiesTableProps {
  cities: City[];
  onEdit: (city: City) => void;
  onDelete: (id: number) => void;
  loading?: boolean;
}

const CitiesTable: React.FC<CitiesTableProps> = ({ 
  cities, 
  onEdit, 
  onDelete,
  loading = false 
}) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h3 className="text-lg font-semibold mb-4">Тестовая таблица городов</h3>
      <p>Городов: {cities.length}</p>
      {cities.map(city => (
        <div key={city.id} className="border-b py-2">
          {city.name} - {city.timezone}
        </div>
      ))}
    </div>
  );
};

export default CitiesTable;
