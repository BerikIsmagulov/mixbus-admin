import { Route, Routes, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import DashboardPage from './pages/dashboard/Dashboard';
import CitiesPage from './pages/cities/CitiesPage';
import BusesPage from './pages/buses/BusesPage';
import TripsPage from './pages/trips/TripsPage';
import StationsPage from './pages/stations/StationsPage';
import RoutesPage from './pages/routes/RoutesPage';
import BookingsPage from './pages/bookings/BookingsPage';
import UsersPage from './pages/users/UsersPage';



const AppRoutes = () => {
  return (
    <Routes>
      {/* Стартовая страница */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      {/* Обёртка с Layout */}
      <Route element={<Layout />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/cities" element={<CitiesPage />} />
        <Route path="/buses" element={<BusesPage />} />
        <Route path="/trips" element={<TripsPage />} />
        <Route path="stations" element={<StationsPage />} />
        <Route path="/routes" element={<RoutesPage />} />
        <Route path="/bookings" element={<BookingsPage />} />
        <Route path="/users" element={<UsersPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
