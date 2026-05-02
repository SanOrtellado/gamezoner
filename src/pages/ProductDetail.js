import { useParams, Link } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { useState } from 'react';
import ProductCard from '../components/ProductCard';
import './ProductDetail.css';

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find(p => p.id === +id);
  const { add } = useCart();
  const [added, setAdded] = useState(false);
  const [qty, setQty] = useState(1);

  if (!product) return (
    <div style={{ textAlign: 'center', padding: '80px 24px' }}>
      <h2>Producto no encontrado</h2>
      <Link to="/productos" style={{ color: 'var(--accent-light)' }}>← Volver al catálogo</Link>
    </div>
  );

  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  const discount = product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) : null;

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) add(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="detail-page">
      <div className="detail-inner">

        <div className="breadcrumb">
          <Link to="/">Inicio</Link> / <Link to="/productos">Productos</Link> / <Link to={`/productos?cat=${product.category}`}>{product.category}</Link> / <span>{product.name}</span>
        </div>

        <div className="detail-grid">
          {/* IMAGEN */}
          <div className="detail-img-wrap">
            {product.badge && (
              <span className="detail-badge" style={{ background: product.badgeColor }}>{product.badge}</span>
            )}
            {discount && <span className="detail-discount">-{discount}%</span>}
            <div className="detail-img">
              <span>{product.emoji}</span>
            </div>
          </div>

          {/* INFO */}
          <div className="detail-info">
            <div className="detail-category">{product.category}</div>
            <h1 className="detail-name">{product.name}</h1>

            <div className="detail-rating">
              <span className="stars">{'★'.repeat(Math.floor(product.rating))}{'☆'.repeat(5 - Math.floor(product.rating))}</span>
              <span>{product.rating}</span>
              <span className="detail-reviews">({product.reviews} reseñas)</span>
            </div>

            <div className="detail-prices">
              <div className="detail-price">${product.price.toLocaleString('es-AR')}</div>
              {product.originalPrice && (
                <div className="detail-original">${product.originalPrice.toLocaleString('es-AR')}</div>
              )}
              {discount && <div className="detail-save">Ahorrás ${(product.originalPrice - product.price).toLocaleString('es-AR')}</div>}
            </div>

            <p className="detail-desc">{product.description}</p>

            <div className="detail-stock">
              {product.stock <= 5
                ? <span style={{ color: 'var(--red)' }}>⚠ Solo {product.stock} unidades disponibles</span>
                : <span style={{ color: 'var(--green)' }}>✓ En stock — Envío en 24hs</span>
              }
            </div>

            <div className="detail-qty-row">
              <div className="qty-control">
                <button onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
                <span>{qty}</span>
                <button onClick={() => setQty(Math.min(product.stock, qty + 1))}>+</button>
              </div>
              <button
                className={`add-cart-btn ${added ? 'added' : ''}`}
                onClick={handleAdd}
              >
                {added ? '✓ Agregado al carrito' : 'Agregar al carrito'}
              </button>
            </div>

            <div className="detail-specs">
              <h3>Especificaciones</h3>
              <ul>
                {product.specs.map((spec, i) => (
                  <li key={i}><span>✓</span> {spec}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <div className="related">
            <h2 className="section-title" style={{ marginBottom: '24px' }}>Productos relacionados</h2>
            <div className="products-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '20px' }}>
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
