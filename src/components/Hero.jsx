import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

const SLIDES = [
  {
    headline: 'Your Brand\nTheir Desk, Every Day',
    sub: 'Bespoke Print Solutions for Visionary Brands.',
    cta: 'Get a Quote ?',
    img: '/images/hero-bg.png',
  },
  {
    headline: 'Luxury Packaging\nRefined & Reliable',
    sub: 'From luxury business cards to bespoke packaging — every detail, perfected.',
    cta: 'Get a Quote ?',
    img: '/images/brochure.png',
  },
];

export default function Hero() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive(a => (a + 1) % SLIDES.length), 5500);
    return () => clearInterval(t);
  }, []);

  const slide = SLIDES[active];

  return (
    <>
      <section className="hero" aria-label="Hero banner">
        {SLIDES.map((s, i) => (
          <div key={i} className={`hero__bg${i === active ? ' hero__bg--active' : ''}`}>
            <img src={s.img} alt="" loading={i === 0 ? 'eager' : 'lazy'} />
            <div className="hero__overlay" />
          </div>
        ))}

        <div className="hero__content container">
          <div className="hero__text">
            <h1 className="hero__headline">
              {slide.headline.split('\n').map((line, i) => (
                <span key={i}>{line}<br /></span>
              ))}
            </h1>
            <div className="hero__ctas">
              <Link to="/quote" className="btn-hero-quote">{slide.cta}</Link>
            </div>
          </div>
        </div>

        <div className="hero__dots">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              className={`hero__dot${i === active ? ' hero__dot--active' : ''}`}
              onClick={() => setActive(i)}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </section>

      {/* ── Trust Bar (Features) ─────────────────────────────── */}
      <section className="trust-bar">
        <div className="container trust-bar__inner">
          {[
            { icon: '🏆', label: 'Capital for Quality' },
            { icon: '💰', label: 'Value for Money' },
            { icon: '🚚', label: 'Speed & Reliability' },
            { icon: '👤', label: 'Professional Advisor' },
            { icon: '📦', label: '250+ Products' },
          ].map(item => (
            <div key={item.label} className="trust-item">
              <div className="trust-icon" style={{ color: 'var(--gold-dark)' }}>{item.icon}</div>
              <span className="trust-label">{item.label}</span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
