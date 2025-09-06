import { WeatherAPI } from './weatherAPI';

export class GeolocationAPI {
  constructor() {
    this.weatherAPI = new WeatherAPI();
  }

  // Obter localização atual do usuário
  async getCurrentLocation() {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocalização não é suportada por este navegador.'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy
          });
        },
        (error) => {
          let errorMessage = 'Erro ao obter localização.';
          
          switch(error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = 'Acesso à localização foi negado. Permita o acesso para usar esta funcionalidade.';
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = 'Localização não disponível. Verifique se o GPS está ativado.';
              break;
            case error.TIMEOUT:
              errorMessage = 'Tempo limite para obter localização excedido.';
              break;
          }
          
          reject(new Error(errorMessage));
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000 // 5 minutos
        }
      );
    });
  }

  // Converter coordenadas em nome da cidade (reverse geocoding)
  async getLocationName(latitude, longitude) {
    try {
      // Open-Meteo reverse geocoding endpoint
      const response = await fetch(
        `${this.weatherAPI.geocodingURL}/reverse?latitude=${latitude}&longitude=${longitude}&count=1&language=pt&format=json`
      );
      const data = await response.json();
      
      if (data.results && data.results.length > 0) {
        const location = data.results[0];
        return {
          name: location.name,
          latitude: location.latitude,
          longitude: location.longitude,
          country: location.country || 'Brasil',
          admin1: location.admin1 || '',
          admin2: location.admin2 || ''
        };
      }
      
      return null;
    } catch (error) {
      console.error('Erro ao buscar nome da localização:', error);
      return null;
    }
  }

  // Função completa: obter localização atual + nome da cidade
  async getCurrentLocationWithName() {
    try {
      // Primeiro obtém as coordenadas
      const coordinates = await this.getCurrentLocation();
      
      // Depois converte em nome da cidade
      const locationData = await this.getLocationName(
        coordinates.latitude, 
        coordinates.longitude
      );
      
      if (locationData) {
        return {
          ...locationData,
          accuracy: coordinates.accuracy,
          source: 'geolocation' // Indica que veio da geolocalização
        };
      } else {
        // Se não conseguiu o nome, retorna só as coordenadas
        return {
          name: `${coordinates.latitude.toFixed(4)}, ${coordinates.longitude.toFixed(4)}`,
          latitude: coordinates.latitude,
          longitude: coordinates.longitude,
          accuracy: coordinates.accuracy,
          source: 'geolocation'
        };
      }
    } catch (error) {
      throw error;
    }
  }

  // Verificar se geolocalização está disponível
  isGeolocationAvailable() {
    return 'geolocation' in navigator;
  }

  // Verificar se usuário já deu permissão para geolocalização
  async checkGeolocationPermission() {
    if (!navigator.permissions) {
      return 'unsupported';
    }

    try {
      const permission = await navigator.permissions.query({ name: 'geolocation' });
      return permission.state; // 'granted', 'denied', ou 'prompt'
    } catch (error) {
      return 'unsupported';
    }
  }
}
