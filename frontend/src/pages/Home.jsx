import { useEffect, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'

const CATEGORIES = ['All', 'Skincare', 'Makeup', 'Haircare', 'Fragrance']

const SORTS = [
  { label: 'Featured',  value: '' },
  { label: 'Price ↑',   value: 'price-asc' },
  { label: 'Price ↓',   value: 'price-desc' },
  { label: 'Top Rated', value: 'rating' },
]

const CATEGORY_IMAGES = {
  Skincare:  'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&q=80',
  Makeup:    'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&q=80',
  Haircare:  'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?w=600&q=80',
  Fragrance: 'https://images.unsplash.com/photo-1563170351-be82bc888aa4?w=600&q=80',
}

/* ── Marquee Strip ──────────────────────────────────────── */
function MarqueeStrip() {
  const text =
    '  FREE DELIVERY OVER £40  ·  CRUELTY-FREE  ·  CLEAN BEAUTY  ·  VEGAN OPTIONS  ·  30-DAY RETURNS  ·  NEW COLLECTION 2026  ·'
  return (
    <div style={{ overflow: 'hidden', background: 'var(--burgundy)', padding: '10px 0' }}>
      <div
        style={{
          display: 'flex',
          animation: 'marquee 50s linear infinite',
          whiteSpace: 'nowrap',
          width: 'max-content',
        }}
      >
        {Array(4)
          .fill(text)
          .map((t, i) => (
            <span
              key={i}
              style={{
                display: 'inline-block',
                color: 'rgba(255,255,255,0.88)',
                fontSize: '0.6rem',
                letterSpacing: '0.24em',
                fontFamily: '"Jost", sans-serif',
                fontWeight: 500,
              }}
            >
              {t}
            </span>
          ))}
      </div>
    </div>
  )
}

/* ── Hero ───────────────────────────────────────────────── */
function Hero() {
  return (
    <section
      style={{
        maxWidth: '80rem',
        margin: '0 auto',
        padding: '6rem 4rem',
        display: 'grid',
        gridTemplateColumns: '5fr 3fr',
        gap: '3rem',
        alignItems: 'center',
        position: 'relative',
      }}
    >
      {/* Thin vertical gold rule between columns */}
      <div
        style={{
          position: 'absolute',
          left: '62.5%',
          top: '12%',
          bottom: '12%',
          width: '1px',
          background: 'var(--gold)',
          opacity: 0.3,
        }}
        className="hidden md:block"
      />

      {/* ── Left editorial copy ─── */}
      <div style={{ paddingRight: '2rem' }}>
        {/* Season label with bullet */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem' }}>
          <span className="section-label">Spring / Summer 2026</span>
          <span
            style={{
              display: 'inline-block',
              width: '5px',
              height: '5px',
              borderRadius: '50%',
              background: 'var(--burgundy)',
              flexShrink: 0,
            }}
          />
        </div>

        {/* Thin gold rule */}
        <div
          style={{
            width: '60px',
            height: '1px',
            background: 'var(--gold)',
            marginBottom: '1.5rem',
          }}
        />

        {/* Giant display heading */}
        <h1
          className="font-display"
          style={{
            fontSize: 'clamp(4rem, 9vw, 8rem)',
            fontWeight: 500,
            fontStyle: 'italic',
            lineHeight: 0.95,
            color: 'var(--ink)',
            letterSpacing: '-0.02em',
            marginBottom: '2rem',
          }}
        >
          The Art
          <br />
          <em style={{ fontStyle: 'italic' }}>of</em>
          <br />
          <span
            style={{
              fontStyle: 'normal',
              fontWeight: 400,
            }}
          >
            Beauty.
          </span>
        </h1>

        {/* Short description */}
        <p
          style={{
            fontFamily: '"Jost", sans-serif',
            fontWeight: 300,
            fontSize: '1rem',
            color: 'var(--ink-muted)',
            lineHeight: 1.7,
            maxWidth: '26rem',
            marginBottom: '2.5rem',
          }}
        >
          Curated luxury beauty from the world's most coveted houses — where
          ritual meets refinement and every detail is intentional.
        </p>

        {/* CTAs */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '3rem' }}>
          <a href="#products" className="btn-primary">
            EXPLORE COLLECTION
          </a>
          <Link
            to="/"
            className="btn-ghost"
            style={{ fontSize: '0.72rem', letterSpacing: '0.14em' }}
          >
            Our Story →
          </Link>
        </div>

        {/* Decorative — Est. 2016 */}
        <p
          style={{
            fontFamily: '"Cormorant Garamond", Georgia, serif',
            fontStyle: 'italic',
            fontWeight: 300,
            fontSize: '0.95rem',
            color: 'var(--gold)',
            letterSpacing: '0.06em',
          }}
        >
          — Est. 2016
        </p>
      </div>

      {/* ── Right tall image ─── */}
      <div className="hidden md:block">
        <div
          style={{
            aspectRatio: '4/5',
            borderRadius: 'var(--r-xl)',
            overflow: 'hidden',
            boxShadow: 'var(--shadow-lg)',
            position: 'relative',
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=600&q=80"
            alt="Spring Collection 2026"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          {/* Subtle gradient vignette */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(to bottom, transparent 60%, rgba(24,17,14,0.18) 100%)',
            }}
          />
        </div>
        {/* Editorial caption */}
        <p
          style={{
            fontFamily: '"Jost", sans-serif',
            fontSize: '0.6rem',
            fontWeight: 400,
            color: 'var(--ink-dim)',
            letterSpacing: '0.1em',
            marginTop: '0.75rem',
            paddingLeft: '0.25rem',
          }}
        >
          Spring / Summer 2026 — Lumière Selection
        </p>
      </div>
    </section>
  )
}

/* ── Category tiles ─────────────────────────────────────── */
function CategoryTiles({ onSelect }) {
  return (
    <section style={{ maxWidth: '80rem', margin: '0 auto', padding: '5rem 4rem' }}>
      {/* Section header */}
      <div style={{ marginBottom: '2.5rem' }}>
        <p className="section-label" style={{ marginBottom: '0.75rem' }}>
          Shop by Category
        </p>
        <h2
          className="font-display"
          style={{ fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', fontWeight: 400, color: 'var(--ink)' }}
        >
          Curated Edits
        </h2>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '1.25rem',
        }}
      >
        {CATEGORIES.slice(1).map((cat) => (
          <button
            key={cat}
            onClick={() => onSelect(cat)}
            style={{
              position: 'relative',
              aspectRatio: '3/4',
              borderRadius: 'var(--r-xl)',
              overflow: 'hidden',
              border: 'none',
              boxShadow: 'var(--shadow-sm)',
              transition: 'box-shadow 0.35s ease, transform 0.35s cubic-bezier(0.16,1,0.3,1)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = 'var(--shadow-lg)'
              e.currentTarget.style.transform = 'translateY(-3px)'
              const img = e.currentTarget.querySelector('img')
              if (img) img.style.transform = 'scale(1.1)'
              const label = e.currentTarget.querySelector('.cat-shop-now')
              if (label) label.style.opacity = '1'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = 'var(--shadow-sm)'
              e.currentTarget.style.transform = 'translateY(0)'
              const img = e.currentTarget.querySelector('img')
              if (img) img.style.transform = 'scale(1)'
              const label = e.currentTarget.querySelector('.cat-shop-now')
              if (label) label.style.opacity = '0'
            }}
          >
            <img
              src={CATEGORY_IMAGES[cat]}
              alt={cat}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                filter: 'brightness(0.65)',
                transition: 'transform 0.7s cubic-bezier(0.16,1,0.3,1)',
              }}
            />
            {/* Gradient overlay */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(to top, rgba(139,46,78,0.6) 0%, transparent 55%)',
              }}
            />
            {/* Text */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-end',
                paddingBottom: '1.5rem',
              }}
            >
              <p
                className="font-display"
                style={{
                  color: '#fff',
                  fontSize: '1.25rem',
                  fontWeight: 400,
                  textShadow: '0 2px 12px rgba(0,0,0,0.3)',
                  marginBottom: '0.4rem',
                }}
              >
                {cat}
              </p>
              <p
                className="cat-shop-now"
                style={{
                  fontFamily: '"Jost", sans-serif',
                  fontSize: '0.55rem',
                  fontWeight: 500,
                  letterSpacing: '0.22em',
                  color: 'rgba(255,255,255,0.9)',
                  textTransform: 'uppercase',
                  opacity: 0,
                  transition: 'opacity 0.3s ease',
                }}
              >
                SHOP NOW →
              </p>
            </div>
          </button>
        ))}
      </div>
    </section>
  )
}

