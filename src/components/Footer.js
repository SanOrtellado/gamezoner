import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="footer-logo">GAMER<span>ZONE</span></div>
            <p>Tu destino gamer con los mejores productos y precios del mercado.</p>
            <div className="footer-social">
              {['IG', 'TW', 'DC', 'YT'].map(s => (
                <a key={s} href="#!" className="social-link">{s}</a>
              ))}
            </div>
          </div>

          <div className="footer-col">
            <h4>Tienda</h4>
            <ul>
              <li><Link to="/productos">Todos los productos</Link></li>
              <li><Link to="/productos?cat=PCs Gamer">PCs Gamer</Link></li>
              <li><Link to="/productos?cat=Ofertas">Ofertas</Link></li>
              <li><Link to="/productos?cat=Audio">Audio</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Empresa</h4>
            <ul>
              <li><a href="#!">Sobre nosotros</a></li>
              <li><a href="#!">Blog</a></li>
              <li><a href="#!">Trabaja con nosotros</a></li>
              <li><a href="#!">Prensa</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Contacto</h4>
            <ul>
              <li><a href="mailto:contacto@gamerzone.com">contacto@gamerzone.com</a></li>
              <li><a href="#!">WhatsApp: +54 9 11 0000-0000</a></li>
              <li><a href="#!">Lun–Vie 9 a 18 hs</a></li>
              <li><Link to="/contacto">Formulario de contacto</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2025 GamerZone — Grupo 46. Todos los derechos reservados.</p>
          <p>Diseño Web y Mobile — Prof. Cristian</p>
        </div>
      </div>
    </footer>
  );
}
