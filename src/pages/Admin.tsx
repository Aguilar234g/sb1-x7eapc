import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { db, storage } from '../firebase';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

interface ProductForm {
  id?: string;
  name: string;
  price: string;
  images: File[];
  imageUrls: string[];
  description: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
  imageUrls: string[];
  description: string;
}

const Admin: React.FC = () => {
  const { user, isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [product, setProduct] = useState<ProductForm>({
    name: '',
    price: '',
    images: [],
    imageUrls: [],
    description: ''
  });
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (!isAuthenticated || !isAdmin) {
      navigate('/iniciar-sesion');
    } else {
      fetchProducts();
    }
  }, [isAuthenticated, isAdmin, navigate]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, 'products'));
      const productsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Product));
      setProducts(productsData);
    } catch (error) {
      console.error('Error al cargar los productos:', error);
      alert('Error al cargar los productos. Por favor, intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setProduct(prev => ({ ...prev, images: [...prev.images, ...Array.from(e.target.files)] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const imageUrls = await Promise.all(
        product.images.map(async (image) => {
          const storageRef = ref(storage, `products/${image.name}`);
          await uploadBytes(storageRef, image);
          return getDownloadURL(storageRef);
        })
      );

      const productData = {
        name: product.name,
        price: parseFloat(product.price),
        imageUrls,
        description: product.description
      };

      if (isEditing && product.id) {
        await updateDoc(doc(db, 'products', product.id), productData);
      } else {
        await addDoc(collection(db, 'products'), productData);
      }

      setProduct({ name: '', price: '', images: [], imageUrls: [], description: '' });
      setIsEditing(false);
      fetchProducts();
    } catch (error) {
      console.error('Error al guardar el producto:', error);
      alert('Error al guardar el producto. Por favor, intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (productToEdit: Product) => {
    setProduct({
      id: productToEdit.id,
      name: productToEdit.name,
      price: productToEdit.price.toString(),
      images: [],
      imageUrls: productToEdit.imageUrls,
      description: productToEdit.description
    });
    setIsEditing(true);
  };

  const handleDelete = async (productId: string, imageUrls: string[]) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      setLoading(true);
      try {
        await deleteDoc(doc(db, 'products', productId));
        
        // Eliminar imágenes asociadas
        for (const url of imageUrls) {
          const imageRef = ref(storage, url);
          await deleteObject(imageRef);
        }

        fetchProducts();
      } catch (error) {
        console.error('Error al eliminar el producto:', error);
        alert('Error al eliminar el producto. Por favor, intenta de nuevo.');
      } finally {
        setLoading(false);
      }
    }
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Panel de Administración</h1>
      
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="mb-4">
          <label htmlFor="name" className="block mb-1">Nombre del Producto</label>
          <input
            type="text"
            id="name"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block mb-1">Precio (€)</label>
          <input
            type="number"
            id="price"
            name="price"
            value={product.price}
            onChange={handleChange}
            required
            step="0.01"
            min="0"
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="images" className="block mb-1">Imágenes</label>
          <input
            type="file"
            id="images"
            name="images"
            onChange={handleImageChange}
            multiple
            accept="image/*"
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block mb-1">Descripción</label>
          <textarea
            id="description"
            name="description"
            value={product.description}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border rounded"
          ></textarea>
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          {isEditing ? 'Actualizar Producto' : 'Agregar Producto'}
        </button>
      </form>

      <h2 className="text-xl font-bold mb-4">Productos Existentes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map(product => (
          <div key={product.id} className="border p-4 rounded">
            <h3 className="font-bold">{product.name}</h3>
            <p>Precio: {product.price.toFixed(2)} €</p>
            <p>{product.description}</p>
            <div className="flex mt-2">
              <button onClick={() => handleEdit(product)} className="bg-yellow-500 text-white px-2 py-1 rounded mr-2">
                Editar
              </button>
              <button onClick={() => handleDelete(product.id, product.imageUrls)} className="bg-red-500 text-white px-2 py-1 rounded">
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;