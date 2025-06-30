# Copilot Management Dashboard

## Overview

This is a full-stack web application for managing AI copilots with a modern React frontend and Express.js backend. The application provides a dashboard for creating, editing, and interacting with various types of AI copilots through a chat interface.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for lightweight client-side routing
- **UI Framework**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with CSS variables for theming
- **State Management**: TanStack Query (React Query) for server state management
- **Build Tool**: Vite for fast development and optimized builds

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Runtime**: Node.js with ES modules
- **Database ORM**: Drizzle ORM with PostgreSQL dialect
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **API Design**: RESTful API with `/api` prefix
- **Session Storage**: PostgreSQL-based sessions using connect-pg-simple

### Build System
- **Bundler**: Vite for frontend, esbuild for backend
- **TypeScript**: Strict mode with path mapping for clean imports
- **Package Manager**: npm with lockfile version 3

## Key Components

### Database Schema
The application uses three main entities:
- **Users**: Authentication and user management
- **Copilots**: AI assistant configurations with types (general, content, analyst, support)
- **Messages**: Chat history between users and copilots

### Frontend Components
- **Dashboard**: Main application interface with workspace selection
- **CopilotCard**: Individual copilot management cards
- **ChatInterface**: Real-time chat with copilots
- **CreateCopilotModal**: Form for creating new copilots
- **EditCopilotModal**: Form for editing existing copilots
- **WorkspaceSelector**: Multi-workspace support

### Backend Storage
- **MemStorage**: In-memory storage implementation for development
- **IStorage Interface**: Abstraction layer for future database integration

## Data Flow

1. **Frontend Requests**: React components use TanStack Query for API calls
2. **API Routes**: Express.js handles requests with `/api` prefix
3. **Storage Layer**: Storage interface abstracts data persistence
4. **Database Operations**: Drizzle ORM manages PostgreSQL interactions
5. **Real-time Updates**: Query invalidation for reactive UI updates

## External Dependencies

### UI and Styling
- **Radix UI**: Accessible component primitives
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library
- **class-variance-authority**: Component variant management

### Data Management
- **TanStack Query**: Server state synchronization
- **React Hook Form**: Form state management
- **Zod**: Schema validation with Drizzle integration

### Database and Backend
- **Neon Database**: Serverless PostgreSQL hosting
- **Drizzle ORM**: Type-safe database operations
- **connect-pg-simple**: PostgreSQL session store

## Deployment Strategy

### Development
- **Dev Server**: Vite dev server with Express backend
- **Hot Reload**: Vite HMR for frontend, tsx for backend
- **Database**: Neon serverless PostgreSQL
- **Environment**: NODE_ENV=development

### Production
- **Build Process**: 
  - Frontend: Vite build to `dist/public`
  - Backend: esbuild bundle to `dist/index.js`
- **Deployment**: Single Node.js process serving static files and API
- **Database**: Drizzle migrations with `db:push` command

### Configuration
- **Environment Variables**: DATABASE_URL for PostgreSQL connection
- **TypeScript**: Strict compilation with path mapping
- **Asset Handling**: Vite resolves assets and handles optimization

## Changelog

```
Changelog:
- June 30, 2025. Initial setup
- June 30, 2025. Built complete clickable wireframe implementation with interactive dashboard, navigation, modals, and chat interface
- June 30, 2025. Updated sidebar color to #e6eeef per user request
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```