/* ── Editorial Quote ────────────────────────────────────── */
function EditorialQuote() {
  return (
    <section style={{ background: 'var(--cream-surface)', padding: '5.5rem 1.5rem' }}>
      <div style={{ maxWidth: '52rem', margin: '0 auto', textAlign: 'center' }}>
        {/* Decorative thin lines */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1.25rem',
            marginBottom: '2.5rem',
          }}
        >
          <div style={{ flex: 1, maxWidth: '80px', height: '1px', background: 'var(--gold)', opacity: 0.5 }} />
          <span style={{ color: 'var(--gold)', fontSize: '0.6rem', letterSpacing: '0.3em', fontFamily: '"Jost", sans-serif', fontWeight: 500 }}>
            ◈
          </span>
          <div style={{ flex: 1, maxWidth: '80px', height: '1px', background: 'var(--gold)', opacity: 0.5 }} />
        </div>

        <blockquote
          className="font-italic"
          style={{
            fontSize: 'clamp(1.8rem, 4vw, 3rem)',
            fontStyle: 'italic',
            fontWeight: 300,
            color: 'var(--ink)',
            lineHeight: 1.35,
            marginBottom: '2rem',
            letterSpacing: '0.01em',
          }}
        >
          "Every product in our collection is chosen for its efficacy,
          its ethics, and the quiet artistry of its making."
        </blockquote>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
          }}
        >
          <div style={{ width: '40px', height: '1px', background: 'var(--burgundy)', opacity: 0.5 }} />
          <p className="section-label">The Lumière Curation Team</p>
          <div style={{ width: '40px', height: '1px', background: 'var(--burgundy)', opacity: 0.5 }} />
        </div>
      </div>
    </section>
  )
}

