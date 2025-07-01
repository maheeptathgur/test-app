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
- June 30, 2025. Changed all button colors to #008062 throughout the interface
- June 30, 2025. Implemented comprehensive brand color palette based on #008062 and #e6eeef with semantic color variables
- June 30, 2025. Changed font to Funnel Sans from Google Fonts and applied consistently throughout the app
- June 30, 2025. Added comprehensive navigation menu with Knowledge Base, Profile Fields, Subscriptions, Conversations, Analytics, and Users sections
- June 30, 2025. Added Knolli logo to top left sidebar using provided brand logo image
- June 30, 2025. Implemented view toggle (grid/table), search, filtering, and sorting system for copilots screen
- June 30, 2025. Added archive functionality to copilot dropdown menus in both grid and table views
- June 30, 2025. Created comprehensive sample screens for all navigation sections (Agents, Tools, Workflows, Knowledge Base, Profile Fields, Subscriptions, Conversations, Analytics, Users) with realistic data and interactive elements
- June 30, 2025. Updated copilot status system from online/offline to active/archived, removed status indicators, and updated filtering system accordingly
- June 30, 2025. Modified chat interface to open as full screen instead of modal overlay when "Start Chat" is clicked, with improved layout and messaging
- June 30, 2025. Updated chat interface to open within main content area while keeping sidebar visible, replacing section content when chat is active
- June 30, 2025. Modified chat layout to hide top bar and fill entire right section when in chat mode, providing maximum space for conversation
- June 30, 2025. Added collapsible sidebar functionality with toggle button, smooth transitions, and adaptive icon-only mode when collapsed
- June 30, 2025. Removed duplicate title sections from all sample screens to avoid redundancy with main header area
- June 30, 2025. Changed main content layout to unified scrolling with header and content combined instead of sticky header
- June 30, 2025. Made component badges clickable with detailed modal showing description, capabilities, and configuration for agents, tools, and workflows
- June 30, 2025. Fixed chat interface to use fixed height layout instead of growing with messages for better UI consistency
- June 30, 2025. Moved profile fields to copilot-specific configuration and created comprehensive copilot configuration interface with tabbed design for general settings, components management, and target user profile fields
- June 30, 2025. Updated edit copilot functionality to open full-screen configuration interface instead of modal, allowing detailed component editing and profile field customization
- June 30, 2025. Restored Profile Fields section in main navigation while keeping copilot-specific profile field configuration - now supports both global field definitions and per-copilot target user personas
- June 30, 2025. Moved scope settings to advanced settings section and added dynamic code generation feature for public/embedded copilots showing JavaScript, iframe, and React integration code with copy functionality
- June 30, 2025. Implemented collapsible attachment sidebar positioned between main sidebar and content area, opens when chat attach button is clicked, automatically collapses main sidebar, provides comprehensive file upload interface with drag-and-drop, displays all files with file sizes and timestamps, and includes connected sources integration for Google Drive, GitHub, and Notion
- June 30, 2025. Fixed layout issues: resolved white bar at bottom of interface, corrected chat interface backgrounds to white, added Google Drive icon with proper hover effects, updated hover colors to #00d2a0, and fixed table styling with proper white background and rounded corners
- July 1, 2025. Added Knowledge Base tab to copilot configuration for managing copilot-specific documents and URLs
- July 1, 2025. Converted user profile area into interactive dropdown button with profile settings, account settings, and sign out options
- July 1, 2025. Added Pricing Plans button above user profile with internal pricing screen navigation and comprehensive plan comparison interface
- July 1, 2025. Updated grid layout to display 4 copilot cards per row on larger screens (xl:grid-cols-4)
- July 1, 2025. Redesigned copilot cards with real Unsplash images contained within card borders and 2:1 aspect ratio
- July 1, 2025. Added Play icon to "Start Chat" buttons and updated account profile to use real face photo
- July 1, 2025. Added 4th copilot "Customer Support" with support type, realistic components, and active status
- July 1, 2025. Improved text contrast by changing color from #999999 to #4E5964 for better readability throughout the interface
- July 1, 2025. Fixed collapsed sidebar design issues and updated Knolli logo to use circular icon version when collapsed
- July 1, 2025. Added "Add Workspace" link to workspace selector dropdown menu with proper styling
- July 1, 2025. Created comprehensive Workspace Settings screen with tabs for general settings, members, security, billing, and integrations
- July 1, 2025. Created User View preview screen showing what the platform looks like to end users (not admin mode)
- July 1, 2025. Updated User View welcome banner to 3:1 aspect ratio with proper vertical centering
- July 1, 2025. Removed admin dashboard header from User View page to show clean end-user interface
- July 1, 2025. Updated User View banner to use real background image with dark overlay for better text contrast
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```