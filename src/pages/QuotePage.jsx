import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import './QuotePage.css';

const PRODUCT_TYPES = ['Business Cards', 'Brochures', 'Letterhead & Envelopes', 'Custom Packaging', 'Notebooks', 'Banners & Flags', 'Other'];
const QUANTITIES = ['Under 100', '100–500', '500–1,000', '1,000–5,000', '5,000+'];
const FINISHES = ['Standard', 'Matte Laminate', 'Gloss Laminate', 'Gold Foil', 'Silver Foil', 'Embossing', 'Spot UV'];

export default function QuotePage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', product: '', quantity: '', finish: '', deadline: '', notes: '' });

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const handleSubmit = (e) => { e.preventDefault(); setSubmitted(true); };

  return (
    <main className="quote-page">
      <Helmet>
        <title>Request a Quote — Evora Print Studio</title>
        <meta name="description" content="Get a bespoke quote for your premium print project. Tell us about your requirements and we'll respond within 24 hours." />
      </Helmet>

      <section className="quote-hero">
        <div className="container">
          <span className="section-label">Get in Touch</span>
          <h1>Request a Quote</h1>
          <div className="gold-divider" />
          <p className="quote-hero__sub">Tell us about your project and we'll get back to you within 24 hours with a bespoke proposal.</p>
        </div>
      </section>

      <div className="container quote-layout">
        {/* Form */}
        <section className="quote-form-wrap" aria-label="Quote request form">
          {submitted ? (
            <div className="quote-success">
              <div className="quote-success__icon">✦</div>
              <h2>Thank You!</h2>
              <p>We've received your request and will send you a bespoke proposal within 24 hours.</p>
              <button className="btn-primary" onClick={() => setSubmitted(false)} style={{ marginTop: 24 }}>Submit Another Request</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="quote-form" noValidate>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="quote-name">Full Name *</label>
                  <input id="quote-name" type="text" required placeholder="Jane Doe" value={form.name} onChange={e => set('name', e.target.value)} />
                </div>
                <div className="form-group">
                  <label htmlFor="quote-company">Company</label>
                  <input id="quote-company" type="text" placeholder="Lumina Agency" value={form.company} onChange={e => set('company', e.target.value)} />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="quote-email">Email Address *</label>
                  <input id="quote-email" type="email" required placeholder="jane@lumina.ae" value={form.email} onChange={e => set('email', e.target.value)} />
                </div>
                <div className="form-group">
                  <label htmlFor="quote-phone">Phone Number</label>
                  <input id="quote-phone" type="tel" placeholder="+971 50 000 0000" value={form.phone} onChange={e => set('phone', e.target.value)} />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="quote-product">Product Type *</label>
                  <select id="quote-product" required value={form.product} onChange={e => set('product', e.target.value)}>
                    <option value="">Select a product...</option>
                    {PRODUCT_TYPES.map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="quote-qty">Estimated Quantity *</label>
                  <select id="quote-qty" required value={form.quantity} onChange={e => set('quantity', e.target.value)}>
                    <option value="">Select quantity range...</option>
                    {QUANTITIES.map(q => <option key={q} value={q}>{q}</option>)}
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="quote-finish">Preferred Finish</label>
                  <select id="quote-finish" value={form.finish} onChange={e => set('finish', e.target.value)}>
                    <option value="">Select finish...</option>
                    {FINISHES.map(f => <option key={f} value={f}>{f}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="quote-deadline">Desired Deadline</label>
                  <input id="quote-deadline" type="date" value={form.deadline} onChange={e => set('deadline', e.target.value)} />
                </div>
              </div>
              <div className="form-group form-group--full">
                <label htmlFor="quote-notes">Additional Notes</label>
                <textarea id="quote-notes" rows={4} placeholder="Tell us more about your project — dimensions, paper weight, design files, etc." value={form.notes} onChange={e => set('notes', e.target.value)} />
              </div>
              <button type="submit" className="btn-primary quote-submit-btn">Send My Request →</button>
            </form>
          )}
        </section>

        {/* Sidebar info */}
        <aside className="quote-info" aria-label="Contact information">
          <div className="quote-info__card">
            <h3>Why Choose Evora?</h3>
            <div className="gold-divider" />
            {[
              { icon: '✦', title: 'Premium Quality', desc: 'Every job is checked against our 22-point quality assurance process.' },
              { icon: '⚡', title: 'Fast Turnaround', desc: 'Express 48-hour service available on most products.' },
              { icon: '◆', title: 'Expert Guidance', desc: 'Dedicated print consultants guide you from brief to delivery.' },
              { icon: '✉', title: '24hr Response', desc: "We'll review your brief and respond with a full proposal within 24 hours." },
            ].map(item => (
              <div key={item.title} className="quote-info__item">
                <span className="quote-info__item-icon">{item.icon}</span>
                <div>
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="quote-info__contact">
            <h4>Or reach us directly</h4>
            <a href="tel:+18008362376" className="quote-contact-link">+1 (800) EVORA-PR</a>
            <a href="mailto:hello@evora.ae" className="quote-contact-link">hello@evora.ae</a>
            <p className="quote-contact-hours">Mon–Fri, 9:00 AM – 6:00 PM GST</p>
          </div>
        </aside>
      </div>
    </main>
  );
}
