import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowRight, ShoppingBag } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { ROLES } from '../config/constants';
import { usePageTitle } from '../hooks/usePageTitle';

export const Login = () => {
  usePageTitle('Account preview');
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [role, setRole] = useState(ROLES.BUYER);

  const signIn = (event) => {
    event.preventDefault();
    const name = email.split('@')[0].replace(/[._-]+/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase());
    login({ id: email, name, email, role });
    navigate(location.state?.from?.pathname || '/', { replace: true });
  };

  return (
    <main className="utility-page login-page">
      <form className="login-card" onSubmit={signIn}>
        <span className="brand-mark"><ShoppingBag size={21} /></span>
        <span className="section-eyebrow">ACCOUNT PREVIEW</span>
        <h1>Welcome to ShopVerse</h1>
        <p>Use an email to preview the signed-in storefront. Account authentication isn’t connected in this demo.</p>
        <label>Email address<input type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} required /></label>
        <label>Preview account
          <select value={role} onChange={(event) => setRole(event.target.value)}>
            <option value={ROLES.BUYER}>Shopper</option>
            <option value={ROLES.VENDOR}>Vendor</option>
          </select>
        </label>
        <button type="submit" className="primary-button">Continue <ArrowRight size={16} /></button>
        <Link to="/" className="back-link">Continue browsing as a guest</Link>
      </form>
    </main>
  );
};
