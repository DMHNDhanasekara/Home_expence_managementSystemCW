import React, { useState } from 'react';
import api from '../api';

export default function Login({ setUser }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!username || !password) { alert('Enter username & password'); return; }
    try {
      setLoading(true);
      const res = await api.post('/auth/login', { username, password });
     
      setUser(res.data);
    } catch (err) {
      alert('Login failed: ' + (err.response?.data || err.message));
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async () => {
    if (!username || !password) { alert('Enter username & password'); return; }
    try {
      setLoading(true);
      const res = await api.post('/auth/register', { username, password });
      setUser(res.data);
    } catch (err) {
      alert('Register failed: ' + (err.response?.data || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 420 }}>
      <h2>Login / Register</h2>
      <div style={{ marginBottom: 8 }}>
        <input
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          style={{ width: '100%', padding: 8 }}
        />
      </div>
      <div style={{ marginBottom: 12 }}>
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={{ width: '100%', padding: 8 }}
        />
      </div>
      <div>
        <button onClick={handleLogin} disabled={loading} style={{ marginRight: 8 }}>
          {loading ? 'Please wait...' : 'Login'}
        </button>
        <button onClick={handleRegister} disabled={loading}>
          {loading ? 'Please wait...' : 'Register'}
        </button>
      </div>
      <p style={{ marginTop: 12, color: '#555' }}>
        Sample user: <b>user1</b> / <b>pass123</b>
      </p>
    </div>
  );
}
