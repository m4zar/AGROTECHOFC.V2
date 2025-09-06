import React, { createContext, useContext, useState, useEffect } from 'react';

const LocationContext = createContext();

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocation deve ser usado dentro de LocationProvider');
  }
  return context;
};

export const LocationProvider = ({ children }) => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [locationError, setLocationError] = useState('');
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

  // Carregar localização salva no localStorage
  useEffect(() => {
    const savedLocation = localStorage.getItem('agroinfo-current-location');
    if (savedLocation) {
      try {
        setCurrentLocation(JSON.parse(savedLocation));
      } catch (error) {
        console.error('Erro ao carregar localização salva:', error);
        localStorage.removeItem('agroinfo-current-location');
      }
    }
  }, []);

  // Salvar localização no localStorage sempre que mudar
  const updateLocation = (location) => {
    setCurrentLocation(location);
    if (location) {
      localStorage.setItem('agroinfo-current-location', JSON.stringify(location));
    } else {
      localStorage.removeItem('agroinfo-current-location');
    }
  };

  const clearLocation = () => {
    setCurrentLocation(null);
    localStorage.removeItem('agroinfo-current-location');
  };

  const value = {
    currentLocation,
    setCurrentLocation: updateLocation,
    clearLocation,
    locationError,
    setLocationError,
    isLoadingLocation,
    setIsLoadingLocation
  };

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
};

export default LocationContext;