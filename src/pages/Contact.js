import { useState } from 'react';
import './Contact.css';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="contact-page">
      <div className="contact-inner">
        <div className="contact-header">
          <div className="section-tag">Contacto</div>
          <h1>Estamos para ayudarte</h1>
          <p>¿Tenés dudas sobre algún producto o tu pedido? Escribinos.</p>
        </div>

        <div className="contact-grid">
          <div className="contact-info">
            {[
              { icon: '📧', title: 'Email', desc: 'contacto@gamerzone.com' },
              { icon: '💬', title: 'WhatsApp', desc: '+54 9 11 0000-0000' },
              { icon: '🕐', title: 'Horario', desc: 'Lun–Vie de 9 a 18 hs' },
              { icon: '📦', title: 'Envíos', desc: 'Todo el país en 24hs' },
            ].map(item => (
              <div key={item.title} className="info-card">
                <span className="info-icon">{item.icon}</span>
                <div>
                  <div className="info-title">{item.title}</div>
                  <div className="info-desc">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="contact-form-wrap">
            {sent ? (
              <div className="sent-msg">
                <span>✓</span>
                <h3>Mensaje enviado</h3>
                <p>Te respondemos en menos de 24 horas. ¡Gracias!</p>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-field">
                    <label>Nombre</label>
                    <input required placeholder="Tu nombre" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                  </div>
                  <div className="form-field">
                    <label>Email</label>
                    <input required type="email" placeholder="tu@email.com" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
                  </div>
                </div>
                <div className="form-field">
                  <label>Mensaje</label>
                  <textarea required placeholder="¿En qué podemos ayudarte?" rows={5} value={form.message} onChange={e => setForm({...form, message: e.target.value})} />
                </div>
                <button type="submit" className="send-btn">Enviar mensaje</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
