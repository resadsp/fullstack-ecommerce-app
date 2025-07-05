import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../services/api'; // ✅ Ispravljen import
import './ProductDetail.css';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                setError(null);
                
                const data = await api.getProduct(id); // ✅ Koristi api.getProduct
                setProduct(data);
                
            } catch (err) {
                console.error('Error fetching product:', err);
                setError(err.message);
                
                // Ako je 404, prikaži odgovarajuću poruku
                if (err.message.includes('not found')) {
                    setError('Proizvod nije pronađen.');
                }
                
                // Ako je problem sa autentifikacijom
                if (err.message.includes('authentication') || err.message.includes('401')) {
                    localStorage.removeItem('token');
                    navigate('/login');
                }
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchProduct();
        }
    }, [id, navigate]);

    const handleBackToProducts = () => {
        navigate('/products');
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    if (loading) {
        return (
            <div className="product-detail-container">
                <div className="loading">Učitavanje proizvoda...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="product-detail-container">
                <div className="error">
                    <h2>Greška</h2>
                    <p>{error}</p>
                    <button onClick={handleBackToProducts} className="back-btn">
                        Nazad na proizvode
                    </button>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="product-detail-container">
                <div className="error">
                    <h2>Proizvod nije pronađen</h2>
                    <button onClick={handleBackToProducts} className="back-btn">
                        Nazad na proizvode
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="product-detail-container">
            {/* Header */}
            <div className="product-detail-header">
                <button onClick={handleBackToProducts} className="back-btn">
                    ← Nazad na proizvode
                </button>
                <button onClick={handleLogout} className="logout-btn">
                    Odjavi se
                </button>
            </div>

            {/* Product Details */}
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
                    
                    <div className="product-price-section">
                        <span className="product-price">${product.price}</span>
                    </div>
                    
                    <div className="product-description-section">
                        <h3>Opis proizvoda</h3>
                        <p className="product-description">{product.description}</p>
                    </div>
                    
                    <div className="product-actions">
                        <button className="add-to-cart-btn">
                            Dodaj u korpu
                        </button>
                        <button className="favorite-btn">
                            ♥ Dodaj u favorite
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;