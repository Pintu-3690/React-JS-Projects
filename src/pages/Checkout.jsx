import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ShieldCheck, Truck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { usePageTitle } from '../hooks/usePageTitle';
import { formatCurrency } from '../utils/formatCurrency';

export const Checkout = () => {
  usePageTitle('Checkout');
  const { cart, subtotal, shipping, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const placeOrder = (event) => {
    event.preventDefault();
    clearCart();
    navigate('/order-success');
  };

  if (!cart.length) {
    return (
      <main className="utility-page">
        <section className="empty-state">
          <h1>Nothing to check out yet</h1>
          <p>Add a few favorites to your cart first.</p>
          <Link to="/catalog" className="primary-button">Browse products <ArrowRight size={16} /></Link>
        </section>
      </main>
    );
  }

  return (
    <main className="utility-page">
      <Link to="/cart" className="back-link"><ArrowLeft size={16} /> Back to cart</Link>
      <div className="utility-heading"><div><span className="section-eyebrow">ALMOST YOURS</span><h1>Checkout</h1></div></div>
      <div className="checkout-layout">
        <form className="checkout-form" onSubmit={placeOrder}>
          <div className="checkout-step-heading"><span>01</span><div><h2>Delivery details</h2><p>Where should we send your good finds?</p></div></div>
          <div className="checkout-fields">
            <label>Full name<input name="name" autoComplete="name" required /></label>
            <label>Email address<input name="email" type="email" autoComplete="email" required /></label>
            <label className="full-field">Street address<input name="address" autoComplete="street-address" required /></label>
            <label>City<input name="city" autoComplete="address-level2" required /></label>
            <label>Postal code<input name="postalCode" autoComplete="postal-code" inputMode="numeric" pattern="[0-9]{6}" minLength="6" maxLength="6" placeholder="6-digit PIN code" required /></label>
          </div>
          <div className="checkout-step-heading payment-step"><span>02</span><div><h2>Payment</h2><p>Choose how you’d like to pay.</p></div></div>
          <label className="payment-choice">
            <input type="radio" name="payment" value="cod" defaultChecked />
            <span className="payment-choice-icon"><Truck size={18} /></span>
            <span><strong>Cash on delivery</strong><small>Pay when your order arrives</small></span>
            <span className="payment-choice-check" />
          </label>
          <label className="payment-choice payment-disabled">
            <input type="radio" name="payment" value="online" disabled />
            <span className="payment-choice-icon"><ShieldCheck size={18} /></span>
            <span><strong>Online payment</strong><small>Secure card and UPI payments · coming soon</small></span>
          </label>
          <button type="submit" className="primary-button place-order">Place demo order <ArrowRight size={16} /></button>
          <p className="secure-note"><ShieldCheck size={15} /> Demo checkout only — payment processing is not connected.</p>
        </form>
        <aside className="order-summary">
          <h2>Order Summary</h2>
          <div className="checkout-summary-items">
            {cart.map((item) => <div key={item.id}><span>{item.name} <small>× {item.quantity}</small></span><strong>{formatCurrency(item.price * item.quantity)}</strong></div>)}
          </div>
          <div><span>Subtotal</span><strong>{formatCurrency(subtotal)}</strong></div>
          <div><span>Delivery</span><strong>{shipping === 0 ? 'Free' : formatCurrency(shipping)}</strong></div>
          <div className="summary-total"><span>Total</span><strong>{formatCurrency(cartTotal)}</strong></div>
          <p className="summary-delivery-note"><Truck size={14} /> Estimated delivery in 3–5 business days</p>
        </aside>
      </div>
    </main>
  );
};