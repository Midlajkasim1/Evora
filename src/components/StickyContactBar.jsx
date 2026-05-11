import './StickyContactBar.css';

export default function StickyContactBar() {
  return (
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
        <a href="/quote" className="sticky-bar__btn sticky-bar__btn--quote">
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
  );
}
