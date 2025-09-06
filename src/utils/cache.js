class Cache {
  constructor() {
    this.cache = new Map();
    this.timers = new Map();
  }

  // Definir TTL padrão para diferentes tipos de dados
  getDefaultTTL(type) {
    const ttlMap = {
      weather: 10 * 60 * 1000,      // 10 minutos para dados climáticos
      location: 60 * 60 * 1000,     // 1 hora para localização
      market: 5 * 60 * 1000,        // 5 minutos para dados de mercado
      crops: 30 * 60 * 1000,        // 30 minutos para dados de cultivo
      user: 24 * 60 * 60 * 1000,    // 24 horas para dados do usuário
      default: 15 * 60 * 1000       // 15 minutos padrão
    };
    return ttlMap[type] || ttlMap.default;
  }

  // Armazenar no cache com TTL
  set(key, data, type = 'default', customTTL = null) {
    const ttl = customTTL || this.getDefaultTTL(type);
    
    // Limpar timer anterior se existir
    if (this.timers.has(key)) {
      clearTimeout(this.timers.get(key));
    }

    // Armazenar dados com timestamp
    const cacheEntry = {
      data,
      timestamp: Date.now(),
      ttl,
      type
    };

    this.cache.set(key, cacheEntry);

    // Configurar timer para expiração automática
    const timer = setTimeout(() => {
      this.delete(key);
    }, ttl);

    this.timers.set(key, timer);

    // Log para debug (apenas em desenvolvimento)
    if (process.env.NODE_ENV === 'development') {
      console.log(`🗄️ Cache SET: ${key} (TTL: ${ttl/1000}s, Type: ${type})`);
    }
  }

  // Recuperar do cache
  get(key) {
    const entry = this.cache.get(key);
    
    if (!entry) {
      return null;
    }

    // Verificar se ainda está válido
    const now = Date.now();
    const isExpired = (now - entry.timestamp) > entry.ttl;

    if (isExpired) {
      this.delete(key);
      return null;
    }

    // Log para debug (apenas em desenvolvimento)
    if (process.env.NODE_ENV === 'development') {
      const remainingTime = Math.round((entry.ttl - (now - entry.timestamp)) / 1000);
      console.log(`📦 Cache HIT: ${key} (${remainingTime}s remaining)`);
    }

    return entry.data;
  }

  // Remover do cache
  delete(key) {
    if (this.timers.has(key)) {
      clearTimeout(this.timers.get(key));
      this.timers.delete(key);
    }
    
    const existed = this.cache.delete(key);
    
    if (existed && process.env.NODE_ENV === 'development') {
      console.log(`🗑️ Cache DELETE: ${key}`);
    }
    
    return existed;
  }

  // Verificar se existe no cache
  has(key) {
    const entry = this.cache.get(key);
    if (!entry) return false;

    const now = Date.now();
    const isExpired = (now - entry.timestamp) > entry.ttl;

    if (isExpired) {
      this.delete(key);
      return false;
    }

    return true;
  }

  // Limpar todo o cache
  clear() {
    this.timers.forEach(timer => clearTimeout(timer));
    this.timers.clear();
    this.cache.clear();
    
    if (process.env.NODE_ENV === 'development') {
      console.log('🧹 Cache cleared');
    }
  }

  // Obter estatísticas do cache
  getStats() {
    const entries = Array.from(this.cache.values());
    const now = Date.now();
    
    const stats = {
      totalEntries: entries.length,
      validEntries: entries.filter(entry => (now - entry.timestamp) <= entry.ttl).length,
      expiredEntries: entries.filter(entry => (now - entry.timestamp) > entry.ttl).length,
      types: {}
    };

    entries.forEach(entry => {
      if (!stats.types[entry.type]) {
        stats.types[entry.type] = 0;
      }
      stats.types[entry.type]++;
    });

    return stats;
  }

  // Limpar entradas expiradas manualmente
  cleanup() {
    const now = Date.now();
    const keysToDelete = [];

    this.cache.forEach((entry, key) => {
      const isExpired = (now - entry.timestamp) > entry.ttl;
      if (isExpired) {
        keysToDelete.push(key);
      }
    });

    keysToDelete.forEach(key => this.delete(key));
    
    if (process.env.NODE_ENV === 'development' && keysToDelete.length > 0) {
      console.log(`🧹 Cleaned up ${keysToDelete.length} expired cache entries`);
    }

    return keysToDelete.length;
  }
}

// Instância singleton do cache
const cacheInstance = new Cache();

// Hook personalizado para usar o cache
export const useCache = () => {
  return {
    get: (key) => cacheInstance.get(key),
    set: (key, data, type, ttl) => cacheInstance.set(key, data, type, ttl),
    delete: (key) => cacheInstance.delete(key),
    has: (key) => cacheInstance.has(key),
    clear: () => cacheInstance.clear(),
    getStats: () => cacheInstance.getStats(),
    cleanup: () => cacheInstance.cleanup()
  };
};

// Função utilitária para gerar chaves de cache
export const generateCacheKey = (...parts) => {
  return parts.filter(Boolean).join(':');
};

// Wrapper para APIs com cache automático
export const withCache = async (cacheKey, fetchFunction, type = 'default', ttl = null) => {
  // Tentar recuperar do cache primeiro
  const cachedData = cacheInstance.get(cacheKey);
  if (cachedData) {
    return cachedData;
  }

  try {
    // Se não estiver em cache, buscar os dados
    const data = await fetchFunction();
    
    // Armazenar no cache apenas se os dados forem válidos
    if (data !== null && data !== undefined) {
      cacheInstance.set(cacheKey, data, type, ttl);
    }
    
    return data;
  } catch (error) {
    console.error(`Error fetching data for cache key ${cacheKey}:`, error);
    throw error;
  }
};

// Auto-limpeza periódica (executar a cada 30 minutos)
setInterval(() => {
  cacheInstance.cleanup();
}, 30 * 60 * 1000);

export default cacheInstance;