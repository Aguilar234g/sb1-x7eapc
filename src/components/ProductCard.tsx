import React from 'react'
import { ShoppingCart, ChevronLeft, ChevronRight } from 'lucide-react'
import { useCart } from '../context/CartContext';

interface Product {
  id: string;
  name: string;
  price: number;
  imageUrls: string[];
  description: string;
}

interface ProductCardProps {
  product: Product
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  const { addToCart } = useCart();

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === product.imageUrls.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? product.imageUrls.length - 1 : prevIndex - 1
    );
  };

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      imageUrl: product.imageUrls[currentImageIndex] // Usa la imagen actual
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative h-48">
        <img 
          src={product.imageUrls[currentImageIndex]} 
          alt={product.name} 
          className="w-full h-full object-cover"
        />
        {product.imageUrls.length > 1 && (
          <>
            <button 
              onClick={prevImage} 
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-1 rounded-r"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={nextImage} 
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-1 rounded-l"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
        <p className="text-gray-600 mb-4">{product.price.toFixed(2)} €</p>
        <button 
          onClick={handleAddToCart}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition-colors duration-300 flex items-center justify-center w-full"
        >
          <ShoppingCart className="h-5 w-5 mr-2" />
          Agregar al carrito
        </button>
      </div>
    </div>
  )
}

export default ProductCard