import Logo from './Logo';
import './Footer.css';

const QUICK_LINKS = [
  'About Us', 'Blogs', 'Marketing Materials', 'Business Cards',
  'Magazines & Books', 'Stationery & Labels', 'Corporate Gifts',
  'Flags', 'National Day Products', 'Events & Exhibitions',
  'Premium Packaging', 'Privacy Policy', 'Contact Us',
];

export default function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="footer__top container">

        {/* Brand Column */}
        <div className="footer__brand">
          <a href="/" className="footer__logo">
            <Logo className="footer__logo-svg" />
          </a>
          <p className="footer__desc">
            At Evora, we are the trusted experts in delivering premium and innovative printing solutions for every requirement. Our team of seasoned professionals, backed by cutting-edge technology, ensures each project is executed with unmatched precision, sophistication, and finesse.
          </p>
          <p className="footer__location">
            Location: <strong>UAE</strong> / <strong>IN</strong>
          </p>
        </div>

        {/* Call Us */}
        <div className="footer__col">
          <h4 className="footer__col-heading">Call us</h4>
          <div className="footer__contact-group">
            <p className="footer__contact-region">Dubai, UAE</p>
            <a href="tel:+971569786395" className="footer__contact-link">+971 56 978 6395</a>
          </div>
          <div className="footer__contact-group">
            <p className="footer__contact-region">Abu Dhabi, UAE</p>
            <a href="tel:+971564578672" className="footer__contact-link">+971 56 457 8672</a>
          </div>
          <h4 className="footer__col-heading" style={{ marginTop: 24 }}>Email us</h4>
          <a href="mailto:info@evora.com" className="footer__contact-link">info@evora.com</a>
        </div>

        {/* Quick Links */}
        <div className="footer__col">
          <h4 className="footer__col-heading">Quick Links</h4>
          <ul className="footer__links">
            {QUICK_LINKS.map(l => (
              <li key={l}><a href="#" className="footer__link">{l}</a></li>
            ))}
          </ul>
        </div>

        {/* Newsletter */}
        <div className="footer__col">
          <h4 className="footer__col-heading">Join Our Newsletter</h4>
          <p className="footer__newsletter-text">Subscribe to receive the latest print trends, exclusive offers, and branding tips.</p>
          <form className="footer__newsletter-form" onSubmit={e => e.preventDefault()}>
            <input type="email" placeholder="Your Email Address" className="footer__input" required />
            <button type="submit" className="footer__btn">Join</button>
          </form>
          <div className="footer__social">
            <a href="#" aria-label="Facebook">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a href="#" aria-label="Instagram">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </a>
            <a href="#" aria-label="LinkedIn">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
          </div>
        </div>
      </div>

      <div className="footer__bottom container">
        <p>© {new Date().getFullYear()} Evora. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
