import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { products, categories } from '../data/products';
import ProductCard from '../components/ProductCard';
import './Products.css';

export default function Products() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const initCat = params.get('cat') || 'Todos';
  const initQ = params.get('q') || '';

  const [search, setSearch] = useState(initQ);
  const [category, setCategory] = useState(initCat);
  const [sort, setSort] = useState('default');
  const [priceMax, setPriceMax] = useState(2000000);

  useEffect(() => {
    const p = new URLSearchParams(location.search);
    setCategory(p.get('cat') || 'Todos');
    setSearch(p.get('q') || '');
  }, [location.search]);

  const filtered = products
    .filter(p => {
      if (category === 'Ofertas') return !!p.originalPrice;
      if (category !== 'Todos') return p.category === category;
      return true;
    })
    .filter(p => {
      if (!search) return true;
      return p.name.toLowerCase().includes(search.toLowerCase()) ||
             p.category.toLowerCase().includes(search.toLowerCase());
    })
    .filter(p => p.price <= priceMax)
    .sort((a, b) => {
      if (sort === 'price-asc') return a.price - b.price;
      if (sort === 'price-desc') return b.price - a.price;
      if (sort === 'rating') return b.rating - a.rating;
      return 0;
    });

  return (
    <div className="products-page">
      <div className="products-header">
        <div className="products-header-inner">
          <h1>
            {category !== 'Todos' ? category : 'Todos los productos'}
            {search && <span className="search-indicator"> — "{search}"</span>}
          </h1>
          <span className="results-count">{filtered.length} resultados</span>
        </div>
      </div>

      <div className="products-layout">

        {/* SIDEBAR */}
        <aside className="sidebar">
          <div className="filter-group">
            <h3>Buscar</h3>
            <div className="search-input-wrap">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Buscar productos..."
              />
            </div>
          </div>

          <div className="filter-group">
            <h3>Categorías</h3>
            <div className="cat-list">
              {['Todos', 'Ofertas', ...categories.slice(1)].map(cat => (
                <button
                  key={cat}
                  className={`cat-btn ${category === cat ? 'active' : ''}`}
                  onClick={() => setCategory(cat)}
                >
                  {cat}
                  <span>{cat === 'Todos' ? products.length : cat === 'Ofertas' ? products.filter(p => p.originalPrice).length : products.filter(p => p.category === cat).length}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <h3>Precio máximo</h3>
            <input
              type="range"
              min={10000}
              max={2000000}
              step={10000}
              value={priceMax}
              onChange={e => setPriceMax(+e.target.value)}
              className="price-range"
            />
            <div className="price-display">hasta ${priceMax.toLocaleString('es-AR')}</div>
          </div>

          <div className="filter-group">
            <h3>Ordenar por</h3>
            <select value={sort} onChange={e => setSort(e.target.value)} className="sort-select">
              <option value="default">Relevancia</option>
              <option value="price-asc">Precio: menor a mayor</option>
              <option value="price-desc">Precio: mayor a menor</option>
              <option value="rating">Mejor calificados</option>
            </select>
          </div>
        </aside>

        {/* GRID */}
        <div className="products-main">
          {filtered.length === 0 ? (
            <div className="no-results">
              <span>🔍</span>
              <h3>Sin resultados</h3>
              <p>Probá con otro término o categoría.</p>
              <button onClick={() => { setSearch(''); setCategory('Todos'); setPriceMax(2000000); }}>
                Limpiar filtros
              </button>
            </div>
          ) : (
            <div className="products-grid-main">
              {filtered.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
