import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BookOpen,
  ChevronRight,
  Gamepad2,
  Grid2X2,
  Headphones,
  Home as HomeIcon,
  Laptop,
  Leaf,
  Pause,
  Play,
  ShieldCheck,
  Shirt,
  Sparkles,
  Truck,
  RotateCw,
  Dumbbell,
} from 'lucide-react';
import { products, categories } from '../features/products/productService';
import { ProductCard } from '../features/products/components/ProductCard';
import { usePageTitle } from '../hooks/usePageTitle';
import { formatCurrency } from '../utils/formatCurrency';

const categoryIcons = [Laptop, Shirt, HomeIcon, Leaf, Dumbbell, BookOpen, Gamepad2];
const categoryColors = ['blue', 'purple', 'sky', 'green', 'orange', 'teal', 'indigo'];

const heroSlides = [
  {
    kicker: 'THE SMARTER WAY TO SHOP',
    headline: <>Big Dreams.<br /><span>Better Deals.</span></>,
    subtitle: 'Thoughtful finds. Everyday prices.',
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1200&q=90',
    alt: 'Premium wireless headphones',
    category: 'Electronics',
  },
  {
    kicker: 'MADE FOR YOUR EVERYDAY',
    headline: <>Find your<br /><span>next favorite.</span></>,
    subtitle: 'Good things are closer than you think.',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1200&q=90',
    alt: 'A laptop ready for a productive day',
    category: 'Electronics',
  },
  {
    kicker: 'A LITTLE MORE OUTDOORS',
    headline: <>Move well.<br /><span>Feel good.</span></>,
    subtitle: 'Fresh gear for wherever you’re headed.',
    image: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=1200&q=90',
    alt: 'Comfortable running shoes',
    category: 'Sports & Fitness',
  },
];

