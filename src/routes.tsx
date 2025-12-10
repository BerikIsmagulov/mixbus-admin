import { Route, Routes, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import DashboardPage from './pages/dashboard/Dashboard';
import CitiesPage from './pages/cities/CitiesPage';
import TripsPage from './pages/trips/TripsPage';
import StationsPage from './pages/stations/StationsPage';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Стартовая страница */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      {/* Обёртка с Layout */}
      <Route element={<Layout />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/cities" element={<CitiesPage />} />
        <Route path="/trips" element={<TripsPage />} />
        <Route path="stations" element={<StationsPage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
