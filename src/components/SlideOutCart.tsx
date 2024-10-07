import React from 'react';
import { useCart } from '../context/CartContext';
import { X, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

interface SlideOutCartProps {
  isOpen: boolean;
  onClose: () => void;
}

const SlideOutCart: React.FC<SlideOutCartProps> = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, clearCart, getCartTotal } = useCart();

  return (
    <div className={`fixed inset-y-0 right-0 w-80 bg-white shadow-lg transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out z-50`}>
      <div className="flex flex-col h-full">
        <div className="p-4 border-b">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold">Carrito</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X size={24} />
            </button>
          </div>
        </div>
        <div className="flex-grow overflow-y-auto p-4">
          {cart.length === 0 ? (
            <p>Tu carrito está vacío.</p>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex items-center mb-4 bg-gray-50 p-2 rounded">
                <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover rounded mr-3" />
                <div className="flex-grow">
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-600">{item.quantity} x {item.price.toFixed(2)} €</p>
                </div>
                <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700 ml-2">
                  <Trash2 size={18} />
                </button>
              </div>
            ))
          )}
        </div>
        {cart.length > 0 && (
          <div className="p-4 border-t">
            <div className="mb-4">
              <p className="font-bold text-lg">Total: {getCartTotal().toFixed(2)} €</p>
            </div>
            <div className="space-y-2">
              <button onClick={clearCart} className="w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors duration-300">
                Vaciar Carrito
              </button>
              <Link 
                to="/checkout" 
                onClick={onClose}
                className="w-full bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition-colors duration-300 text-center block"
              >
                Ir al Pago
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SlideOutCart;