export const Home = () => {
  usePageTitle('');
  const [activeCategory, setActiveCategory] = useState('All Categories');
  const [activeSlide, setActiveSlide] = useState(0);
  const [sliderPaused, setSliderPaused] = useState(false);

  useEffect(() => {
    if (sliderPaused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const intervalId = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length);
    }, 6500);
    return () => window.clearInterval(intervalId);
  }, [sliderPaused]);

  const visibleProducts = useMemo(() => (
    activeCategory === 'All Categories'
      ? products.slice(0, 5)
      : products.filter((product) => product.category === activeCategory).slice(0, 5)
  ), [activeCategory]);

  const slide = heroSlides[activeSlide];

  return (
    <main className="home-page">
      <div className="marketplace-layout">
        <aside className="category-panel" aria-label="Shop by category">
          <div className="category-panel-heading"><Grid2X2 size={16} /><span>Shop by category</span></div>
          <button
            type="button"
            className={`category-link all-categories ${activeCategory === 'All Categories' ? 'is-selected' : ''}`}
            onClick={() => setActiveCategory('All Categories')}
            aria-pressed={activeCategory === 'All Categories'}
          >
            <Grid2X2 className="category-icon slate" size={18} />
            <span>All categories</span>
            <ChevronRight className="category-chevron" size={15} />
          </button>
          <div className="category-list">
            {categories.map((name, index) => {
              const Icon = categoryIcons[index];
              return (
                <button
                  type="button"
                  key={name}
                  className={`category-link ${activeCategory === name ? 'is-selected' : ''}`}
                  onClick={() => setActiveCategory(name)}
                  aria-pressed={activeCategory === name}
                >
                  <Icon className={`category-icon ${categoryColors[index]}`} size={18} />
                  <span>{name}</span>
                  <ChevronRight className="category-chevron" size={15} />
                </button>
              );
            })}
          </div>
          <Link className="category-footer-link" to="/catalog">Explore all <ArrowRight size={13} /></Link>
        </aside>

        <section className="storefront">
          <section className="hero-banner" aria-label="Featured collection">
            <div className="hero-copy">
              <span className="hero-kicker"><Sparkles size={14} /> {slide.kicker}</span>
              <h1>{slide.headline}</h1>
              <p>{slide.subtitle}</p>
              <Link className="primary-button hero-button" to={`/catalog?category=${encodeURIComponent(slide.category)}`}>
                Shop the collection <ArrowRight size={16} />
              </Link>
            </div>
            <div className="hero-art">
              <img src={slide.image} alt={slide.alt} />
              <div className="hero-art-shade" />
              <span className="hero-art-label">CURATED FOR YOU <span>0{activeSlide + 1} / 03</span></span>
            </div>
            <div className="hero-controls" aria-label="Choose featured collection">
              {heroSlides.map((item, index) => (
                <button
                  type="button"
                  key={item.kicker}
                  className={index === activeSlide ? 'is-active' : ''}
                  aria-label={`Show collection ${index + 1}: ${item.kicker.toLowerCase()}`}
                  aria-pressed={index === activeSlide}
                  onClick={() => setActiveSlide(index)}
                />
              ))}
              <button
                type="button"
                className="hero-toggle"
                aria-label={sliderPaused ? 'Play featured collections' : 'Pause featured collections'}
                onClick={() => setSliderPaused((paused) => !paused)}
              >
                {sliderPaused ? <Play size={11} /> : <Pause size={11} />}
              </button>
            </div>
          </section>

          <section className="popular-section">
            <div className="section-heading">
              <div>
                <span className="section-eyebrow">GOOD FINDS, GREAT FEELING</span>
                <h2>{activeCategory === 'All Categories' ? 'Popular right now' : activeCategory}</h2>
              </div>
              <Link
                to={`/catalog${activeCategory === 'All Categories' ? '' : `?category=${encodeURIComponent(activeCategory)}`}`}
                className="view-all-link"
              >
                Explore the edit <ArrowRight size={15} />
              </Link>
            </div>
            <div className="popular-content">
              {visibleProducts.length ? (
                <div className="product-grid">
                  {visibleProducts.map((product) => <ProductCard key={product.id} product={product} />)}
                </div>
              ) : (
                <div className="no-products">
                  <span>More good things are on the way.</span>
                  <button type="button" className="text-button" onClick={() => setActiveCategory('All Categories')}>Browse popular finds</button>
                </div>
              )}
              <aside className="promo-column" aria-label="Featured edits">
                <Link to="/catalog?category=Electronics" className="promo-card electronics-promo">
                  <div>
                    <span>THE TECH EDIT</span>
                    <strong>Little upgrades.<br />Big difference.</strong>
                    <span className="promo-cta">Shop electronics <ArrowRight size={13} /></span>
                  </div>
                  <img src={products[4].image} alt="" loading="lazy" />
                </Link>
                <Link to="/catalog?category=Fashion" className="promo-card fashion-promo">
                  <div>
                    <span>YOUR EVERYDAY EDIT</span>
                    <strong>Style that<br />feels like you.</strong>
                    <span className="promo-cta">Explore fashion <ArrowRight size={13} /></span>
                  </div>
                  <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=560&q=85" alt="" loading="lazy" />
                </Link>
              </aside>
            </div>
          </section>

          <section className="benefits-bar" aria-label="The ShopVerse promise">
            <div className="benefit-item"><Truck size={28} /><div><strong>Free delivery</strong><span>On orders of ₹999+</span></div></div>
            <div className="benefit-item"><ShieldCheck size={28} /><div><strong>Secure checkout</strong><span>Your details stay protected</span></div></div>
            <div className="benefit-item"><Headphones size={28} /><div><strong>Here to help</strong><span>Real support, every day</span></div></div>
            <div className="benefit-item"><RotateCw size={28} /><div><strong>Easy returns</strong><span>30 days to decide</span></div></div>
          </section>
          <p className="home-shipping-note">A little treat from us: delivery is on the house when your bag is {formatCurrency(999)} or more.</p>
        </section>
      </div>
    </main>
  );
};
