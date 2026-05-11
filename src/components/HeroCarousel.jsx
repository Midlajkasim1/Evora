import { useState, useEffect, useRef } from 'react';

const HERO_SLIDES = [
  {
    bg: '#e8e8e8',
    textColor: '#111',
    label: 'Premium Quality',
    headline: 'Your Brand Speaks\nTheir Desk, Every Day',
    sub: 'Bespoke luxury print solutions crafted for visionary brands.',
    cta: 'Get a Quote',
    ctaTo: '/quote',
    img: '/images/corporate-gifts.png',
  },
  {
    bg: '#1a1a2e',
    textColor: '#fff',
    label: 'Fast Turnaround',
    headline: 'Delivered in 48 Hours\nAcross the UAE',
    sub: 'Express print service on 350+ products — guaranteed on time.',
    cta: 'Shop Now',
    ctaTo: '/products',
    img: '/images/hero-slide1.png',
  },
  {
    bg: '#0d2010',
    textColor: '#fff',
    label: '🇦🇪 National Day',
    headline: 'Celebrate the UAE\nWith Custom Gifts',
    sub: 'Exclusive patriotic merchandise for the National Day season.',
    cta: 'Shop National Day',
    ctaTo: '/products',
    img: '/images/national-day.png',
  },
];

export default function HeroCarousel() {
  const [active, setActive] = useState(0);
  const timerRef = useRef(null);
  const total = HERO_SLIDES.length;

  const goTo = (idx) => setActive((idx + total) % total);

  useEffect(() => {
    timerRef.current = setInterval(() => setActive(a => (a + 1) % total), 5000);
    return () => clearInterval(timerRef.current);
  }, [total]);

  const slide = HERO_SLIDES[active];

  return (
    <section className="banner-carousel" aria-label="Promotional banners">
      <div
        className="bc-wrap"
        style={{ background: slide.bg, color: slide.textColor }}
      >
        <div className="bc-text">
          <span className="bc-label" style={{ color: slide.textColor === '#fff' ? 'var(--gold)' : 'var(--gold-dark)' }}>
            {slide.label}
          </span>
          <h2 className="bc-headline" style={{ color: slide.textColor }}>
            {slide.headline.split('\n').map((l, i) => <span key={i}>{l}<br /></span>)}
          </h2>
          <p className="bc-sub" style={{ color: slide.textColor === '#fff' ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.6)' }}>
            {slide.sub}
          </p>
          <a
            href={slide.ctaTo}
            className="bc-cta"
            style={{
              background: 'var(--gold-gradient-btn)',
              backgroundSize: '200% auto',
              color: 'var(--black)',
            }}
          >
            {slide.cta} →
          </a>
        </div>

        <div className="bc-img">
          <img src={slide.img} alt={slide.label} loading="eager" />
        </div>

        <button className="bc-arrow bc-arrow--prev" onClick={() => goTo(active - 1)} aria-label="Previous">
          ‹
        </button>
        <button className="bc-arrow bc-arrow--next" onClick={() => goTo(active + 1)} aria-label="Next">
          ›
        </button>
      </div>

      <div className="bc-dots">
        {HERO_SLIDES.map((_, i) => (
          <button
            key={i}
            className={`bc-dot${i === active ? ' bc-dot--active' : ''}`}
            onClick={() => goTo(i)}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
