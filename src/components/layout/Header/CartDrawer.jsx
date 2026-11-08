import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { useCart } from '../../../context/CartContext';
import { formatCurrency } from '../../../utils/formatCurrency';

export const CartDrawer = ({ open, onClose }) => {
  const { cart, cartCount, subtotal, shipping, cartTotal, addToCart, decreaseQuantity, removeFromCart } = useCart();
  const drawerRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }

      if (event.key === 'Tab' && drawerRef.current) {
        const focusable = [...drawerRef.current.querySelectorAll('a[href], button:not(:disabled)')];
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    document.body.classList.add('drawer-open');
    drawerRef.current?.querySelector('button')?.focus();
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.classList.remove('drawer-open');
      document.getElementById('header-cart-button')?.focus();
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="drawer-layer">
      <button type="button" className="drawer-backdrop" aria-label="Close shopping bag" onClick={onClose} />
      <aside className="cart-drawer" ref={drawerRef} role="dialog" aria-modal="true" aria-labelledby="cart-drawer-title">
        <div className="drawer-header">
          <div><span className="section-eyebrow">YOUR GOOD FINDS</span><h2 id="cart-drawer-title">Your bag <span>({cartCount})</span></h2></div>
          <button type="button" className="drawer-close" aria-label="Close shopping bag" onClick={onClose}><X size={19} /></button>
        </div>
        {cart.length ? (
          <>
            <div className="drawer-shipping-note">
              {subtotal >= 999
                ? <span>You’ve unlocked <strong>free delivery</strong>. Lovely.</span>
                : <span>Add {formatCurrency(999 - subtotal)} more for <strong>free delivery</strong>.</span>}
              <div><i style={{ width: `${Math.min((subtotal / 999) * 100, 100)}%` }} /></div>
            </div>
            <div className="drawer-items">
              {cart.map((item) => (
                <article className="drawer-item" key={item.id}>
                  <Link to={`/product/${item.slug}`} className="drawer-item-image" onClick={onClose}>
                    <img src={item.image} alt="" onError={(event) => { event.currentTarget.style.visibility = 'hidden'; }} />
                  </Link>
                  <div className="drawer-item-info">
                    <Link to={`/product/${item.slug}`} onClick={onClose}>{item.name}</Link>
                    <span>{item.vendor}</span>
                    <div className="drawer-item-bottom">
                      <div className="quantity-stepper" aria-label={`Quantity ${item.quantity}`}>
                        <button type="button" aria-label={`Remove one ${item.name}`} onClick={() => decreaseQuantity(item.id)}><Minus size={12} /></button>
                        <span>{item.quantity}</span>
                        <button type="button" aria-label={`Add one ${item.name}`} disabled={item.quantity >= (item.stock ?? 99)} onClick={() => addToCart(item)}><Plus size={12} /></button>
                      </div>
                      <strong>{formatCurrency(item.price * item.quantity)}</strong>
                    </div>
                  </div>
                  <button type="button" className="drawer-remove" aria-label={`Remove ${item.name}`} onClick={() => removeFromCart(item.id)}><Trash2 size={15} /></button>
                </article>
              ))}
            </div>
            <div className="drawer-summary">
              <div><span>Subtotal</span><strong>{formatCurrency(subtotal)}</strong></div>
              <div><span>Delivery</span><strong>{shipping === 0 ? 'Free' : formatCurrency(shipping)}</strong></div>
              <div className="drawer-total"><span>Total</span><strong>{formatCurrency(cartTotal)}</strong></div>
              <Link to="/checkout" className="primary-button drawer-checkout" onClick={onClose}>Go to checkout <ArrowRight size={16} /></Link>
              <Link to="/cart" className="drawer-cart-link" onClick={onClose}>View bag and edit</Link>
              <p><ShoppingBag size={13} /> Thoughtful finds, packed with care.</p>
            </div>
          </>
        ) : (
          <div className="drawer-empty">
            <span><ShoppingBag size={25} /></span>
            <h3>Your bag is taking a breather</h3>
            <p>When something feels just right, you’ll find it here.</p>
            <Link to="/catalog" className="primary-button" onClick={onClose}>Explore the edit <ArrowRight size={15} /></Link>
          </div>
        )}
      </aside>
    </div>
  );
};
