import React from 'react';
import { Users, Bus, Route, Ticket, TrendingUp, Calendar, ArrowUpRight, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const statCards = [
    { 
      title: 'Города', 
      value: '3', 
      icon: Users, 
      color: 'bg-blue-500',
      change: 'Алматы, Нур-Султан, Шымкент',
      href: '/cities'
    },
    { 
      title: 'Автобусы', 
      value: '3', 
      icon: Bus, 
      color: 'bg-green-500',
      change: 'Все активны',
      href: '/buses'
    },
    { 
      title: 'Маршруты', 
      value: '2', 
      icon: Route, 
      color: 'bg-purple-500',
      change: 'Алматы → Нур-Султан',
      href: '/routes'
    },
    { 
      title: 'Бронирования', 
      value: '2', 
      icon: Ticket, 
      color: 'bg-yellow-500',
      change: '10400 ₸ выручки',
      href: '/bookings'
    },
  ];

  const recentBookings = [
    { id: 1, passenger: 'Нурлан Нурланов', route: 'Алматы → Нур-Султан', amount: '5200 ₸', status: 'confirmed' },
    { id: 2, passenger: 'Айдын Смагулов', route: 'Алматы → Шымкент', amount: '4800 ₸', status: 'pending' },
  ];

  const upcomingTrips = [
    { id: 1, route: 'Алматы → Нур-Султан', time: 'Завтра, 10:00', seats: '18/20' },
    { id: 2, route: 'Алматы → Шымкент', time: 'Послезавтра, 08:00', seats: '20/25' },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome banner */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl shadow-lg p-8 text-white">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold mb-2">🚌 MixBus Admin Панель</h1>
            <p className="text-blue-100">Управление автобусными перевозками Казахстана</p>
          </div>
          <div className="hidden md:block">
            <Bus className="h-24 w-24 text-blue-300 opacity-80" />
          </div>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.title}
              to={stat.href}
              className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition-all hover:transform hover:-translate-y-1"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  <p className="text-sm text-gray-500 mt-2">{stat.change}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-xl`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent bookings */}
        <div className="bg-white rounded-xl shadow">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">Последние бронирования</h3>
            <Link to="/bookings" className="text-sm text-blue-600 hover:text-blue-800 font-medium">
              Все бронирования →
            </Link>
          </div>
          <div className="divide-y divide-gray-200">
            {recentBookings.map((booking) => (
              <div key={booking.id} className="px-6 py-4 hover:bg-gray-50 transition">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-gray-900">{booking.passenger}</p>
                    <p className="text-sm text-gray-500">{booking.route}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{booking.amount}</p>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      booking.status === 'confirmed' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {booking.status === 'confirmed' ? 'Подтверждено' : 'Ожидает оплаты'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming trips */}
        <div className="bg-white rounded-xl shadow">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">Ближайшие рейсы</h3>
            <Link to="/trips" className="text-sm text-blue-600 hover:text-blue-800 font-medium">
              Все рейсы →
            </Link>
          </div>
          <div className="divide-y divide-gray-200">
            {upcomingTrips.map((trip) => (
              <div key={trip.id} className="px-6 py-4 hover:bg-gray-50 transition">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-gray-400 mr-3" />
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{trip.route}</p>
                    <p className="text-sm text-gray-500">{trip.time}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{trip.seats} мест</p>
                    <p className="text-sm text-gray-500">свободно</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="bg-white rounded-xl shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Быстрые действия</h3>
        </div>
        <div className="p-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link 
            to="/trips/new"
            className="bg-blue-50 hover:bg-blue-100 border-2 border-blue-200 rounded-xl p-6 text-center transition-all hover:border-blue-400"
          >
            <Calendar className="h-8 w-8 text-blue-600 mx-auto mb-3" />
            <span className="font-medium text-blue-700">Добавить рейс</span>
          </Link>
          
          <Link 
            to="/buses/new"
            className="bg-green-50 hover:bg-green-100 border-2 border-green-200 rounded-xl p-6 text-center transition-all hover:border-green-400"
          >
            <Bus className="h-8 w-8 text-green-600 mx-auto mb-3" />
            <span className="font-medium text-green-700">Добавить автобус</span>
          </Link>
          
          <Link 
            to="/routes/new"
            className="bg-purple-50 hover:bg-purple-100 border-2 border-purple-200 rounded-xl p-6 text-center transition-all hover:border-purple-400"
          >
            <Route className="h-8 w-8 text-purple-600 mx-auto mb-3" />
            <span className="font-medium text-purple-700">Создать маршрут</span>
          </Link>
          
          <Link 
            to="/cities/new"
            className="bg-yellow-50 hover:bg-yellow-100 border-2 border-yellow-200 rounded-xl p-6 text-center transition-all hover:border-yellow-400"
          >
            <MapPin className="h-8 w-8 text-yellow-600 mx-auto mb-3" />
            <span className="font-medium text-yellow-700">Добавить город</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
