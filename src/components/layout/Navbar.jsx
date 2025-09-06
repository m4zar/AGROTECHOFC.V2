import React, { useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import AccountPopup from '../ui/AccountPopup';
import GlobalLocationSearch from '../ui/GlobalLocationSearch';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAccountPopupOpen, setIsAccountPopupOpen] = useState(false);
  const accountButtonRef = useRef(null);
  const location = useLocation();
  const { isAuthenticated, user, logout } = useAuth();

  const isActive = (path) => location.pathname === path;

  const scrollToSection = (sectionId) => {
    if (location.pathname !== '/') {
      // If not on home page, navigate to home first then scroll
      window.location.href = `/#${sectionId}`;
      return;
    }
    
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-sm fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <img 
              src="/img/logo-agroinfo.png" 
              alt="AgroInfo" 
              className="h-8 mr-3" 
              onError={(e) => e.target.style.display = 'none'}
            />
            <Link to="/" className="text-2xl font-bold text-green-700">
              AgroInfo
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {!isAuthenticated ? (
              // Public navigation (Home page)
              <>
                <button 
                  onClick={() => scrollToSection('home')}
                  className="text-sm text-gray-700 hover:text-green-600 font-medium transition-colors"
                >
                  Início
                </button>
                <button 
                  onClick={() => scrollToSection('servicos')}
                  className="text-sm text-gray-700 hover:text-green-600 font-medium transition-colors"
                >
                  Serviços
                </button>
                <button 
                  onClick={() => scrollToSection('demo')}
                  className="text-sm text-gray-700 hover:text-green-600 font-medium transition-colors"
                >
                  Demo
                </button>
                <button 
                  onClick={() => scrollToSection('como-funciona')}
                  className="text-sm text-gray-700 hover:text-green-600 font-medium transition-colors"
                >
                  Como Funciona
                </button>
                <button 
                  onClick={() => scrollToSection('depoimentos')}
                  className="text-sm text-gray-700 hover:text-green-600 font-medium transition-colors"
                >
                  Depoimentos
                </button>
                <button 
                  onClick={() => scrollToSection('contato')}
                  className="text-sm text-gray-700 hover:text-green-600 font-medium transition-colors"
                >
                  Contato
                </button>
              </>
            ) : (
              // Authenticated navigation - Direct links
              <>
                <Link 
                  to="/dashboard"
                  className={`text-sm font-medium transition-colors ${
                    isActive('/dashboard') && !location.pathname.includes('/dashboard/') 
                      ? 'text-green-600' 
                      : 'text-gray-700 hover:text-green-600'
                  }`}
                >
                  Dashboard
                </Link>
                <Link 
                  to="/dashboard/monitoramento-climatico"
                  className={`text-sm font-medium transition-colors ${
                    isActive('/dashboard/monitoramento-climatico') 
                      ? 'text-green-600' 
                      : 'text-gray-700 hover:text-green-600'
                  }`}
                >
                  Monitoramento Climático
                </Link>
                <Link 
                  to="/dashboard/analise-mercado"
                  className={`text-sm font-medium transition-colors ${
                    isActive('/dashboard/analise-mercado') 
                      ? 'text-green-600' 
                      : 'text-gray-700 hover:text-green-600'
                  }`}
                >
                  Análise de Mercado
                </Link>
                <Link 
                  to="/dashboard/gestao-cultivo"
                  className={`text-sm font-medium transition-colors ${
                    isActive('/dashboard/gestao-cultivo') 
                      ? 'text-green-600' 
                      : 'text-gray-700 hover:text-green-600'
                  }`}
                >
                  Gestão de Cultivo
                </Link>
              </>
            )}
          </div>

          {/* Right Side - Location + User */}
          <div className="flex items-center space-x-3">
            {!isAuthenticated ? (
              <>
                <Link 
                  to="/login"
                  className="text-green-600 hover:text-green-700 font-medium transition-colors"
                >
                  Login
                </Link>
                <Link 
                  to="/login"
                  className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Cadastro
                </Link>
              </>
            ) : (
              <>
                {/* Global Location Search */}
                <div className="max-w-xs">
                  <GlobalLocationSearch />
                </div>
                
                {/* User Account */}
                <div className="relative">
                  <button 
                    ref={accountButtonRef}
                    onClick={() => setIsAccountPopupOpen(!isAccountPopupOpen)}
                    className="bg-green-600 text-white px-3 py-1.5 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium flex items-center space-x-1.5"
                  >
                    <span>{user?.name?.split(' ')[0] || 'Usuário'}</span>
                    <svg className={`w-3 h-3 transition-transform ${isAccountPopupOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <AccountPopup 
                    isOpen={isAccountPopupOpen}
                    onClose={() => setIsAccountPopupOpen(false)}
                    anchorRef={accountButtonRef}
                  />
                </div>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-green-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-2">
              {location.pathname === '/' ? (
                <>
                  <button 
                    onClick={() => scrollToSection('home')}
                    className="text-left px-4 py-2 text-gray-700 hover:text-green-600 hover:bg-gray-50 rounded transition-colors"
                  >
                    Início
                  </button>
                  <button 
                    onClick={() => scrollToSection('servicos')}
                    className="text-left px-4 py-2 text-gray-700 hover:text-green-600 hover:bg-gray-50 rounded transition-colors"
                  >
                    Serviços
                  </button>
                  <button 
                    onClick={() => scrollToSection('demo')}
                    className="text-left px-4 py-2 text-gray-700 hover:text-green-600 hover:bg-gray-50 rounded transition-colors"
                  >
                    Demo
                  </button>
                  <button 
                    onClick={() => scrollToSection('como-funciona')}
                    className="text-left px-4 py-2 text-gray-700 hover:text-green-600 hover:bg-gray-50 rounded transition-colors"
                  >
                    Como Funciona
                  </button>
                  <button 
                    onClick={() => scrollToSection('depoimentos')}
                    className="text-left px-4 py-2 text-gray-700 hover:text-green-600 hover:bg-gray-50 rounded transition-colors"
                  >
                    Depoimentos
                  </button>
                  <button 
                    onClick={() => scrollToSection('contato')}
                    className="text-left px-4 py-2 text-gray-700 hover:text-green-600 hover:bg-gray-50 rounded transition-colors"
                  >
                    Contato
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    to="/dashboard"
                    className="block px-4 py-2 text-gray-700 hover:text-green-600 hover:bg-gray-50 rounded transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link 
                    to="/dashboard/monitoramento-climatico"
                    className="block px-4 py-2 text-gray-700 hover:text-green-600 hover:bg-gray-50 rounded transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Monitoramento Climático
                  </Link>
                  <Link 
                    to="/dashboard/analise-mercado"
                    className="block px-4 py-2 text-gray-700 hover:text-green-600 hover:bg-gray-50 rounded transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Análise de Mercado
                  </Link>
                  <Link 
                    to="/dashboard/gestao-cultivo"
                    className="block px-4 py-2 text-gray-700 hover:text-green-600 hover:bg-gray-50 rounded transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Gestão de Cultivo
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;