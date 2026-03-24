import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useState } from 'react'

const STAR_PATH = 'M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'

function BadgeChip({ badge }) {
  if (!badge) return null
  const cls =
    badge === 'Bestseller' ? 'badge-bestseller'
    : badge === 'New'      ? 'badge-new'
    : 'badge-vegan'
  return (
    <span
      className={cls}
      style={{
        position: 'absolute',
        top: '0.75rem',
        left: '0.75rem',
      }}
    >
      {badge}
    </span>
  )
}

export default function ProductCard({ product, index = 0 }) {
  const { addToCart }        = useCart()
  const [adding, setAdding]  = useState(false)
  const [added,  setAdded]   = useState(false)

  const handleAdd = async (e) => {
    e.preventDefault()
    setAdding(true)
    await addToCart(product.id)
    setAdding(false)
    setAdded(true)
    setTimeout(() => setAdded(false), 2200)
  }

  const stagger = `stagger-${Math.min(index + 1, 6)}`

  return (
    <Link
      to={`/products/${product.id}`}
      className={`group animate-fade-up ${stagger}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--cream-card)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--r-lg)',
        boxShadow: 'var(--shadow-sm)',
        textDecoration: 'none',
        overflow: 'hidden',
        transition:
          'box-shadow 0.35s ease, transform 0.35s cubic-bezier(0.16,1,0.3,1), border-color 0.3s',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow  = 'var(--shadow-md)'
        e.currentTarget.style.transform  = 'translateY(-4px)'
        e.currentTarget.style.borderColor = 'var(--border-hi)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow  = 'var(--shadow-sm)'
        e.currentTarget.style.transform  = 'translateY(0)'
        e.currentTarget.style.borderColor = 'var(--border)'
      }}
    >
      {/* ── Image container 3:4 ─────────────────────────────── */}
      <div
        style={{
          position: 'relative',
          aspectRatio: '3/4',
          overflow: 'hidden',
          background: 'var(--cream-surface)',
          flexShrink: 0,
        }}
      >
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.7s cubic-bezier(0.16,1,0.3,1)',
          }}
          className="group-hover:scale-105"
        />

        {/* Gradient overlay on hover */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(139,46,78,0.42) 0%, transparent 55%)',
            opacity: 0,
            transition: 'opacity 0.4s ease',
          }}
          className="group-hover:opacity-100"
        />

        <BadgeChip badge={product.badge} />

        {/* Quick Add — slides up on hover */}
        <button
          onClick={handleAdd}
          style={{
            position: 'absolute',
            bottom: '1rem',
            left: '1rem',
            right: '1rem',
            padding: '0.65rem 1rem',
            background: added ? 'rgba(46,102,68,0.92)' : 'rgba(255,255,255,0.94)',
            color: added ? '#fff' : 'var(--burgundy)',
            border: 'none',
            borderRadius: 'var(--r-pill)',
            fontFamily: '"Jost", sans-serif',
            fontSize: '0.6rem',
            fontWeight: 600,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            backdropFilter: 'blur(10px)',
            transition: 'all 0.35s cubic-bezier(0.16,1,0.3,1)',
            transform: 'translateY(0.75rem)',
            opacity: 0,
          }}
          className="group-hover:opacity-100 group-hover:translate-y-0"
        >
          {adding ? '···' : added ? '✓  ADDED TO BAG' : 'QUICK ADD'}
        </button>
      </div>

      {/* ── Info panel ──────────────────────────────────────── */}
      <div
        style={{
          padding: '1rem 1.25rem 1.25rem',
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
        }}
      >
        {/* Brand label */}
        <p className="label" style={{ marginBottom: '0.35rem' }}>
          {product.brand}
        </p>

        {/* Product name — max 2 lines */}
        <h3
          className="font-display"
          style={{
            fontSize: '1.05rem',
            fontWeight: 400,
            color: 'var(--ink)',
            lineHeight: 1.25,
            marginBottom: '0.75rem',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {product.name}
        </h3>

        {/* Stars */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            marginBottom: '0.85rem',
            flex: 1,
            alignContent: 'flex-start',
          }}
        >
          <div style={{ display: 'flex', gap: '2px' }}>
            {[1, 2, 3, 4, 5].map((i) => (
              <svg
                key={i}
                width="11" height="11"
                viewBox="0 0 20 20"
                style={{ fill: i <= Math.round(product.rating) ? 'var(--gold)' : 'rgba(166,124,82,0.22)' }}
              >
                <path d={STAR_PATH} />
              </svg>
            ))}
          </div>
          <span
            style={{
              fontFamily: '"Jost", sans-serif',
              fontSize: '0.68rem',
              color: 'var(--ink-dim)',
            }}
          >
            ({product.reviewCount})
          </span>
        </div>

        {/* Price row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            paddingTop: '0.75rem',
            borderTop: '1px solid var(--border)',
          }}
        >
          <span
            className="price"
            style={{ fontSize: '1.5rem', color: 'var(--ink)', fontWeight: 400 }}
          >
            £{product.price.toFixed(2)}
          </span>
          <span
            style={{
              fontFamily: '"Jost", sans-serif',
              fontSize: '0.58rem',
              fontWeight: 600,
              letterSpacing: '0.2em',
              color: 'var(--burgundy)',
              textTransform: 'uppercase',
            }}
          >
            VIEW →
          </span>
        </div>
      </div>
    </Link>
  )
}
