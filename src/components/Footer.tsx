import React from 'react';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h3 className="text-lg font-semibold mb-2">GaelDeco</h3>
            <p className="text-sm">Tu tienda de decoración favorita</p>
          </div>
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h4 className="text-lg font-semibold mb-2">Enlaces Rápidos</h4>
            <ul className="text-sm">
              <li><a href="/" className="hover:text-indigo-400">Inicio</a></li>
              <li><a href="/productos" className="hover:text-indigo-400">Productos</a></li>
              <li><a href="/sobre-nosotros" className="hover:text-indigo-400">Sobre Nosotros</a></li>
              <li><a href="/contacto" className="hover:text-indigo-400">Contacto</a></li>
            </ul>
          </div>
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h4 className="text-lg font-semibold mb-2">Contacto</h4>
            <p className="text-sm">
              Calle Principal 123<br />
              Ciudad, País<br />
              Teléfono: (123) 456-7890<br />
              Email: info@gaeldeco.store
            </p>
          </div>
          <div className="w-full md:w-1/4">
            <h4 className="text-lg font-semibold mb-2">Síguenos</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-indigo-400"><Facebook size={24} /></a>
              <a href="#" className="text-white hover:text-indigo-400"><Instagram size={24} /></a>
              <a href="#" className="text-white hover:text-indigo-400"><Twitter size={24} /></a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-4 text-sm text-center">
          © 2024 GaelDeco. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;