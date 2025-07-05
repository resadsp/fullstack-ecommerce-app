import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import './Products.css';

const handleImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/400x300/cccccc/666666?text=Slika+nije+dostupna';
};

const Products = ({ onLogout }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({
        category: '',
        search: ''
    });
    const [searchInput, setSearchInput] = useState(''); // ✅ Lokalni state za input
    const [categories, setCategories] = useState([]);
    const [showLogoutMessage, setShowLogoutMessage] = useState(false);
       
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

    const handleLogout = () => {
        console.log('🚪 Logout clicked in Products component');
        
        setShowLogoutMessage(true);
        
        setTimeout(() => {
            localStorage.removeItem('token');
            localStorage.removeItem('tokenType');
            
            if (onLogout) {
                console.log('📞 Calling onLogout callback');
                onLogout();
            } else {
                console.warn('⚠️ onLogout callback not provided');
                navigate('/login', { replace: true });
            }
        }, 2000);
    };

    // ✅ Učitaj proizvode kada se komponenta mount-uje ili se filtri promene
    useEffect(() => {
        fetchProducts();
    }, [filters]); // Samo kada se filters promeni, ne searchInput
       
    // Handler za promenu kategorije
    const handleCategoryChange = (e) => {
        setFilters(prev => ({
            ...prev,
            category: e.target.value
        }));
    };

    // ✅ Handler za pretragu - samo menja lokalni state
    const handleSearchChange = (e) => {
        setSearchInput(e.target.value);
    };

    // ✅ Debounce za pretragu - čeka 500ms pre slanja zahteva
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            console.log(`🔍 Search debounce: "${searchInput}"`);
            setFilters(prev => ({
                ...prev,
                search: searchInput
            }));
        }, 500); // ✅ Čeka 500ms nakon poslednjeg kucanja
               
        return () => {
            console.log('🚫 Clearing search timeout');
            clearTimeout(timeoutId);
        };
    }, [searchInput]); // ✅ Pokreće se kada se searchInput promeni

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
            {/* Logout poruka overlay */}
            {showLogoutMessage && (
                <div className="logout-message-overlay">
                    <div className="logout-message">
                        <h2>👋 Hvala vam!</h2>
                        <p>Dođite opet uskoro!</p>
                        <p>Vidimo se! 😊</p>
                        <div className="logout-spinner"></div>
                    </div>
                </div>
            )}

            {/* Header sa logout */}
            <div className="products-header">
                <h1>Proizvodi</h1>
                <div className="header-actions">
                    <div className="user-menu">
                        <span className="user-greeting">
                            Dobrodošli!
                        </span>
                        <button onClick={handleLogout} className="logout-btn">
                            🚪 Odjavi se
                        </button>
                    </div>
                </div>
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
                    <div className="search-input-wrapper">
                        <input
                            id="search"
                            type="text"
                            value={searchInput} // ✅ Koristi searchInput umesto filters.search
                            onChange={handleSearchChange}
                            placeholder="Pretražite proizvode..."
                            className="filter-input"
                        />
                        {/* ✅ Loading indikator za pretragu */}
                        {searchInput !== filters.search && (
                            <div className="search-loading">
                                <div className="search-spinner"></div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Rezultati */}
            <div className="products-results">
                <p className="results-count">
                    Pronađeno {products.length} proizvoda
                    {/* ✅ Prikaži trenutni search filter */}
                    {filters.search && (
                        <span className="search-info"> za "{filters.search}"</span>
                    )}
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

            {/* Floating logout dugme */}
            <div className="floating-logout">
                <button
                    onClick={handleLogout}
                    className="floating-logout-btn"
                    title="Odjavi se"
                >
                    ↩️
                </button>
            </div>
        </div>
    );
};

export default Products;
