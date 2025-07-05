import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api'; // ✅ Ispravljen import
import './Login.css';

const Login = () => {
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await api.login(credentials); // ✅ Koristi api.login
            
            // Sačuvaj token
            localStorage.setItem('token', response.access_token);
            
            // Preusmeri na products
            navigate('/products');
            
        } catch (err) {
            console.error('Login error:', err);
            setError('Neispravni kredencijali. Pokušajte ponovo.');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h2>Prijava</h2>
                
                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}
                
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Korisničko ime:</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={credentials.username}
                            onChange={handleChange}
                            required
                            disabled={loading}
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="password">Lozinka:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={credentials.password}
                            onChange={handleChange}
                            required
                            disabled={loading}
                        />
                    </div>
                    
                    <button 
                        type="submit" 
                        className="login-btn"
                        disabled={loading}
                    >
                        {loading ? 'Prijavljivanje...' : 'Prijavite se'}
                    </button>
                </form>
                
                <div className="test-credentials">
                    <p><strong>Test kredencijali:</strong></p>
                    <p>Username: zadatak</p>
                    <p>Password: zadatak</p>
                </div>
            </div>
        </div>
    );
};

export default Login;
