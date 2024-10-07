import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import Admin from './pages/Admin';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import SlideOutCart from './components/SlideOutCart';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className="flex flex-col min-h-screen">
            <Header toggleCart={toggleCart} />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/productos" element={<Products />} />
                <Route path="/sobre-nosotros" element={<About />} />
                <Route path="/contacto" element={<Contact />} />
                <Route path="/iniciar-sesion" element={<Login />} />
                <Route path="/registrarse" element={<Register />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/carrito" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
              </Routes>
            </main>
            <Footer />
            <SlideOutCart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;