
export interface BookingModel {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  destination: string;
  departureDate: string;
  returnDate: string;
  passengers: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}

export interface FlightBooking extends BookingModel {
  flightType: 'one-way' | 'round-trip';
  departureAirport: string;
  arrivalAirport: string;
  preferredClass: 'economy' | 'business' | 'first';
}

export interface HotelBooking extends BookingModel {
  checkInDate: string;
  checkOutDate: string;
  roomType: string;
  numberOfRooms: number;
}
