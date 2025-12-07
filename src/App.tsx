import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard/Dashboard';
import Cities from './pages/Cities/Cities';
import './index.css';

// Остальные страницы (пока заглушки)
const Stations = () => <div className="p-8"><h1 className="text-2xl font-bold">Станции</h1><p>Страница в разработке...</p></div>;
const Buses = () => <div className="p-8"><h1 className="text-2xl font-bold">Автобусы</h1><p>Страница в разработке...</p></div>;
const RoutesPage = () => <div className="p-8"><h1 className="text-2xl font-bold">Маршруты</h1><p>Страница в разработке...</p></div>;
const Trips = () => <div className="p-8"><h1 className="text-2xl font-bold">Рейсы</h1><p>Страница в разработке...</p></div>;
const Bookings = () => <div className="p-8"><h1 className="text-2xl font-bold">Бронирования</h1><p>Страница в разработке...</p></div>;

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="cities" element={<Cities />} />
          <Route path="stations" element={<Stations />} />
          <Route path="buses" element={<Buses />} />
          <Route path="routes" element={<RoutesPage />} />
          <Route path="trips" element={<Trips />} />
          <Route path="bookings" element={<Bookings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
