import React, { useState, useEffect, useMemo } from 'react';
import { useLocation } from '../../contexts/LocationContext';
import { WeatherAPI } from '../../services/weatherAPI';
import { GeolocationAPI } from '../../services/geolocationAPI';

const GlobalLocationSearch = () => {
  const [city, setCity] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  
  const { 
    currentLocation, 
    setCurrentLocation, 
    locationError, 
    setLocationError,
    isLoadingLocation,
    setIsLoadingLocation
  } = useLocation();
  
  const weatherAPI = useMemo(() => new WeatherAPI(), []);
  const geolocationAPI = useMemo(() => new GeolocationAPI(), []);

  // Solicitar localização automaticamente na primeira carga
  useEffect(() => {
    const requestLocationOnFirstLoad = async () => {
      // Só solicitar se não houver localização salva
      if (!currentLocation && geolocationAPI.isGeolocationAvailable()) {
        try {
          setIsLoadingLocation(true);
          const locationData = await geolocationAPI.getCurrentLocationWithName();
          setCurrentLocation(locationData);
          setCity(locationData.name);
        } catch (error) {
          // Falhou silenciosamente - usuário pode usar busca manual
          console.log('Geolocalização automática não autorizada:', error.message);
        } finally {
          setIsLoadingLocation(false);
        }
      }
    };

    requestLocationOnFirstLoad();
  }, []);

  // Atualizar input quando localização global muda
  useEffect(() => {
    if (currentLocation) {
      setCity(currentLocation.name);
    }
  }, [currentLocation]);

  // Buscar sugestões com debounce
  useEffect(() => {
    const searchTimeout = setTimeout(async () => {
      if (city.length >= 2 && city !== currentLocation?.name) {
        try {
          const location = await weatherAPI.searchLocation(city);
          if (location) {
            setSuggestions([location]);
            setShowDropdown(true);
          } else {
            setSuggestions([]);
            setShowDropdown(false);
          }
        } catch (error) {
          setSuggestions([]);
          setShowDropdown(false);
        }
      } else {
        setSuggestions([]);
        setShowDropdown(false);
      }
    }, 300);

    return () => clearTimeout(searchTimeout);
  }, [city, currentLocation]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!city.trim()) return;

    setIsSearching(true);
    setLocationError('');
    
    try {
      const location = await weatherAPI.searchLocation(city.trim());
      
      if (!location) {
        setLocationError('Cidade não encontrada. Tente novamente.');
        return;
      }

      const locationData = {
        name: location.name,
        latitude: location.latitude,
        longitude: location.longitude,
        country: location.country || 'Brasil',
        source: 'search'
      };

      setCurrentLocation(locationData);
      setShowDropdown(false);
      setCity(location.name);
    } catch (error) {
      setLocationError('Erro de conexão. Verifique sua internet.');
    } finally {
      setIsSearching(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    const locationData = {
      name: suggestion.name,
      latitude: suggestion.latitude,
      longitude: suggestion.longitude,
      country: suggestion.country || 'Brasil',
      source: 'search'
    };

    setCurrentLocation(locationData);
    setCity(suggestion.name);
    setShowDropdown(false);
    setLocationError('');
  };

  const handleUseCurrentLocation = async () => {
    if (!geolocationAPI.isGeolocationAvailable()) {
      setLocationError('Geolocalização não disponível neste navegador.');
      return;
    }

    setIsLoadingLocation(true);
    setLocationError('');

    try {
      const locationData = await geolocationAPI.getCurrentLocationWithName();
      setCurrentLocation(locationData);
      setCity(locationData.name);
    } catch (error) {
      setLocationError(error.message);
    } finally {
      setIsLoadingLocation(false);
    }
  };

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="flex items-center space-x-2">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Buscar cidade..."
            disabled={isSearching || isLoadingLocation}
            className="w-full h-8 pl-10 pr-3 py-1 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-green-500 focus:border-green-500 disabled:bg-gray-100"
          />
          
          {/* Dropdown de sugestões */}
          {showDropdown && suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50 focus:bg-gray-50 focus:outline-none"
                >
                  <div className="font-medium">{suggestion.name}</div>
                  {suggestion.admin1 && (
                    <div className="text-xs text-gray-500">
                      {suggestion.admin1}, {suggestion.country || 'Brasil'}
                    </div>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
        
        {/* Botão de buscar */}
        <button
          type="submit"
          disabled={isSearching || isLoadingLocation || !city.trim()}
          className="h-8 px-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-1 focus:ring-green-500 disabled:bg-gray-400 disabled:cursor-not-allowed transition duration-200"
        >
          {isSearching ? (
            <svg className="animate-spin h-3 w-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          )}
        </button>

      </form>

      {/* Erro */}
      {locationError && (
        <div className="absolute top-full left-0 right-0 mt-1 text-xs text-red-600 bg-red-50 border border-red-200 rounded px-2 py-1">
          {locationError}
        </div>
      )}
    </div>
  );
};

export default GlobalLocationSearch;
