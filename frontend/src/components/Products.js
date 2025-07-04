import React, { useState, useEffect } from 'react';
import './Products.css';

const Products = ({ onLogout }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem('token');
      
      const response = await fetch('http://127.0.0.1:8000/api/products', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const getProductIcon = (category) => {
    switch(category) {
      case 'Electronics': return '📱';
      case 'Shoes': return '👟';
      case 'Clothing': return '👕';
      default: return '📦';
    }
  };

  if (loading) return <div className="loading">⏳ Loading products...</div>;
  if (error) return <div className="error">❌ Error: {error}</div>;

  return (
    <div className="products-container">
      <div className="products-header">
        <h1 className="products-title">🛒 E-Commerce Store</h1>
        <button onClick={onLogout} className="logout-button">
          🚪 Logout
        </button>
      </div>
      
      <div className="products-content">
        <h2>Proizvodi ({products.length})</h2>
        
        <div className="products-grid">
          {products.map(product => (
            <div key={product.id} className="product-card">
              <div className="product-image">
                {getProductIcon(product.category)}
              </div>
              <h3 className="product-name">{product.name}</h3>
              <p className="product-description">{product.description}</p>
              <div className="product-price">${product.price}</div>
              <span className="product-category">{product.category}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