/* ── Trust Bar ──────────────────────────────────────────── */
function TrustBar() {
  const items = [
    { symbol: '◈', title: 'Free Delivery',  sub: 'On orders over £40' },
    { symbol: '◇', title: 'Clean Beauty',   sub: '100% cruelty-free' },
    { symbol: '↺', title: '30-Day Returns', sub: 'No questions asked' },
    { symbol: '⬡', title: 'Secure Checkout',sub: '256-bit encryption' },
  ]
  return (
    <section style={{ maxWidth: '68rem', margin: '0 auto', padding: '4.5rem 1.5rem' }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
          gap: '2rem',
        }}
      >
        {items.map((t) => (
          <div key={t.title} style={{ textAlign: 'center' }}>
            <p
              className="font-italic"
              style={{
                fontSize: '2rem',
                fontStyle: 'italic',
                color: 'var(--gold)',
                marginBottom: '0.65rem',
                lineHeight: 1,
              }}
            >
              {t.symbol}
            </p>
            <p
              className="label"
              style={{ marginBottom: '0.3rem', color: 'var(--ink)' }}
            >
              {t.title}
            </p>
            <p
              style={{
                fontFamily: '"Jost", sans-serif',
                fontSize: '0.75rem',
                fontWeight: 300,
                color: 'var(--ink-dim)',
              }}
            >
              {t.sub}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ── Product Grid Skeleton ──────────────────────────────── */
function GridSkeleton() {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '1.25rem',
      }}
    >
      {Array(8)
        .fill(null)
        .map((_, i) => (
          <div
            key={i}
            style={{
              background: 'var(--cream-card)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--r-lg)',
              overflow: 'hidden',
            }}
          >
            <div className="skeleton" style={{ aspectRatio: '3/4' }} />
            <div style={{ padding: '1rem 1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div className="skeleton" style={{ height: '8px', width: '40%', borderRadius: '4px' }} />
              <div className="skeleton" style={{ height: '14px', width: '80%', borderRadius: '4px' }} />
              <div className="skeleton" style={{ height: '10px', width: '60%', borderRadius: '4px' }} />
            </div>
          </div>
        ))}
    </div>
  )
}

/* ── Home page ──────────────────────────────────────────── */
export default function Home() {
  const [products, setProducts]  = useState([])
  const [loading,  setLoading]   = useState(true)
  const [category, setCategory]  = useState('All')
  const [sort,     setSort]      = useState('')
  const [searchParams]           = useSearchParams()
  const searchQuery              = searchParams.get('search') || ''
  const urlCategory              = searchParams.get('category') || ''

  useEffect(() => {
    if (urlCategory && CATEGORIES.includes(urlCategory)) setCategory(urlCategory)
  }, [urlCategory])

  useEffect(() => {
    setLoading(true)
    const p = new URLSearchParams()
    if (category !== 'All') p.set('category', category)
    if (sort)               p.set('sort', sort)
    if (searchQuery)        p.set('search', searchQuery)
    fetch(`/api/products?${p}`)
      .then((r) => r.json())
      .then((d) => { setProducts(d.products); setLoading(false) })
  }, [category, sort, searchQuery])

  return (
    <div>
      {/* Hero — asymmetric editorial layout */}
      <Hero />

      {/* Marquee strip — full width, burgundy */}
      <MarqueeStrip />

      {/* Category tiles */}
      <CategoryTiles onSelect={setCategory} />

      {/* ── Product Grid ─────────────────────────────── */}
      <section
        id="products"
        style={{ maxWidth: '80rem', margin: '0 auto', padding: '0 4rem 6rem' }}
      >
        {/* Filter + sort toolbar */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            paddingBottom: '1.5rem',
            marginBottom: '2.5rem',
            borderBottom: '1px solid var(--border)',
          }}
        >
          {/* Filter pills */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            <p className="section-label" style={{ marginRight: '0.5rem' }}>Filter</p>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={category === cat ? 'btn-primary' : 'btn-outline'}
                style={{
                  padding: '0.5rem 1.1rem',
                  fontSize: '0.58rem',
                  letterSpacing: '0.2em',
                }}
              >
                {cat.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Sort dropdown */}
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="input-dark"
            style={{ width: 'auto', fontSize: '0.78rem', padding: '0.5rem 1rem' }}
          >
            {SORTS.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>

        {/* Search context label */}
        {searchQuery && (
          <p
            style={{
              fontFamily: '"Jost", sans-serif',
              fontSize: '0.85rem',
              color: 'var(--ink-muted)',
              marginBottom: '2rem',
            }}
          >
            Results for{' '}
            <em style={{ color: 'var(--burgundy)', fontStyle: 'italic' }}>
              "{searchQuery}"
            </em>{' '}
            — {products.length} found
          </p>
        )}

        {loading ? (
          <GridSkeleton />
        ) : products.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '6rem 1rem' }}>
            <p
              className="font-display"
              style={{ fontSize: '5rem', color: 'var(--burgundy)', opacity: 0.2, marginBottom: '1rem' }}
            >
              ∅
            </p>
            <p
              className="font-display"
              style={{ fontSize: '1.6rem', color: 'var(--ink-muted)', marginBottom: '1rem', fontWeight: 400 }}
            >
              No products found
            </p>
            <button
              onClick={() => setCategory('All')}
              className="btn-outline"
              style={{ marginTop: '1rem' }}
            >
              CLEAR FILTERS
            </button>
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: '1.25rem',
            }}
          >
            {products.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        )}
      </section>

      {/* Editorial quote */}
      <EditorialQuote />

      {/* Trust bar */}
      <TrustBar />
    </div>
  )
}
