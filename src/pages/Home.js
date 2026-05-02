import { Link } from 'react-router-dom';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import { useState } from 'react';
import './Home.css';

export default function Home() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const featured = products.slice(0, 4);
  const offers = products.filter(p => p.originalPrice);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) { setSubscribed(true); setEmail(''); }
  };

  return (
    <div className="home">

      {/* HERO */}
      <section className="hero">
        <div className="hero-bg-grid"></div>
        <div className="hero-glow"></div>
        <div className="hero-content">
          <div className="hero-badge">
            <span className="pulse-dot"></span>
            Envíos en 24 hs a todo el país
          </div>
          <h1 className="hero-title">
            La mejor<br/><em>experiencia</em><br/>gamer
          </h1>
          <p className="hero-sub">
            Periféricos, consolas y accesorios premium para llevar tu juego al siguiente nivel.
          </p>
          <div className="hero-btns">
            <Link to="/productos" className="btn-primary">Ver productos</Link>
            <Link to="/productos?cat=Ofertas" className="btn-secondary">Ver ofertas</Link>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-gz">GZ</div>
          <div className="hero-emoji">🎮</div>
        </div>
        <div className="hero-stats">
          {[['500+', 'Productos'], ['10K+', 'Clientes'], ['24hs', 'Envío express'], ['5★', 'Calificación']].map(([n, l]) => (
            <div key={l} className="stat">
              <div className="stat-num">{n}</div>
              <div className="stat-label">{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* DESTACADOS */}
      <section className="section">
        <div className="section-header">
          <div>
            <div className="section-tag">Destacados</div>
            <h2 className="section-title">Productos más vendidos</h2>
          </div>
          <Link to="/productos" className="ver-todo">Ver todo el catálogo →</Link>
        </div>
        <div className="products-grid">
          {featured.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* BANNER PC GAMER */}
      <section className="pc-banner">
        <div className="pc-banner-inner">
          <div className="pc-banner-text">
            <div className="section-tag">Armá tu setup</div>
            <h2 className="section-title">PCs Gamer de alta gama</h2>
            <p>Configuraciones RTX 4070 y RTX 4090 listas para correr cualquier juego en ultra. Garantía oficial.</p>
            <Link to="/productos?cat=PCs Gamer" className="btn-primary" style={{display:'inline-block',marginTop:'20px'}}>
              Ver PCs Gamer
            </Link>
          </div>
          <div className="pc-banner-emoji">💻</div>
        </div>
      </section>

      {/* OFERTAS */}
      {offers.length > 0 && (
        <section className="section">
          <div className="section-header">
            <div>
              <div className="section-tag" style={{color:'#10B981'}}>Ofertas</div>
              <h2 className="section-title">Descuentos especiales</h2>
            </div>
            <Link to="/productos?cat=Ofertas" className="ver-todo">Ver todas →</Link>
          </div>
          <div className="products-grid">
            {offers.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}

      {/* LEADS */}
      <section className="leads">
        <div className="leads-inner">
          <div className="leads-text">
            <div className="section-tag">Newsletter</div>
            <h2 className="leads-title">Suscribite y recibí<br/>10% OFF en tu primera compra</h2>
            <p>Ofertas exclusivas y novedades gamer directo a tu casilla. Sin spam.</p>
          </div>
          <div className="leads-form-wrap">
            {subscribed ? (
              <div className="leads-success">
                <span>✓</span> ¡Gracias! Te enviamos el código de descuento.
              </div>
            ) : (
              <form className="leads-form" onSubmit={handleSubscribe}>
                <input
                  type="email"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
                <button type="submit">Suscribirme</button>
              </form>
            )}
          </div>
        </div>
      </section>

    </div>
  );
}
