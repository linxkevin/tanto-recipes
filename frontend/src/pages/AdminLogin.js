import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../lib/api';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const { token } = await api.login(username, password);
      localStorage.setItem('tanto_token', token);
      navigate('/admin');
    } catch (err) {
      setError('Invalid username or password');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: '#fff', borderRadius: 16, padding: '36px 40px', width: 360, border: '1px solid #e8e8e0' }}>
        <h1 style={{ fontSize: 20, fontWeight: 700, marginBottom: 6 }}>🍜 Tanto Recipes</h1>
        <p style={{ fontSize: 14, color: '#888', marginBottom: 28 }}>Admin login</p>

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: 13, color: '#555', display: 'block', marginBottom: 6 }}>Username</label>
            <input
              type="text" value={username} onChange={e => setUsername(e.target.value)}
              style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: '1px solid #ddd', fontSize: 15 }}
              autoComplete="username"
            />
          </div>
          <div style={{ marginBottom: 24 }}>
            <label style={{ fontSize: 13, color: '#555', display: 'block', marginBottom: 6 }}>Password</label>
            <input
              type="password" value={password} onChange={e => setPassword(e.target.value)}
              style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: '1px solid #ddd', fontSize: 15 }}
              autoComplete="current-password"
            />
          </div>
          {error && <p style={{ color: '#c0392b', fontSize: 14, marginBottom: 16 }}>{error}</p>}
          <button
            type="submit" disabled={loading}
            style={{ width: '100%', padding: '12px', borderRadius: 10, background: '#1D9E75', color: '#fff', border: 'none', fontSize: 15, fontWeight: 600, cursor: 'pointer' }}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}
