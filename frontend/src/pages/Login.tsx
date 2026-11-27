import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e:
     React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Temporary login validation
    if (!email || !password) {
      alert('Please enter your email and password');
      return;
    }

    alert('Login successful!');
    navigate('/events');
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Welcome Back!</h1>
        <p>Login to continue your Eventify journey.</p>

        <form onSubmit={handleLogin}>
          <label>Email Address</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Login</button>

          <div className="auth-divider">
           <span>OR</span>
          </div>

          <button
          type="button"
          className="google-login-btn"
          onClick={() => alert('Google login will be available soon!')}
>
         <span className="google-icon">G</span>
          Continue with Google
         </button>
        </form>

        <p className="auth-switch">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;