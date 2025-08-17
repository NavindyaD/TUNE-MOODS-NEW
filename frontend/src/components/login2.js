import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { useAuth } from './AuthContext';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        // Pass both user data and token to login function
        login(data.user, data.token); 
        alert(`Login successful. Welcome, ${data.user.firstName} ${data.user.lastName}!`);
        // Get the intended path from localStorage or default to emotions1
        const intendedPath = localStorage.getItem('intendedPath') || '/emotions1';
        localStorage.removeItem('intendedPath'); // Clear it after use
        navigate(intendedPath);
      } else {
        alert('Login failed. Please check your email and password.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Login failed');
    }
  };

  return (
    <div className="login-container">
      <div className="form-section">
        <div className="form-header">
          <h2>Login</h2>
          <p className="signup-link">Don't have an account? <a href="/signup">Signup</a></p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="userlogin">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
