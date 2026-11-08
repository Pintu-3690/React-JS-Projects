import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import { useToast } from '../context/ToastContext';
import { usePageTitle } from '../hooks/usePageTitle';
import { formatCurrency } from '../utils/formatCurrency';

export const Cart = () => {
  usePageTitle('Your bag');
  const { cart, cartCount, subtotal, shipping, cartTotal, addToCart, removeFromCart, decreaseQuantity } = useCart();
  const { favoriteIds, toggleFavorite } = useFavorites();
  const showToast = useToast();

  return (
    <main className="utility-page">
      <Link to="/" className="back-link"><ArrowLeft size={16} /> Continue shopping</Link>
      <div className="utility-heading">
        <div><span className="section-eyebrow">YOUR SHOPPING BAG</span><h1>Your Cart</h1></div>
        <span>{cartCount} {cartCount === 1 ? 'item' : 'items'}</span>
      </div>
      {!cart.length ? (
        <section className="empty-state">
          <ShoppingBag size={36} />
          <h2>Your cart is empty</h2>
          <p>Find something you love and it will show up here.</p>
          <Link to="/catalog" className="primary-button">Explore products <ArrowRight size={16} /></Link>
        </section>
      ) : (
        <div className="cart-page-layout">
          <section className="cart-line-items">
            {cart.map((item) => (
              <article className="cart-line-item" key={item.id}>
                <Link to={`/product/${item.slug}`} className="cart-line-image">{item.image && <img src={item.image} alt="" onError={(event) => { event.currentTarget.style.visibility = 'hidden'; }} />}</Link>
                <div className="cart-line-info">
                  <Link to={`/product/${item.slug}`}><h2>{item.name}</h2></Link>
                  <span>{item.vendor || item.category || 'ShopVerse Store'}</span>
                  <div className="quantity-stepper">
                    <button type="button" aria-label={`Remove one ${item.name}`} onClick={() => decreaseQuantity(item.id)}>-</button>
                    <span>{item.quantity}</span>
                    <button type="button" aria-label={`Add one ${item.name}`} disabled={item.quantity >= (item.stock ?? 99)} onClick={() => addToCart(item)}>+</button>
                  </div>
                  <button
                    type="button"
                    className="cart-save-button"
                    onClick={() => {
                      toggleFavorite(item.id);
                      showToast(favoriteIds.includes(item.id) ? 'Removed from your wishlist' : 'Saved to your wishlist');
                    }}
                  >
                    <Heart size={13} fill={favoriteIds.includes(item.id) ? 'currentColor' : 'none'} />
                    {favoriteIds.includes(item.id) ? 'In your wishlist' : 'Add to wishlist'}
                  </button>
                </div>
                <strong className="cart-line-price">{formatCurrency(item.price * item.quantity)}</strong>
                <button type="button" className="remove-item" aria-label={`Remove ${item.name}`} onClick={() => removeFromCart(item.id)}><Trash2 size={17} /></button>
              </article>
            ))}
          </section>
          <aside className="order-summary">
            <h2>Order Summary</h2>
            <div><span>Subtotal</span><strong>{formatCurrency(subtotal)}</strong></div>
            <div><span>Delivery</span><strong>{shipping === 0 ? 'Free' : formatCurrency(shipping)}</strong></div>
            <p className="shipping-hint">{shipping === 0 ? 'Your order ships free. Nice choice.' : `Add ${formatCurrency(999 - subtotal)} more for free delivery.`}</p>
            <div className="summary-total"><span>Total</span><strong>{formatCurrency(cartTotal)}</strong></div>
            <p className="tax-note">Taxes included where applicable.</p>
            <Link to="/checkout" className="primary-button">Proceed to Checkout <ArrowRight size={16} /></Link>
          </aside>
        </div>
      )}
    </main>
  );
};