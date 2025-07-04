import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { productsAPI } from '../services/api';
import './ProductDetail.css';

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const { id } = useParams();
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await productsAPI.getProduct(id);
      setProduct(response.data);
      setError('');
    } catch (err) {
      if (err.response?.status === 404) {
        setError('Proizvod nije pronađen');
      } else {
        setError('Greška pri učitavanju proizvoda');
      }
      console.error('Product fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
  };

  const handleGoBack = () => {
    navigate('/products');
  };

  if (loading) {
    return <div className="loading">Učitavanje proizvoda...</div>;
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-message">{error}</div>
        <button onClick={handleGoBack} className="back-button">
          Nazad na proizvode
        </button>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="error-container">
        <div className="error-message">Proizvod nije pronađen</div>
        <button onClick={handleGoBack} className="back-button">
          Nazad na proizvode
        </button>
      </div>
    );
  }

  return (
    <div className="product-detail-container">
      <header className="product-detail-header">
        <div className="header-left">
          <button onClick={handleGoBack} className="back-button">
            ← Nazad na proizvode
          </button>
        </div>
        <button onClick={handleLogout} className="logout-button">
          Odjavi se
        </button>
      </header>

      <div className="product-detail-content">
        <div className="product-image-section">
          <img 
            src={product.image_url} 
            alt={product.name}
            className="product-detail-image"
          />
        </div>
        
        <div className="product-info-section">
          <div className="product-category-badge">
            {product.category}
          </div>
          
          <h1 className="product-title">{product.name}</h1>
          
          <div className="product-price-large">
            ${product.price.toFixed(2)}
          </div>
          
          <div className="product-description-section">
            <h3>Opis proizvoda</h3>
            <p className="product-description-full">
              {product.description}
            </p>
          </div>
          
          <div className="product-details-grid">
            <div className="detail-item">
              <span className="detail-label">ID proizvoda:</span>
              <span className="detail-value">{product.id}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Kategorija:</span>
              <span className="detail-value">{product.category}</span>
            </div>
          </div>
          
          <div className="product-actions">
            <button className="add-to-cart-button">
              Dodaj u korpu
            </button>
            <Link to="/products" className="continue-shopping-button">
              Nastavi kupovinu
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;