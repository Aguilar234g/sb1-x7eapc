import React from 'react';
import { useCart } from '../context/CartContext';
import { Trash2 } from 'lucide-react';

const Cart: React.FC = () => {
  const { cart, removeFromCart, clearCart, getCartTotal } = useCart();

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Carrito de Compras</h1>
        <p>Tu carrito está vacío.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Carrito de Compras</h1>
      <div className="space-y-4">
        {cart.map((item) => (
          <div key={item.id} className="flex items-center justify-between border-b pb-4">
            <div className="flex items-center">
              <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover mr-4" />
              <div>
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-gray-600">Cantidad: {item.quantity}</p>
                <p className="text-gray-600">Precio: {item.price.toFixed(2)} €</p>
              </div>
            </div>
            <button
              onClick={() => removeFromCart(item.id)}
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 size={20} />
            </button>
          </div>
        ))}
      </div>
      <div className="mt-8">
        <p className="text-xl font-bold">Total: {getCartTotal().toFixed(2)} €</p>
        <div className="mt-4 space-x-4">
          <button
            onClick={clearCart}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors duration-300"
          >
            Vaciar Carrito
          </button>
          <button className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition-colors duration-300">
            Proceder al Pago
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;