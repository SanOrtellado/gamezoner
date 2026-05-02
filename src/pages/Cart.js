import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useState } from 'react';
import './Cart.css';

export default function Cart() {
  const { cart, total, remove, update, clear } = useCart();
  const [checkout, setCheckout] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', address: '' });
  const [done, setDone] = useState(false);

  const handleOrder = (e) => {
    e.preventDefault();
    setDone(true);
    clear();
  };

  if (done) return (
    <div className="cart-done">
      <div className="done-icon">✓</div>
      <h2>¡Pedido confirmado!</h2>
      <p>Te enviamos los detalles a {form.email}. Preparamos tu pedido en 24hs.</p>
      <Link to="/" className="btn-primary">Volver al inicio</Link>
    </div>
  );

  if (cart.length === 0) return (
    <div className="cart-empty">
      <span>🛒</span>
      <h2>Tu carrito está vacío</h2>
      <p>Agregá productos para continuar.</p>
      <Link to="/productos" className="btn-primary">Ver productos</Link>
    </div>
  );

  return (
    <div className="cart-page">
      <div className="cart-inner">
        <h1 className="cart-title">Carrito <span>({cart.length} {cart.length === 1 ? 'producto' : 'productos'})</span></h1>

        <div className="cart-layout">
          <div className="cart-items">
            {cart.map(item => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-img">{item.emoji}</div>
                <div className="cart-item-info">
                  <div className="cart-item-cat">{item.category}</div>
                  <Link to={`/producto/${item.id}`} className="cart-item-name">{item.name}</Link>
                  <div className="cart-item-price">${item.price.toLocaleString('es-AR')} c/u</div>
                </div>
                <div className="cart-item-controls">
                  <div className="qty-control">
                    <button onClick={() => update(item.id, item.qty - 1)}>−</button>
                    <span>{item.qty}</span>
                    <button onClick={() => update(item.id, item.qty + 1)}>+</button>
                  </div>
                  <div className="cart-item-subtotal">${(item.price * item.qty).toLocaleString('es-AR')}</div>
                  <button className="remove-btn" onClick={() => remove(item.id)}>✕</button>
                </div>
              </div>
            ))}

            <div className="cart-actions">
              <button className="clear-btn" onClick={clear}>Vaciar carrito</button>
              <Link to="/productos" className="continue-btn">← Seguir comprando</Link>
            </div>
          </div>

          <div className="cart-summary">
            <h3>Resumen del pedido</h3>

            <div className="summary-lines">
              {cart.map(item => (
                <div key={item.id} className="summary-line">
                  <span>{item.name} × {item.qty}</span>
                  <span>${(item.price * item.qty).toLocaleString('es-AR')}</span>
                </div>
              ))}
              <div className="summary-line summary-shipping">
                <span>Envío</span>
                <span className="free">GRATIS</span>
              </div>
            </div>

            <div className="summary-total">
              <span>Total</span>
              <span>${total.toLocaleString('es-AR')}</span>
            </div>

            {!checkout ? (
              <button className="checkout-btn" onClick={() => setCheckout(true)}>
                Finalizar compra →
              </button>
            ) : (
              <form className="checkout-form" onSubmit={handleOrder}>
                <h4>Datos de envío</h4>
                <input required placeholder="Nombre completo" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                <input required type="email" placeholder="Email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
                <input required placeholder="Dirección de envío" value={form.address} onChange={e => setForm({...form, address: e.target.value})} />
                <button type="submit" className="checkout-btn">Confirmar pedido</button>
              </form>
            )}

            <div className="summary-badges">
              <span>🔒 Pago seguro</span>
              <span>📦 Envío en 24hs</span>
              <span>↩ Devolución gratis</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
