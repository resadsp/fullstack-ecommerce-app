import React, { useState } from 'react';
import { loginUser } from '../services/api';
import './Login.css';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await loginUser(username, password);
      onLogin(result);
    } catch (error) {
      setError('Neispravni podaci za prijavu. Pokušajte ponovo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">🛒 E-Commerce</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Korisničko ime:</label>
            <input
              type="text"
              className="form-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Unesite korisničko ime"
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Lozinka:</label>
            <input
              type="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Unesite lozinku"
              required
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? '⏳ Prijavljivanje...' : '🚀 Prijavite se'}
          </button>
        </form>
        <div style={{textAlign: 'center', marginTop: '1rem', color: '#666', fontSize: '0.9rem'}}>
          Demo: zadatak / zadatak
        </div>
      </div>
    </div>
  );
};

export default Login;
