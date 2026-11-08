import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, Heart, Minus, Plus, ShieldCheck, Star, Truck } from 'lucide-react';
import { getProductBySlug, products } from '../features/products/productService';
import { ProductCard } from '../features/products/components/ProductCard';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import { useToast } from '../context/ToastContext';
import { NotFound } from './NotFound';
import { usePageTitle } from '../hooks/usePageTitle';
import { formatCurrency } from '../utils/formatCurrency';

export const ProductDetails = () => {
  const { slug } = useParams();
  const product = getProductBySlug(slug);
  usePageTitle(product?.name ?? 'Product not found');
  const { cart, addToCart } = useCart();
  const { favoriteIds, toggleFavorite } = useFavorites();
  const showToast = useToast();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('details');

  if (!product) return <NotFound />;

  const addProduct = () => {
    for (let item = 0; item < quantity; item += 1) addToCart(product);
    showToast(`${quantity} ${product.name} added to your bag`);
  };

  const isFavorite = favoriteIds.includes(product.id);
  const quantityInCart = cart.find((item) => item.id === product.id)?.quantity ?? 0;
  const availableToAdd = Math.max(product.stock - quantityInCart, 0);
  const relatedProducts = products
    .filter((item) => item.category === product.category && item.id !== product.id)
    .slice(0, 4);

  return (
    <main className="product-page">
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link to="/">Home</Link><span>/</span><Link to={`/catalog?category=${encodeURIComponent(product.category)}`}>{product.category}</Link><span>/</span><span>{product.name}</span>
      </nav>
      <Link to="/catalog" className="back-link product-back"><ArrowLeft size={15} /> Back to the edit</Link>
      <section className="product-detail-layout">
        <div className="product-gallery">
          <div className="product-gallery-main">
            {product.badge && <span className="product-badge">{product.badge}</span>}
            <img src={product.image} alt={product.name} onError={(event) => { event.currentTarget.style.visibility = 'hidden'; }} />
          </div>
          <div className="gallery-caption"><span>Thoughtfully picked by ShopVerse</span><span>01 / 01</span></div>
        </div>
        <div className="product-detail-info">
          <span className="product-category">{product.category} <span>·</span> Sold by {product.vendor}</span>
          <h1>{product.name}</h1>
          <div className="detail-rating"><span><Star size={14} fill="currentColor" /> {product.rating.toFixed(1)}</span><a href="#product-reviews">{product.reviewCount.toLocaleString('en-IN')} reviews</a></div>
          <div className="detail-price"><strong>{formatCurrency(product.price)}</strong>{product.oldPrice > product.price && <><del>{formatCurrency(product.oldPrice)}</del><span>Save {formatCurrency(product.oldPrice - product.price)}</span></>}</div>
          <p className="detail-description">{product.description}</p>
          <p className={`stock-status ${availableToAdd === 0 ? 'is-unavailable' : ''}`}><span /> {availableToAdd > 0 ? 'In stock — ready to ship' : 'You have all available stock in your bag'} <small>{availableToAdd > 0 ? `Only ${availableToAdd} left` : ''}</small></p>
          <div className="detail-purchase">
            <div className="quantity-stepper detail-quantity" aria-label={`Quantity ${quantity}`}>
              <button type="button" aria-label="Decrease quantity" disabled={quantity <= 1} onClick={() => setQuantity((current) => Math.max(1, current - 1))}><Minus size={14} /></button>
              <span>{quantity}</span>
              <button type="button" aria-label="Increase quantity" disabled={quantity >= availableToAdd} onClick={() => setQuantity((current) => Math.min(availableToAdd, current + 1))}><Plus size={14} /></button>
            </div>
            <button type="button" className="primary-button detail-add-button" disabled={availableToAdd < quantity} onClick={addProduct}>{availableToAdd < quantity ? 'Max in bag' : <>Add to bag · {formatCurrency(product.price * quantity)} <ArrowRight size={16} /></>}</button>
            <button type="button" className={`detail-favorite ${isFavorite ? 'is-favorite' : ''}`} aria-label={isFavorite ? 'Remove from wishlist' : 'Add to wishlist'} aria-pressed={isFavorite} onClick={() => toggleFavorite(product.id)}><Heart size={19} fill={isFavorite ? 'currentColor' : 'none'} /></button>
          </div>
          <div className="detail-assurances">
            <div><Truck size={17} /><span>Free delivery on orders of ₹999+</span></div>
            <div><ShieldCheck size={17} /><span>Safe, secure checkout</span></div>
            <div><Check size={17} /><span>Easy 30-day returns</span></div>
          </div>
          <div className="product-tabs" id="product-reviews">
            <div className="product-tab-list" role="tablist" aria-label="Product information">
              <button type="button" role="tab" aria-selected={activeTab === 'details'} onClick={() => setActiveTab('details')}>The details</button>
              <button type="button" role="tab" aria-selected={activeTab === 'reviews'} onClick={() => setActiveTab('reviews')}>Reviews ({product.reviewCount.toLocaleString('en-IN')})</button>
            </div>
            {activeTab === 'details' ? (
              <ul className="detail-list">{product.details.map((detail) => <li key={detail}>{detail}</li>)}</ul>
            ) : (
              <div className="review-summary"><Star size={16} fill="currentColor" /><strong>{product.rating.toFixed(1)} out of 5</strong><span>Based on {product.reviewCount.toLocaleString('en-IN')} customer reviews</span></div>
            )}
          </div>
        </div>
      </section>
      {relatedProducts.length > 0 && (
        <section className="related-products">
          <div className="section-heading"><div><span className="section-eyebrow">KEEP EXPLORING</span><h2>More from {product.category}</h2></div><Link className="view-all-link" to={`/catalog?category=${encodeURIComponent(product.category)}`}>See all <ArrowRight size={15} /></Link></div>
          <div className="related-grid">{relatedProducts.map((item) => <ProductCard key={item.id} product={item} />)}</div>
        </section>
      )}
    </main>
  );
};
