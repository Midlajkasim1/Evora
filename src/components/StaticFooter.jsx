import Logo from './Logo';
import './StaticFooter.css';

const QUICK_LINKS = [
  'About Us', 'Blogs', 'Marketing Materials', 'Business Cards',
  'Magazines & Books', 'Stationery & Labels', 'Corporate Gifts',
  'Flags', 'National Day Products', 'Events & Exhibitions',
  'Premium Packaging', 'Privacy Policy', 'Contact Us',
];

export default function StaticFooter() {
  return (
    <>
      {/* ── Main Footer ─────────────────────────────────────── */}
      <footer className="static-footer" role="contentinfo">
        <div className="sf-top container">

          {/* Brand Column */}
          <div className="sf-brand">
            <a href="/" className="sf-logo">
              <Logo className="sf-logo-svg" />
            </a>
            <p className="sf-desc">
              At Evora, we are the trusted experts in delivering premium and innovative printing solutions for every requirement. Our team of seasoned professionals, backed by cutting-edge technology, ensures each project is executed with unmatched precision, sophistication, and finesse.
            </p>
            <p className="sf-location">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              Location: <strong>UAE</strong> / <strong>IN</strong>
            </p>
          </div>

          {/* Call Us */}
          <div className="sf-col">
            <h4 className="sf-col-heading">Call us</h4>
            <div className="sf-contact-group">
              <p className="sf-contact-region">Dubai, UAE</p>
              <a href="tel:+18008362376" className="sf-contact-link">+1 (800) EVORA-PR</a>
            </div>
            <div className="sf-contact-group">
              <p className="sf-contact-region">Abu Dhabi, UAE</p>
              <a href="tel:+18004578672" className="sf-contact-link">+1 (800) 457-8672</a>
            </div>
            <h4 className="sf-col-heading" style={{ marginTop: 24 }}>Email us</h4>
            <a href="mailto:hello@evora.ae" className="sf-contact-link">hello@evora.ae</a>
          </div>

          {/* Quick Links */}
          <div className="sf-col">
            <h4 className="sf-col-heading">Quick Links</h4>
            <ul className="sf-links">
              {QUICK_LINKS.map(l => (
                <li key={l}><a href="#" className="sf-link">{l}</a></li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="sf-col">
            <h4 className="sf-col-heading">Join Our Newsletter</h4>
            <p className="sf-newsletter-text">Subscribe for exclusive offers and premium print trends.</p>
            <form className="sf-newsletter-form" onSubmit={e => e.preventDefault()}>
              <input type="email" placeholder="Email Address" className="sf-input" required />
              <button type="submit" className="sf-btn">Join</button>
            </form>
          </div>
        </div>

        <div className="sf-bottom container">
          <p>© {new Date().getFullYear()} Evora Print Studio. All Rights Reserved.</p>
        </div>
      </footer>

      {/* ── Sticky Bottom Bar ───────────────────────────────── */}
      <div className="sticky-bar" role="complementary" aria-label="Quick contact bar">
        <div className="sticky-bar__inner">
          <a href="tel:+18008362376" className="sticky-bar__item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.6 3.26 2 2 0 0 1 3.56 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.54a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16l.19.92z"/></svg>
            +1 (800) EVORA-PR
          </a>
          <a href="mailto:hello@evora.ae" className="sticky-bar__item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            hello@evora.ae
          </a>
          <a href="/quote" className="sticky-bar__btn sticky-bar__btn--enquiry">Quick Enquiry</a>
          <a 
            href="https://wa.me/971569786395?text=Hi%2C%20I'm%20interested%20in%20getting%20a%20quote%20for%20printing%20services." 
            target="_blank"
            rel="noopener noreferrer"
            className="sticky-bar__btn sticky-bar__btn--quote"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 8 12 12 14 14"/></svg>
            Get Instant Quote
          </a>
          <div className="sticky-bar__social">
            <span>Follow Us</span>
            {[
              { label: 'Facebook', icon: 'f', href: '#facebook' },
              { label: 'Instagram', icon: '◈', href: '#instagram' },
              { label: 'LinkedIn', icon: 'in', href: '#linkedin' },
              { label: 'YouTube', icon: '▶', href: '#youtube' },
            ].map(s => (
              <a key={s.label} href={s.href} aria-label={s.label} className="sticky-bar__social-icon">{s.icon}</a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
