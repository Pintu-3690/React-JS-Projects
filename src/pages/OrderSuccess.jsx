import React from 'react';
import { Link } from 'react-router-dom';
import { Check, PackageCheck } from 'lucide-react';
import { usePageTitle } from '../hooks/usePageTitle';

export const OrderSuccess = () => {
  usePageTitle('Demo order complete');

  return (
    <main className="utility-page">
      <section className="empty-state order-success">
        <span className="success-icon"><Check size={26} /></span>
        <span className="section-eyebrow">DEMO ORDER COMPLETE</span>
        <h1>Thanks for trying ShopVerse.</h1>
        <p>This frontend preview doesn’t send orders or payment details to a server. Your bag has been cleared for the next visit.</p>
        <Link to="/catalog" className="primary-button"><PackageCheck size={16} /> Continue shopping</Link>
      </section>
    </main>
  );
};