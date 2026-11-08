import React, { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowRight, ChevronDown, SlidersHorizontal, X } from 'lucide-react';
import { categories, products } from '../features/products/productService';
import { ProductCard } from '../features/products/components/ProductCard';
import { usePageTitle } from '../hooks/usePageTitle';

const PAGE_SIZE = 8;

export const Catalog = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(1);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const search = searchParams.get('search')?.trim() ?? '';
  const category = searchParams.get('category') ?? '';
  const sort = searchParams.get('sort') ?? 'featured';
  const price = searchParams.get('price') ?? 'all';
  usePageTitle(search ? `Search: ${search}` : category || 'Shop all products');

  const updateFilter = (key, value) => {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(key, value);
    else next.delete(key);
    setSearchParams(next);
    setPage(1);
  };

  const clearFilters = () => {
    setSearchParams({});
    setPage(1);
  };

  const filteredProducts = useMemo(() => {
    const query = search.toLowerCase();
    const matches = products.filter((product) => {
      const matchesSearch = !query || [
        product.name,
        product.category,
        product.vendor,
        product.description,
      ].some((value) => value.toLowerCase().includes(query));
      const matchesCategory = !category || product.category === category;
      const matchesPrice = price === 'all'
        || (price === 'under-1000' && product.price < 1000)
        || (price === '1000-5000' && product.price >= 1000 && product.price <= 5000)
        || (price === '5000-20000' && product.price > 5000 && product.price <= 20000)
        || (price === 'over-20000' && product.price > 20000);
      return matchesSearch && matchesCategory && matchesPrice;
    });

    return matches.sort((first, second) => {
      if (sort === 'price-low') return first.price - second.price;
      if (sort === 'price-high') return second.price - first.price;
      if (sort === 'rating') return second.rating - first.rating;
      if (sort === 'name') return first.name.localeCompare(second.name);
      return first.id - second.id;
    });
  }, [category, price, search, sort]);

  const pageCount = Math.ceil(filteredProducts.length / PAGE_SIZE);
  const pageProducts = filteredProducts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const hasActiveFilters = Boolean(search || category || price !== 'all');
  const filterSignature = searchParams.toString();

  useEffect(() => {
    if (page > pageCount && pageCount > 0) setPage(pageCount);
  }, [page, pageCount]);

  useEffect(() => {
    setPage(1);
  }, [filterSignature]);

  return (
    <main className="catalog-page">
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link to="/">Home</Link><span>/</span><span>{search ? 'Search results' : category || 'Shop all'}</span>
      </nav>
      <header className="catalog-heading">
        <div>
          <span className="section-eyebrow">{search ? 'A FEW GOOD MATCHES' : 'THOUGHTFULLY PICKED, READY TO LOVE'}</span>
          <h1>{search ? `Results for “${search}”` : category || 'Shop all products'}</h1>
          <p>Good finds from independent shops, brought together in one place.</p>
        </div>
        <div className="catalog-heading-note"><span>{products.length}</span><span>thoughtful finds<br />and counting</span></div>
      </header>

      <div className="catalog-layout">
        <aside className={`catalog-filters ${filtersOpen ? 'filters-open' : ''}`} aria-label="Product filters">
          <div className="filter-heading">
            <SlidersHorizontal size={17} /><strong>Filters</strong>
            {hasActiveFilters && <button type="button" onClick={clearFilters}>Clear</button>}
            <button type="button" className="mobile-filter-toggle" aria-expanded={filtersOpen} onClick={() => setFiltersOpen((open) => !open)}>
              {filtersOpen ? 'Done' : 'Edit'}
            </button>
          </div>
          <fieldset>
            <legend>Category</legend>
            <label className="filter-option">
              <input type="radio" name="category" checked={!category} onChange={() => updateFilter('category', '')} />
              <span>All categories</span><small>{products.length}</small>
            </label>
            {categories.map((name) => {
              const count = products.filter((product) => product.category === name).length;
              return (
                <label className="filter-option" key={name}>
                  <input type="radio" name="category" checked={category === name} onChange={() => updateFilter('category', name)} />
                  <span>{name}</span><small>{count}</small>
                </label>
              );
            })}
          </fieldset>
          <fieldset>
            <legend>Price</legend>
            {[
              ['all', 'Any price'],
              ['under-1000', 'Under ₹1,000'],
              ['1000-5000', '₹1,000 – ₹5,000'],
              ['5000-20000', '₹5,000 – ₹20,000'],
              ['over-20000', 'Over ₹20,000'],
            ].map(([value, label]) => (
              <label className="filter-option" key={value}>
                <input type="radio" name="price" checked={price === value} onChange={() => updateFilter('price', value === 'all' ? '' : value)} />
                <span>{label}</span>
              </label>
            ))}
          </fieldset>
          <div className="filter-promise"><span>Our little promise</span><p>Every shop is selected for thoughtful products and reliable service.</p></div>
        </aside>

        <section className="catalog-results" aria-live="polite">
          <div className="catalog-toolbar">
            <span><strong>{filteredProducts.length}</strong> {filteredProducts.length === 1 ? 'find' : 'finds'} to explore</span>
            <label className="sort-control">
              <span>Sort by</span>
              <div><select aria-label="Sort products" value={sort} onChange={(event) => updateFilter('sort', event.target.value === 'featured' ? '' : event.target.value)}>
                <option value="featured">Featured</option>
                <option value="rating">Top rated</option>
                <option value="price-low">Price: low to high</option>
                <option value="price-high">Price: high to low</option>
                <option value="name">Name: A to Z</option>
              </select><ChevronDown size={15} /></div>
            </label>
          </div>
          {(search || category || price !== 'all') && (
            <div className="active-filters">
              {search && <button type="button" onClick={() => updateFilter('search', '')}>“{search}” <X size={13} /></button>}
              {category && <button type="button" onClick={() => updateFilter('category', '')}>{category} <X size={13} /></button>}
              {price !== 'all' && <button type="button" onClick={() => updateFilter('price', '')}>Price filter <X size={13} /></button>}
            </div>
          )}
          {pageProducts.length ? (
            <>
              <div className="catalog-grid">
                {pageProducts.map((product) => <ProductCard key={product.id} product={product} />)}
              </div>
              {pageCount > 1 && (
                <nav className="pagination" aria-label="Product pages">
                  <button type="button" disabled={page === 1} onClick={() => setPage((current) => current - 1)}>Previous</button>
                  {Array.from({ length: pageCount }, (_, index) => index + 1).map((pageNumber) => (
                    <button
                      type="button"
                      key={pageNumber}
                      className={page === pageNumber ? 'is-current' : ''}
                      aria-current={page === pageNumber ? 'page' : undefined}
                      onClick={() => setPage(pageNumber)}
                    >{pageNumber}</button>
                  ))}
                  <button type="button" disabled={page === pageCount} onClick={() => setPage((current) => current + 1)}>Next <ArrowRight size={14} /></button>
                </nav>
              )}
            </>
          ) : (
            <div className="catalog-empty">
              <span className="empty-search-icon">⌕</span>
              <h2>No finds just yet</h2>
              <p>Try another search or clear a filter. We’re always adding new favorites.</p>
              <button type="button" className="primary-button" onClick={clearFilters}>Clear filters <ArrowRight size={15} /></button>
            </div>
          )}
        </section>
      </div>
    </main>
  );
};
