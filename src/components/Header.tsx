import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Home, User, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

interface HeaderProps {
  toggleCart: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleCart }) => {
  const { isAuthenticated, isAdmin, logout } = useAuth();
  const { cart } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white bg-opacity-90 shadow-md sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <Home className="h-8 w-8 text-indigo-600 mr-2" />
            <span className="text-xl font-semibold text-gray-800">GaelDeco</span>
          </Link>
          <div className="hidden md:flex space-x-4">
            <Link to="/" className="text-gray-600 hover:text-indigo-600">Inicio</Link>
            <Link to="/productos" className="text-gray-600 hover:text-indigo-600">Productos</Link>
            <Link to="/sobre-nosotros" className="text-gray-600 hover:text-indigo-600">Sobre Nosotros</Link>
            <Link to="/contacto" className="text-gray-600 hover:text-indigo-600">Contacto</Link>
            {isAdmin && (
              <Link to="/admin" className="text-gray-600 hover:text-indigo-600">Admin</Link>
            )}
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <button onClick={toggleCart} className="relative">
              <ShoppingCart className="h-6 w-6 text-gray-600 hover:text-indigo-600 cursor-pointer" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cart.length}
                </span>
              )}
            </button>
            {isAuthenticated ? (
              <button onClick={logout} className="text-gray-600 hover:text-indigo-600">Cerrar Sesión</button>
            ) : (
              <Link to="/iniciar-sesion" className="flex items-center text-gray-600 hover:text-indigo-600">
                <User className="h-6 w-6 mr-1" />
                <span>Iniciar Sesión</span>
              </Link>
            )}
          </div>
          <button className="md:hidden" onClick={toggleMenu}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
        {isMenuOpen && (
          <div className="md:hidden mt-4">
            <nav className="flex flex-col space-y-2">
              <Link to="/" className="text-gray-600 hover:text-indigo-600" onClick={toggleMenu}>Inicio</Link>
              <Link to="/productos" className="text-gray-600 hover:text-indigo-600" onClick={toggleMenu}>Productos</Link>
              <Link to="/sobre-nosotros" className="text-gray-600 hover:text-indigo-600" onClick={toggleMenu}>Sobre Nosotros</Link>
              <Link to="/contacto" className="text-gray-600 hover:text-indigo-600" onClick={toggleMenu}>Contacto</Link>
              {isAdmin && (
                <Link to="/admin" className="text-gray-600 hover:text-indigo-600" onClick={toggleMenu}>Admin</Link>
              )}
              <div className="flex items-center space-x-4 mt-2">
                <button onClick={() => { toggleCart(); toggleMenu(); }} className="relative">
                  <ShoppingCart className="h-6 w-6 text-gray-600 hover:text-indigo-600 cursor-pointer" />
                  {cart.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                      {cart.length}
                    </span>
                  )}
                </button>
                {isAuthenticated ? (
                  <button onClick={() => { logout(); toggleMenu(); }} className="text-gray-600 hover:text-indigo-600">Cerrar Sesión</button>
                ) : (
                  <Link to="/iniciar-sesion" className="flex items-center text-gray-600 hover:text-indigo-600" onClick={toggleMenu}>
                    <User className="h-6 w-6 mr-1" />
                    <span>Iniciar Sesión</span>
                  </Link>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;