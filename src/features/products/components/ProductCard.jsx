import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { useCart } from '../../../context/CartContext';
import { useFavorites } from '../../../context/FavoritesContext';
import { useToast } from '../../../context/ToastContext';
import { formatCurrency } from '../../../utils/formatCurrency';

export const ProductCard = ({ product }) => {
  const { cart, addToCart } = useCart();
  const { favoriteIds, toggleFavorite } = useFavorites();
  const showToast = useToast();
  const isFavorite = favoriteIds.includes(product.id);
  const quantityInCart = cart.find((item) => item.id === product.id)?.quantity ?? 0;
  const isAtStockLimit = quantityInCart >= product.stock;

  const handleAddToCart = () => {
    if (isAtStockLimit) return;
    addToCart(product);
    showToast(`${product.name} added to your bag`);
  };

  return (
    <article className="product-card">
      <div className="product-image-wrap">
        {product.badge && <span className="product-badge">{product.badge}</span>}
        <button
          type="button"
          className={`favorite-button ${isFavorite ? 'is-favorite' : ''}`}
          aria-label={`${isFavorite ? 'Remove from' : 'Add to'} wishlist: ${product.name}`}
          aria-pressed={isFavorite}
          onClick={() => toggleFavorite(product.id)}
        >
          <Heart size={17} fill={isFavorite ? 'currentColor' : 'none'} />
        </button>
        <Link to={`/product/${product.slug}`} className="product-image-link" tabIndex={-1} aria-hidden="true">
          <img
            src={product.image}
            alt=""
            loading="lazy"
            onError={(event) => { event.currentTarget.style.visibility = 'hidden'; }}
          />
        </Link>
      </div>
      <div className="product-details">
        <span className="product-category">{product.category}</span>
        <Link to={`/product/${product.slug}`} className="product-name-link">
          <h3>{product.name}</h3>
        </Link>
        <div className="product-rating" aria-label={`${product.rating} out of 5 stars from ${product.reviewCount} reviews`}>
          <Star size={13} fill="currentColor" />
          <strong>{product.rating.toFixed(1)}</strong>
          <span>({product.reviewCount.toLocaleString('en-IN')})</span>
        </div>
        <div className="product-price">
          <strong>{formatCurrency(product.price)}</strong>
          {product.oldPrice > product.price && <del>{formatCurrency(product.oldPrice)}</del>}
        </div>
        <button
          type="button"
          className="primary-button add-to-cart"
          onClick={handleAddToCart}
          disabled={isAtStockLimit}
        >
          <ShoppingCart size={15} /> {product.stock === 0 ? 'Sold out' : isAtStockLimit ? 'Max in bag' : 'Add to Bag'}
        </button>
      </div>
    </article>
  );
};
