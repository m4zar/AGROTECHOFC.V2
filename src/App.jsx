import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { LocationProvider } from './contexts/LocationContext';
import Layout from './components/layout/Layout';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ClimaDashboard from './ClimaDashboard';
import MarketAnalysis from './pages/MarketAnalysis';
import CropManagement from './pages/CropManagement';

function App() {
  return (
    <AuthProvider>
      <LocationProvider>
        <Router>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
            </Route>
            <Route path="/login" element={<Login />} />
            
            {/* Protected routes */}
            <Route path="/dashboard" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
              <Route index element={<Dashboard />} />
              <Route path="monitoramento-climatico" element={<ClimaDashboard />} />
              <Route path="analise-mercado" element={<MarketAnalysis />} />
              <Route path="gestao-cultivo" element={<CropManagement />} />
            </Route>
          </Routes>
        </Router>
      </LocationProvider>
    </AuthProvider>
  );
}

export default App;