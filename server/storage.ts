// Simple in-memory storage for travel booking application

// Simple in-memory storage for development
// In production, you would use a proper database

interface Booking {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  from: string;
  to: string;
  departureDate: string;
  returnDate?: string;
  passengers: number;
  class: string;
  specialRequests?: string;
  createdAt: Date;
}

class Storage {
  private bookings: Booking[] = [];

  addBooking(booking: Omit<Booking, 'id' | 'createdAt'>): Booking {
    const newBooking: Booking = {
      ...booking,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date()
    };
    this.bookings.push(newBooking);
    return newBooking;
  }

  getBookings(): Booking[] {
    return this.bookings;
  }

  getBookingById(id: string): Booking | undefined {
    return this.bookings.find(booking => booking.id === id);
  }
}

export const storage = new Storage();