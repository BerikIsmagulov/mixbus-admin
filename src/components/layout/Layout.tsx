import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Bus, MapPin, Users, Route, Calendar, Ticket, Home, Settings, BarChart } from 'lucide-react';

const Layout: React.FC = () => {
  const location = useLocation();
  
  const navigation = [
    { name: 'Дашборд', href: '/', icon: Home },
    { name: 'Города', href: '/cities', icon: MapPin },
    { name: 'Автобусы', href: '/buses', icon: Bus },
    { name: 'Маршруты', href: '/routes', icon: Route },
    { name: 'Рейсы', href: '/trips', icon: Calendar },
    { name: 'Бронирования', href: '/bookings', icon: Ticket },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg">
        <div className="flex items-center justify-center h-16 px-4 bg-blue-600">
          <Bus className="h-8 w-8 text-white" />
          <span className="ml-2 text-xl font-bold text-white">MixBus Admin</span>
        </div>
        <nav className="mt-5 px-2 space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`
                  group flex items-center px-2 py-2 text-sm font-medium rounded-md
                  ${isActive 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  }
                `}
              >
                <Icon className="mr-3 h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Main content */}
      <div className="pl-64">
        {/* Header */}
        <header className="bg-white shadow">
          <div className="flex justify-between items-center px-8 py-4">
            <h1 className="text-2xl font-semibold text-gray-800">
              {navigation.find(item => item.href === location.pathname)?.name || 'Дашборд'}
            </h1>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => alert('Выход из системы')}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition"
              >
                Выйти
              </button>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
