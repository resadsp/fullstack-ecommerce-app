import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import './Login.css';

const Login = ({ onLogin }) => { // ✅ Dodaj onLogin prop
    const [credentials, setCredentials] = useState({
        username: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess(false);

        try {
            console.log('Pokušavam login...'); 
            const response = await api.login(credentials);
            console.log('Login response:', response); 
            
            // Sačuvaj token
            localStorage.setItem('token', response.access_token);
            console.log('Token saved:', response.access_token); 
            
            // ✅ KLJUČNO: Pozovi onLogin callback da obavestiš App komponentu
            if (onLogin) {
                onLogin(response);
            }
            
            // Postavi success state
            setSuccess(true);
            
            // Navigacija će se desiti automatski jer će App.js promeniti isAuthenticated
            console.log('Login successful, App will handle navigation');
                       
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
                
                {success && (
                    <div className="success-message">
                        Uspešno ste se prijavili! Preusmeravamo vas...
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
            </div>
        </div>
    );
};

export default Login;
