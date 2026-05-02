import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './ProductCard.css';

export default function ProductCard({ product }) {
  const { add } = useCart();

  const handleAdd = (e) => {
    e.preventDefault();
    add(product);
  };

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  return (
    <Link to={`/producto/${product.id}`} className="product-card">
      {product.badge && (
        <span className="product-badge" style={{ background: product.badgeColor }}>
          {product.badge}
        </span>
      )}
      {discount && (
        <span className="product-discount">-{discount}%</span>
      )}

      <div className="product-img">
        <span>{product.emoji}</span>
      </div>

      <div className="product-body">
        <div className="product-category">{product.category}</div>
        <div className="product-name">{product.name}</div>

        <div className="product-rating">
          <span className="stars">{'★'.repeat(Math.floor(product.rating))}{'☆'.repeat(5 - Math.floor(product.rating))}</span>
          <span className="rating-num">{product.rating}</span>
          <span className="reviews">({product.reviews})</span>
        </div>

        <div className="product-footer">
          <div className="product-prices">
            <div className="product-price">${product.price.toLocaleString('es-AR')}</div>
            {product.originalPrice && (
              <div className="product-original">${product.originalPrice.toLocaleString('es-AR')}</div>
            )}
          </div>
          <button className="add-btn" onClick={handleAdd}>
            + Carrito
          </button>
        </div>

        <div className="product-stock">
          {product.stock <= 5
            ? <span style={{ color: 'var(--red)' }}>¡Solo {product.stock} en stock!</span>
            : <span style={{ color: 'var(--green)' }}>En stock</span>
          }
        </div>
      </div>
    </Link>
  );
}
