import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ShieldAlert } from 'lucide-react';

export const Unauthorized = () => (
  <main className="utility-page">
    <section className="empty-state">
      <ShieldAlert size={38} />
      <h1>Access unavailable</h1>
      <p>Your account does not have permission to view this page.</p>
      <Link to="/" className="primary-button"><ArrowLeft size={16} /> Return to ShopVerse</Link>
    </section>
  </main>
);