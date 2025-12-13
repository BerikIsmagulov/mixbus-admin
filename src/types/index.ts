// Базовые типы данных
export type City = {
id: number;
name: string;
nameKz: string;
timezone: string;
};

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

export interface RouteFormData {
  departureCityId: number;
  arrivalCityId: number;
  distance: number;
  estimatedDuration: number;
}


export interface Trip {
  id: number;
  routeId: number;
  busId: number;
  departureTime: string;
  arrivalTime: string;
price: number;
  status: 'SCHEDULED' | 'DELAYED' |'CANCELLED' | 'COMPLETED';
  availableSeats: number;
  bookedSeats: string[];
  availableSeatsCount: number;
  route?: {
    id: number;
    departureCityId: number;
    arrivalCityId: number;
    distance: number;
    estimatedDuration: number;
    departureCity: {
      id: number;
      name: string;
      nameKz: string;
      timezone: string;
    };
    arrivalCity: {
      id: number;
      name: string;
      nameKz: string;
      timezone: string;
    };
  };
  bus?: {
    id: number;
    numberPlate: string;
    model: string;
    totalSeats: number;
    amenities: string[];
  };
}

export interface User {
  id: number;
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
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
