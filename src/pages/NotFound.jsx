import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { usePageTitle } from '../hooks/usePageTitle';

export const NotFound = () => {
  usePageTitle('Page not found');

  return (
    <main className="utility-page">
      <section className="empty-state">
        <span className="not-found-code">404</span>
        <h1>We couldn't find that page</h1>
        <p>It may have moved, or the link may be out of date.</p>
        <Link to="/" className="primary-button"><ArrowLeft size={16} /> Back to home</Link>
      </section>
    </main>
  );
};