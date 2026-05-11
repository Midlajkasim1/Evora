import { useState } from 'react';

const PRODUCT_TYPES = ['Business Cards', 'Brochures', 'Letterhead & Envelopes', 'Custom Packaging', 'Notebooks', 'Banners & Flags', 'Other'];
const QUANTITIES = ['Under 100', '100–500', '500–1,000', '1,000–5,000', '5,000+'];
const FINISHES = ['Standard', 'Matte Laminate', 'Gloss Laminate', 'Gold Foil', 'Silver Foil', 'Embossing', 'Spot UV'];

export default function QuoteForm() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', product: '', quantity: '', finish: '', deadline: '', notes: '' });

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const handleSubmit = (e) => { e.preventDefault(); setSubmitted(true); };

  if (submitted) {
    return (
      <div className="quote-success">
        <div className="quote-success__icon">✦</div>
        <h2>Thank You!</h2>
        <p>We've received your request and will send you a bespoke proposal within 24 hours.</p>
        <button className="btn-primary" onClick={() => setSubmitted(false)} style={{ marginTop: 24 }}>Submit Another Request</button>
      </div>
    );
  }

  return (
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
  );
}
