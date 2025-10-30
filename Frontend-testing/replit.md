# Perpustakaan Digital (Digital Library)

## Overview

Perpustakaan Digital is a digital library management system built with Vue 3 and Vite. The application provides a modern interface for managing books, members, and library operations. It features a responsive design using Tailwind CSS and includes functionality for book management, member registration, search capabilities, and member verification.

## Recent Changes

**October 25, 2025 - Complete HTML to Vue.js Conversion**
- Successfully converted all 8 HTML pages from `Template FrontEnd/` folder to Vue.js Single File Components
- Created reusable Navbar component shared across all pages
- Implemented Vue Router with 8 routes: Home (/), Login (/login), Register (/register), Books (/books), Members (/members), CheckMember (/check-member), Search (/search), and Table (/table)
- Configured Vite development server on port 5000 with host exposure for external access
- All pages maintain original Tailwind CSS styling and FontAwesome icons
- Application is fully functional as a Single Page Application (SPA)

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build Tool**
- **Vue 3** with Composition API for reactive UI components
- **Vite** as the build tool and development server for fast HMR (Hot Module Replacement)
- Server configured to run on port 5000 with host exposure enabled for external access

**Routing**
- **Vue Router 4** for client-side navigation
- Route structure includes: Home, Login, Register, Books, Members, CheckMember, Search, and Table views
- Uses HTML5 History Mode for clean URLs

**Styling Approach**
- **Tailwind CSS** (via CDN) for utility-first styling
- Gradient-based color scheme (blue to indigo) for modern aesthetics
- Custom CSS variables for theming with light/dark mode support
- Responsive design with mobile-first approach
- Glassmorphism effects (backdrop-blur) for modern UI elements

**Component Structure**
- Single-file components (.vue) for each view in `src/views/` directory
- Reusable Navbar component in `src/components/Navbar.vue` used across all pages
- Path aliasing configured (`@` → `./src`) for clean imports
- All pages successfully converted from static HTML templates in `Template FrontEnd/` directory
- Each component uses Vue 3 Composition API with `<script setup>` syntax

### Data Management

**Current State**
- No backend or database integration currently implemented
- Application is fully functional as a Vue.js SPA (Single Page Application)
- All pages converted to Vue components with routing enabled
- Frontend-only at this stage with local state management in components

**Anticipated Architecture**
- Forms and data tables suggest future integration with REST API or similar backend
- Member management, book cataloging, and search features will require persistent storage
- DataTables.js integration present in templates indicates planned table-based data display

### Authentication & Authorization

**Planned Features**
- Login and registration forms present in templates
- No authentication mechanism currently implemented
- Username/password form structure suggests traditional authentication approach
- Password visibility toggle implemented in login form

### UI/UX Design Patterns

**Navigation**
- Sticky navigation bar with backdrop blur effect
- Responsive mobile menu with hamburger toggle
- Active route highlighting with colored backgrounds
- Consistent navigation across all pages

**Forms**
- Icon-prefixed input fields for visual clarity
- Form validation structure prepared (client-side)
- Gradient buttons for primary actions
- Accessible form labels and placeholders

**Visual Design**
- Gradient backgrounds for visual depth
- Card-based layouts with soft shadows
- Smooth transitions and hover effects
- FontAwesome 6 icons for consistent iconography

## External Dependencies

### CDN-Based Dependencies

**Styling**
- **Tailwind CSS** (via cdn.tailwindcss.com) - Utility-first CSS framework
- **FontAwesome 6.4.0** - Icon library for UI elements

**Data Presentation**
- **DataTables 2.3.4** - Advanced table functionality with sorting, pagination, and search (planned for data-heavy views)
- **jQuery 3.7.1** - Required for DataTables functionality

### NPM Dependencies

**Core Framework**
- `vue@^3.3.4` - Progressive JavaScript framework
- `vue-router@^4.6.3` - Official router for Vue.js

**Build Tools**
- `vite@^4.5.1` - Next generation frontend tooling
- `@vitejs/plugin-vue@^4.2.3` - Official Vue plugin for Vite

### Development Setup

- Node.js environment required for package management
- Development server runs on `localhost:5000`
- Production build outputs optimized static files
- Hot module replacement enabled for development

### Future Integration Considerations

- Backend API integration likely needed for CRUD operations
- Database system (potentially Postgres with Drizzle ORM based on Vue/Vite stack preferences)
- Authentication service for login/register functionality
- File upload capability for book covers or member photos
- Search indexing service for advanced book/member search