import { type User, type InsertUser } from "@shared/schema";
import { randomUUID } from "crypto";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;

  constructor() {
    this.users = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
}

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