import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { CreditCard } from 'lucide-react';

const Checkout: React.FC = () => {
  const { cart, getCartTotal, clearCart } = useCart();
  const [cardInfo, setCardInfo] = useState({
    number: '',
    name: '',
    expiry: '',
    cvc: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Aquí iría la lógica de procesamiento del pago
    alert('Pago procesado con éxito!');
    clearCart();
    // Redirigir a una página de confirmación
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Finalizar Compra</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">Resumen del Pedido</h2>
          {cart.map(item => (
            <div key={item.id} className="flex justify-between items-center mb-2">
              <span>{item.name} x {item.quantity}</span>
              <span>{(item.price * item.quantity).toFixed(2)} €</span>
            </div>
          ))}
          <div className="border-t pt-2 mt-4">
            <div className="flex justify-between items-center font-bold">
              <span>Total</span>
              <span>{getCartTotal().toFixed(2)} €</span>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">Método de Pago</h2>
          <div className="flex items-center mb-4">
            <CreditCard className="mr-2" />
            <span>Tarjeta de Crédito</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="number" className="block mb-1">Número de Tarjeta</label>
              <input
                type="text"
                id="number"
                name="number"
                value={cardInfo.number}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>
            <div>
              <label htmlFor="name" className="block mb-1">Nombre en la Tarjeta</label>
              <input
                type="text"
                id="name"
                name="name"
                value={cardInfo.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border rounded"
                required
              />
            </div>
            <div className="flex space-x-4">
              <div className="flex-1">
                <label htmlFor="expiry" className="block mb-1">Fecha de Expiración</label>
                <input
                  type="text"
                  id="expiry"
                  name="expiry"
                  value={cardInfo.expiry}
                  onChange={handleInputChange}
                  placeholder="MM/AA"
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
              <div className="flex-1">
                <label htmlFor="cvc" className="block mb-1">CVC</label>
                <input
                  type="text"
                  id="cvc"
                  name="cvc"
                  value={cardInfo.cvc}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded"
                  required
                />
              </div>
            </div>
            <button type="submit" className="w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition-colors duration-300">
              Pagar {getCartTotal().toFixed(2)} €
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;