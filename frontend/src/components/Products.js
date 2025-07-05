import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import './Products.css';

const handleImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/400x300/cccccc/666666?text=Slika+nije+dostupna';
};

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({
        category: '',
        search: ''
    });
    const [categories, setCategories] = useState([]);
    
    const navigate = useNavigate();

    // Dobijanje proizvoda
    const fetchProducts = async () => {
        try {
            setLoading(true);
            setError(null);
            
            const data = await api.getProducts(filters);
            setProducts(data);
            
            // Izvlačenje jedinstvenih kategorija
            const uniqueCategories = [...new Set(data.map(product => product.category))];
            setCategories(uniqueCategories);
            
        } catch (err) {
            console.error('Error fetching products:', err);
            setError(err.message);
            
            // Ako je problem sa autentifikacijom, preusmeri na login
            if (err.message.includes('authentication') || err.message.includes('401')) {
                localStorage.removeItem('token');
                navigate('/login');
            }
        } finally {
            setLoading(false);
        }
    };

    // Učitaj proizvode kada se komponenta mount-uje ili se filtri promene
    useEffect(() => {
        fetchProducts();
    }, [filters]);

    
    // Handler za promenu kategorije
    const handleCategoryChange = (e) => {
        setFilters(prev => ({
            ...prev,
            category: e.target.value
        }));
    };

    // Handler za pretragu
    const handleSearchChange = (e) => {
        setFilters(prev => ({
            ...prev,
            search: e.target.value
        }));
    };

    // Debounce za pretragu (opciono - da ne šalje zahtev na svaki karakter)
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            // Ovde možete dodati dodatnu logiku ako je potrebno
        }, 300);
        
        return () => clearTimeout(timeoutId);
    }, [filters.search]);

    // Logout funkcija
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    // Klik na proizvod
    const handleProductClick = (productId) => {
        navigate(`/products/${productId}`);
    };

    if (loading) {
        return (
            <div className="products-container">
                <div className="loading">Učitavanje proizvoda...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="products-container">
                <div className="error">
                    Greška: {error}
                    <button onClick={fetchProducts} className="retry-btn">
                        Pokušaj ponovo
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="products-container">
            {/* Header sa logout */}
            <div className="products-header">
                <h1>Proizvodi</h1>
                <button onClick={handleLogout} className="logout-btn">
                    Odjavi se
                </button>
            </div>

            {/* Filtri */}
            <div className="filters-section">
                <div className="filter-group">
                    <label htmlFor="category">Kategorija:</label>
                    <select 
                        id="category"
                        value={filters.category} 
                        onChange={handleCategoryChange}
                        className="filter-select"
                    >
                        <option value="">Sve kategorije</option>
                        {categories.map(category => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="filter-group">
                    <label htmlFor="search">Pretraga:</label>
                    <input
                        id="search"
                        type="text"
                        value={filters.search}
                        onChange={handleSearchChange}
                        placeholder="Pretražite proizvode..."
                        className="filter-input"
                    />
                </div>
            </div>

            {/* Rezultati */}
            <div className="products-results">
                <p className="results-count">
                    Pronađeno {products.length} proizvoda
                </p>
            </div>

            {/* Lista proizvoda */}
            <div className="products-grid">
                {products.length === 0 ? (
                    <div className="no-products">
                        Nema proizvoda koji odgovaraju filterima.
                    </div>
                ) : (
                    products.map(product => (
                        <div 
                            key={product.id} 
                            className="product-card"
                            onClick={() => handleProductClick(product.id)}
                        >
                            <img 
                                src={product.image_url} 
                                alt={product.name}
                                className="product-image"
                                onError={handleImageError}
                            />
                            <div className="product-info">
                                <h3 className="product-name">{product.name}</h3>
                                <p className="product-description">
                                    {product.description}
                                </p>
                                <div className="product-details">
                                    <span className="product-category">
                                        {product.category}
                                    </span>
                                    <span className="product-price">
                                        ${product.price}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};



export default Products;
