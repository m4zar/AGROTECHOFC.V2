import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for existing auth on app load
  useEffect(() => {
    const savedAuth = localStorage.getItem('agroinfo-auth');
    const savedUser = localStorage.getItem('agroinfo-user');
    
    if (savedAuth && savedUser) {
      try {
        setIsAuthenticated(JSON.parse(savedAuth));
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing saved auth:', error);
        localStorage.removeItem('agroinfo-auth');
        localStorage.removeItem('agroinfo-user');
      }
    }
    
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    
    try {
      // Simulate API call - replace with real authentication
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock validation - replace with real validation
      if (email && password.length >= 6) {
        const userData = {
          id: 1,
          email: email,
          name: email.split('@')[0],
          role: 'farmer',
          joinedAt: new Date().toISOString()
        };
        
        setUser(userData);
        setIsAuthenticated(true);
        
        // Persist to localStorage
        localStorage.setItem('agroinfo-auth', 'true');
        localStorage.setItem('agroinfo-user', JSON.stringify(userData));
        
        return { success: true };
      } else {
        throw new Error('Credenciais inválidas');
      }
    } catch (error) {
      return { 
        success: false, 
        error: error.message || 'Erro ao fazer login. Tente novamente.' 
      };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('agroinfo-auth');
    localStorage.removeItem('agroinfo-user');
  };

  const register = async (name, email, password) => {
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock registration - replace with real API
      if (name && email && password.length >= 6) {
        const userData = {
          id: Date.now(),
          email: email,
          name: name,
          role: 'farmer',
          joinedAt: new Date().toISOString()
        };
        
        setUser(userData);
        setIsAuthenticated(true);
        
        // Persist to localStorage
        localStorage.setItem('agroinfo-auth', 'true');
        localStorage.setItem('agroinfo-user', JSON.stringify(userData));
        
        return { success: true };
      } else {
        throw new Error('Todos os campos são obrigatórios');
      }
    } catch (error) {
      return { 
        success: false, 
        error: error.message || 'Erro ao criar conta. Tente novamente.' 
      };
    } finally {
      setLoading(false);
    }
  };

  const value = {
    isAuthenticated,
    user,
    loading,
    login,
    logout,
    register
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};