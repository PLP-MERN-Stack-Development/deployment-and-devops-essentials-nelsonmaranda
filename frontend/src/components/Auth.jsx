import { useState } from 'react';
import { authAPI } from '../utils/api';

function Auth({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = isLogin
        ? await authAPI.login({ email: formData.email, password: formData.password })
        : await authAPI.register(formData);

      const userData = response.data;
      localStorage.setItem('user', JSON.stringify(userData));
      onLogin(userData);
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="auth-container">
      <div className="auth-header">
        <h1>💬 Tubonge</h1>
        <p>Connect and chat with anyone, anywhere</p>
      </div>

      <div className="auth-tabs">
        <button
          className={`auth-tab ${isLogin ? 'active' : ''}`}
          onClick={() => {
            setIsLogin(true);
            setError('');
          }}
        >
          Login
        </button>
        <button
          className={`auth-tab ${!isLogin ? 'active' : ''}`}
          onClick={() => {
            setIsLogin(false);
            setError('');
          }}
        >
          Register
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      <form className="auth-form" onSubmit={handleSubmit}>
        {!isLogin && (
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required={!isLogin}
              placeholder="Enter username"
            />
          </div>
        )}

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Enter email"
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="Enter password"
            minLength="6"
          />
        </div>

        <button type="submit" className="auth-button" disabled={loading}>
          {loading ? 'Please wait...' : isLogin ? 'Login' : 'Register'}
        </button>
      </form>
    </div>
  );
}

export default Auth;

