import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Boxes,
  CircleDollarSign,
  Clock3,
  Package,
  Plus,
  Store,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { products } from '../features/products/productService';
import { usePageTitle } from '../hooks/usePageTitle';

const vendorProducts = products.filter((product) => product.vendor === 'Audio Atelier');

export const VendorDashboard = () => {
  const { user } = useAuth();
  usePageTitle('Vendor dashboard');

  return (
    <main className="vendor-page">
      <header className="vendor-topline">
        <div><span className="section-eyebrow">YOUR LITTLE CORNER OF SHOPVERSE</span><h1>Good morning, {user?.name?.split(' ')[0] || 'maker'}.</h1><p>Here’s a little look at how your shop is doing.</p></div>
        <Link to="/catalog" className="secondary-button"><Store size={15} /> View your storefront</Link>
      </header>
      <div className="vendor-demo-note"><BadgeCheck size={16} /><span>This is a sample seller dashboard. Connect your store API to see live orders and inventory.</span></div>
      <section className="vendor-metrics" aria-label="Sample store metrics">
        <article className="vendor-metric"><span className="metric-icon purple"><CircleDollarSign size={19} /></span><span className="metric-label">Gross sales</span><strong>₹84,250</strong><small><ArrowUpRight size={12} /> 12.8% <span>vs. last month</span></small></article>
        <article className="vendor-metric"><span className="metric-icon green"><Package size={19} /></span><span className="metric-label">Orders</span><strong>46</strong><small><ArrowUpRight size={12} /> 8 new <span>this week</span></small></article>
        <article className="vendor-metric"><span className="metric-icon blue"><Boxes size={19} /></span><span className="metric-label">Active listings</span><strong>{vendorProducts.length}</strong><small><span>Across your shop</span></small></article>
        <article className="vendor-metric"><span className="metric-icon amber"><Clock3 size={19} /></span><span className="metric-label">Needs a little love</span><strong>2</strong><small><ArrowDownRight size={12} /> Low stock <span>alerts</span></small></article>
      </section>
      <section className="vendor-listing-section">
        <div className="vendor-section-heading">
          <div><span className="section-eyebrow">THE GOOD THINGS YOU MAKE</span><h2>Your listings <span>{vendorProducts.length}</span></h2></div>
          <Link to="/catalog" className="vendor-add-listing"><Plus size={15} /> Review products</Link>
        </div>
        <div className="vendor-table-wrap">
          <table className="vendor-table">
            <thead><tr><th>Product</th><th>Status</th><th>Inventory</th><th>Price</th><th aria-label="View listing" /></tr></thead>
            <tbody>
              {vendorProducts.map((product) => (
                <tr key={product.id}>
                  <td><div className="vendor-product-cell"><img src={product.image} alt="" onError={(event) => { event.currentTarget.style.visibility = 'hidden'; }} /><div><strong>{product.name}</strong><span>{product.category} · SKU SV-{String(product.id).padStart(4, '0')}</span></div></div></td>
                  <td><span className="listing-status"><i /> Active</span></td>
                  <td className={product.stock < 10 ? 'low-stock' : ''}>{product.stock} in stock</td>
                  <td>₹{product.price.toLocaleString('en-IN')}</td>
                  <td><Link to={`/product/${product.slug}`} className="table-view-link" aria-label={`View ${product.name}`}><ArrowRight size={15} /></Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <section className="vendor-bottom-note"><span className="vendor-note-icon"><Store size={18} /></span><div><strong>Made for independent shops</strong><p>We’re here to help your small business find its people. More seller tools are on the way.</p></div><Link to="/catalog">Explore ShopVerse <ArrowRight size={14} /></Link></section>
    </main>
  );
};
