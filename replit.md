# SN.SP Limited Travel Agency

## Overview

SN.SP Limited is a comprehensive travel agency website built for a Nigerian-based travel company. The application serves as both a marketing platform and booking system, offering flight bookings, hotel reservations, visa applications, study abroad services, and holiday packages. The platform emphasizes professional design inspired by leading travel platforms like Airbnb and Booking.com, with a focus on trust-building and seamless user experience.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **Routing**: Wouter for client-side routing with dedicated pages for services, blog, about, and contact
- **UI Library**: Shadcn/ui components built on Radix UI primitives for accessibility and consistency
- **Styling**: Tailwind CSS with custom design system featuring travel-themed color palette (Deep Travel Blue, Warm White, Sunset Orange, Sky Blue)
- **State Management**: TanStack React Query for server state management
- **Forms**: React Hook Form with Zod validation for type-safe form handling

### Backend Architecture
- **Server**: Express.js with TypeScript running on Node.js
- **API Design**: RESTful API with dedicated endpoints for flight booking submissions
- **Email Integration**: Nodemailer for sending confirmation emails and notifications
- **WhatsApp Integration**: URL-based WhatsApp messaging for instant booking notifications

### Data Storage Solutions
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Provider**: Neon serverless PostgreSQL for cloud hosting
- **Schema Management**: Drizzle-kit for migrations and schema management
- **Session Storage**: Connect-pg-simple for PostgreSQL-based session management

### Design System
- **Typography**: Inter font family from Google Fonts for modern, clean appearance
- **Color System**: HSL-based color variables supporting both light and dark modes
- **Components**: Comprehensive component library with consistent spacing, typography, and interaction patterns
- **Responsive Design**: Mobile-first approach with Tailwind CSS breakpoints

### File Structure
- **Client**: React application in `/client` directory with organized component structure
- **Server**: Express server in `/server` directory with modular route handling
- **Shared**: Common TypeScript types and schemas in `/shared` directory
- **Assets**: Static assets including logos, images, and data files in `/attached_assets`

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Serverless PostgreSQL driver for Neon database
- **@tanstack/react-query**: Data fetching and caching library
- **drizzle-orm**: TypeScript ORM for PostgreSQL
- **nodemailer**: Email sending capabilities
- **wouter**: Lightweight client-side routing

### UI and Styling
- **@radix-ui/***: Comprehensive set of accessible UI primitives
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Type-safe component variants
- **clsx**: Conditional CSS class utility

### Development Tools
- **vite**: Fast build tool and development server
- **tsx**: TypeScript execution engine for development
- **esbuild**: Fast JavaScript bundler for production builds
- **@replit/vite-plugin-runtime-error-modal**: Development error overlay

### Data and Validation
- **zod**: TypeScript-first schema validation
- **@hookform/resolvers**: Form validation resolvers
- **date-fns**: Date manipulation library

### Communication Services
- **WhatsApp Web API**: Direct messaging integration for booking notifications
- **Email SMTP**: Configurable email service for customer communications