// Базовые типы данных
export interface City {
  id: number;
  name: string;
  nameKz?: string;
  timezone: string;
}

export interface Station {
  id: number;
  cityId: number;
  name: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  description?: string;
  createdAt: string;
  updatedAt: string;
  city: City;
}

export interface Bus {
  id: number;
  numberPlate: string;
  model: string;
  totalSeats: number;
  amenities: string[];
  isActive: boolean;
}

export interface Route {
  id: number;
  departureCityId: number;
  arrivalCityId: number;
  distance?: number;
  estimatedDuration?: number;
  createdAt: string;
  updatedAt: string;
  departureCity: City;
  arrivalCity: City;
}

export interface Trip {
  id: number;
  routeId: number;
  busId: number;
  departureTime: string;
  arrivalTime: string;
  price: number;
  availableSeats: number;
  status: 'SCHEDULED' | 'ONGOING' | 'COMPLETED' | 'CANCELLED' | 'DELAYED';
  createdAt: string;
  updatedAt: string;
  route: Route;
  bus: Bus;
  bookedSeats?: string[];
  availableSeatsCount?: number;
  seatMap?: any[];
}

export interface Booking {
  id: number;
  userId: number;
  tripId: number;
  seatNumbers: string[];
  totalPrice: number;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'REFUNDED';
  paymentId?: string;
  passengerName?: string;
  passengerEmail?: string;
  passengerPhone?: string;
  createdAt: string;
  updatedAt: string;
  user: {
    id: number;
    email: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
  };
  trip: Trip & {
    route: Route & {
      departureCity: City;
      arrivalCity: City;
    };
    bus: Bus;
  };
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  error?: string;
}
