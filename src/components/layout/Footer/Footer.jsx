import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Instagram, Mail } from 'lucide-react';

export const Footer = () => (
  <footer className="site-footer">
    <div className="footer-main">
      <div className="footer-brand-column">
        <Link to="/" className="brand footer-brand">
          <img className="brand-logo" src="/shopverse-mark.png" alt="" />
          <span>Shop<span>Verse</span></span>
        </Link>
        <p>Good finds from good people. Discover a more thoughtful way to shop, all in one place.</p>
        <a className="footer-social" href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Visit Instagram"><Instagram size={17} /></a>
      </div>
      <div className="footer-link-column">
        <h2>Explore</h2>
        <Link to="/catalog">Shop all</Link>
        <Link to="/catalog?category=Electronics">Electronics</Link>
        <Link to="/catalog?category=Fashion">Fashion</Link>
        <Link to="/catalog?category=Home%20%26%20Living">Home & Living</Link>
      </div>
      <div className="footer-link-column">
        <h2>We're here</h2>
        <a href="mailto:hello@shopverse.example"><Mail size={14} /> Contact us</a>
        <a href="mailto:hello@shopverse.example?subject=Shipping%20question">Shipping & returns <ArrowUpRight size={13} /></a>
        <Link to="/vendor">Sell with us <ArrowUpRight size={13} /></Link>
        <a href="mailto:hello@shopverse.example?subject=Privacy%20question">Privacy & care</a>
      </div>
      <div className="footer-note">
        <span className="section-eyebrow">A LITTLE NOTE</span>
        <p>Made for people who care about what they bring into their lives.</p>
        <Link to="/catalog">Find something lovely <ArrowUpRight size={14} /></Link>
      </div>
    </div>
    <div className="footer-bottom">
      <span>© {new Date().getFullYear()} ShopVerse Marketplace</span>
      <span>Made for thoughtful shopping.</span>
      <a href="mailto:hello@shopverse.example">Need a hand? Say hello <ArrowUpRight size={12} /></a>
    </div>
  </footer>
);
