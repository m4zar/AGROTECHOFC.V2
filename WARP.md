# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Development Commands

### Core Development
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Install dependencies
npm install
```

### Development Server
- The dev server runs on http://localhost:5173 (Vite default)
- Server configuration in `vite.config.js` includes automatic browser opening

## Project Architecture

### Tech Stack
- **Frontend**: React 18 with Vite
- **Styling**: Tailwind CSS (loaded via CDN in index.html)
- **Charts**: Chart.js with react-chartjs-2
- **Forms**: react-hook-form
- **Animation**: Framer Motion
- **UI Components**: Headless UI
- **Routing**: React Router DOM v7

### Application Structure

This is an agricultural dashboard application called "AgroInfo" that provides climate monitoring and agricultural intelligence.

#### Core Application Components
- **App.jsx**: Main application with React Router setup, context providers
- **ClimaDashboard.jsx**: Comprehensive climate monitoring dashboard
- **main.jsx**: React application entry point

#### Context Architecture
- **AuthContext**: Authentication state management with localStorage persistence
  - Handles login/logout, user state, mock authentication
- **LocationContext**: Global location management for weather data
  - Manages current location state, localStorage persistence

#### Routing Structure
```
/ (Home) - Public landing page
/login - Authentication page
/dashboard/* - Protected routes:
  - /dashboard - Main dashboard
  - /dashboard/monitoramento-climatico - Climate monitoring
  - /dashboard/analise-mercado - Market analysis  
  - /dashboard/gestao-cultivo - Crop management
```

#### Key Features
- **Weather Integration**: Uses Open-Meteo API for real-time weather data
- **Caching System**: Custom cache utility for API responses
- **Authentication**: Mock auth system with localStorage persistence
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Interactive Charts**: Multiple chart types for weather data visualization

### Service Layer
- **weatherAPI.js**: Weather data service using Open-Meteo API
  - Includes caching, location search, weather forecasts
- **geolocationAPI.js**: Geolocation services
- **config.js**: Configuration constants

### Component Architecture
```
components/
├── auth/           - Authentication components
├── layout/         - Layout components (Navbar, Footer, Layout)
├── sections/       - Landing page sections (Hero, Demo, etc.)
├── ui/            - Reusable UI components
└── weather/       - Weather-specific components (charts, cards)
```

### State Management Patterns
- React Context for global state (Auth, Location)
- Local state for component-specific data
- Custom cache utility for API response caching

### API Integration
- **Open-Meteo API**: Free weather API service
- **Caching Strategy**: Custom cache with TTL for different data types
- **Error Handling**: Comprehensive error states throughout the app

## Development Guidelines

### File Organization
- Components are organized by feature/purpose in subdirectories
- Shared utilities in `utils/` directory
- All contexts in `contexts/` directory
- Service layer in `services/` directory

### Styling Approach
- Tailwind CSS classes used throughout
- Custom CSS in index.html for specific styling
- Component-level styling using Tailwind utilities
- Responsive design patterns implemented

### Data Flow
1. LocationContext manages global location state
2. WeatherAPI service fetches data based on location
3. Custom caching prevents excessive API calls
4. Components consume data through context or props

### Performance Considerations
- Vite for fast development and building
- React.StrictMode enabled for development
- Chart.js with tree-shaking for optimal bundle size
- API response caching to minimize network requests

## Key Development Notes

### Authentication System
- Currently uses mock authentication (replace with real API)
- User data stored in localStorage as 'agroinfo-auth' and 'agroinfo-user'
- ProtectedRoute component handles route protection

### Weather Data Flow
1. User selects location or uses geolocation
2. WeatherAPI.searchLocation() finds coordinates
3. WeatherAPI.getWeatherData() fetches weather data
4. Data is cached and displayed in various chart components
5. Components like WeatherChart, HumidityChart render visualizations

### Build Configuration
- Vite configuration in `vite.config.js`
- Custom build output naming in rollupOptions
- React plugin configured for .jsx/.tsx files
- Dev server opens automatically on start
