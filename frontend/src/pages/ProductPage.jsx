import { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const STAR_PATH = 'M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'
const TABS = ['Description', 'Details', 'Delivery']

export default function ProductPage() {
  const { id }        = useParams()
  const navigate      = useNavigate()
  const { addToCart } = useCart()
  const [product, setProduct] = useState(null)
  const [qty,     setQty]     = useState(1)
  const [adding,  setAdding]  = useState(false)
  const [added,   setAdded]   = useState(false)
  const [tab,     setTab]     = useState('Description')

  useEffect(() => {
    window.scrollTo(0, 0)
    fetch(`/api/products/${id}`).then(r => r.json()).then(setProduct)
  }, [id])

  const handleAdd = async () => {
    setAdding(true)
    for (let i = 0; i < qty; i++) await addToCart(product.id)
    setAdding(false)
    setAdded(true)
    setTimeout(() => setAdded(false), 2500)
  }

  if (!product) return (
    <div style={{ height: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{
        width: 28, height: 28,
        border: '2px solid var(--burgundy)',
        borderTopColor: 'transparent',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
      }} />
    </div>
  )

  const badgeCls = product.badge === 'Bestseller' ? 'badge-bestseller' : product.badge === 'New' ? 'badge-new' : 'badge-vegan'

  return (
    <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '3rem 4rem 6rem' }}>

      {/* Breadcrumb */}
      <nav style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '3rem' }}>
        {[
          { label: 'Home', to: '/' },
          { label: product.category, to: `/?category=${product.category}` },
          { label: product.name, to: null },
        ].map((crumb, i) => (
          <span key={crumb.label} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {i > 0 && <span style={{ color: 'var(--border-hi)', fontSize: '0.75rem' }}>›</span>}
            {crumb.to ? (
              <Link to={crumb.to}
                style={{
                  fontFamily: '"Jost", sans-serif',
                  fontSize: '0.6rem',
                  fontWeight: 500,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: 'var(--ink-dim)',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--burgundy)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--ink-dim)'}>
                {crumb.label}
              </Link>
            ) : (
              <span style={{
                fontFamily: '"Jost", sans-serif',
                fontSize: '0.6rem',
                fontWeight: 500,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'var(--ink-muted)',
              }}>
                {crumb.label}
              </span>
            )}
          </span>
        ))}
      </nav>

      {/* Main grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'start' }}>

        {/* Left — image */}
        <div style={{ position: 'relative', animation: 'fadeIn 0.5s ease' }}>
          <div style={{
            aspectRatio: '4/5',
            borderRadius: 'var(--r-xl)',
            overflow: 'hidden',
            background: 'var(--cream-surface)',
            boxShadow: 'var(--shadow-lg)',
          }}>
            <img src={product.image} alt={product.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          {product.badge && (
            <span className={badgeCls}
              style={{ position: 'absolute', top: '1.25rem', left: '1.25rem' }}>
              {product.badge}
            </span>
          )}
        </div>

        {/* Right — details */}
        <div style={{ animation: 'fadeUp 0.65s cubic-bezier(0.16,1,0.3,1) 0.1s both' }}>

          {/* Brand */}
          <p className="label" style={{ marginBottom: '0.75rem' }}>{product.brand}</p>

          {/* Name */}
          <h1 className="font-display" style={{
            fontSize: 'clamp(1.8rem, 3vw, 2.75rem)',
            fontWeight: 400,
            color: 'var(--ink)',
            lineHeight: 1.12,
            marginBottom: '1.25rem',
          }}>
            {product.name}
          </h1>

          {/* Rating */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.75rem', paddingBottom: '1.75rem', borderBottom: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', gap: '3px' }}>
              {[1,2,3,4,5].map(i => (
                <svg key={i} width="13" height="13" viewBox="0 0 20 20"
                  style={{ fill: i <= Math.round(product.rating) ? 'var(--gold)' : 'rgba(166,124,82,0.2)' }}>
                  <path d={STAR_PATH} />
                </svg>
              ))}
            </div>
            <span style={{ fontFamily: '"Jost"', fontSize: '0.72rem', color: 'var(--gold-dim)', fontWeight: 500 }}>{product.rating}</span>
            <span style={{ fontFamily: '"Jost"', fontSize: '0.72rem', color: 'var(--ink-dim)' }}>({product.reviewCount} reviews)</span>
          </div>

          {/* Price */}
          <p className="price" style={{
            fontSize: '3rem',
            color: 'var(--ink)',
            fontWeight: 400,
            lineHeight: 1,
            marginBottom: '2rem',
          }}>
            £{product.price.toFixed(2)}
          </p>

          {/* Tags */}
          {product.tags?.length > 0 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}>
              {product.tags.map(tag => (
                <span key={tag} style={{
                  fontFamily: '"Jost"',
                  fontSize: '0.6rem',
                  fontWeight: 500,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  padding: '0.3rem 0.8rem',
                  borderRadius: 'var(--r-pill)',
                  background: 'rgba(139,46,78,0.06)',
                  border: '1px solid rgba(139,46,78,0.16)',
                  color: 'var(--burgundy-dim)',
                }}>
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Qty */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <p style={{ fontFamily: '"Jost"', fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.2em', color: 'var(--ink-dim)', textTransform: 'uppercase', minWidth: 28 }}>QTY</p>
            <div style={{
              display: 'flex', alignItems: 'center',
              border: '1px solid var(--border-hi)',
              borderRadius: 'var(--r-pill)',
              overflow: 'hidden',
              background: 'var(--cream-card)',
            }}>
              <button onClick={() => setQty(q => Math.max(1, q - 1))}
                style={{ background: 'none', border: 'none', padding: '0.5rem 1rem', fontFamily: '"Jost"', fontSize: '1rem', color: 'var(--ink-muted)' }}>−</button>
              <span style={{ fontFamily: '"DM Mono", monospace', fontSize: '0.85rem', color: 'var(--ink)', padding: '0 0.5rem', minWidth: 28, textAlign: 'center' }}>{qty}</span>
              <button onClick={() => setQty(q => q + 1)}
                style={{ background: 'none', border: 'none', padding: '0.5rem 1rem', fontFamily: '"Jost"', fontSize: '1rem', color: 'var(--ink-muted)' }}>+</button>
            </div>
          </div>

          {/* Add to bag */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
            <button onClick={handleAdd} disabled={adding || !product.inStock}
              className="btn-primary"
              style={{
                justifyContent: 'center',
                background: added ? '#2e6644' : undefined,
                borderColor: added ? '#2e6644' : undefined,
                opacity: !product.inStock ? 0.5 : 1,
              }}>
              {adding ? (
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <span style={{ width: 12, height: 12, border: '2px solid rgba(255,255,255,0.4)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.7s linear infinite', display: 'inline-block' }} />
                  ADDING…
                </span>
              ) : added ? '✓  ADDED TO BAG' : product.inStock ? 'ADD TO BAG' : 'OUT OF STOCK'}
            </button>
            {added && (
              <button onClick={() => navigate('/cart')} className="btn-outline" style={{ justifyContent: 'center' }}>
                VIEW BAG →
              </button>
            )}
          </div>

          {/* Tabs */}
          <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1.75rem' }}>
            {/* Tab switcher */}
            <div style={{
              display: 'inline-flex',
              background: 'var(--cream-surface)',
              borderRadius: 'var(--r-pill)',
              padding: '3px',
              marginBottom: '1.25rem',
              border: '1px solid var(--border)',
            }}>
              {TABS.map(t => (
                <button key={t} onClick={() => setTab(t)}
                  style={{
                    fontFamily: '"Jost"',
                    fontSize: '0.58rem',
                    fontWeight: 600,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    padding: '0.45rem 1.1rem',
                    borderRadius: 'var(--r-pill)',
                    border: 'none',
                    background: tab === t ? 'var(--burgundy)' : 'transparent',
                    color: tab === t ? '#fff' : 'var(--ink-muted)',
                    transition: 'all 0.25s ease',
                  }}>
                  {t}
                </button>
              ))}
            </div>

            <div style={{ fontFamily: '"Jost"', fontSize: '0.875rem', fontWeight: 400, color: 'var(--ink-muted)', lineHeight: 1.7 }}>
              {tab === 'Description' && <p>{product.description}</p>}
              {tab === 'Details' && (
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {[
                    ['Category', product.category],
                    ['Brand',    product.brand],
                    ['Rating',   `${product.rating} / 5`],
                    ['Reviews',  product.reviewCount],
                  ].map(([k, v]) => (
                    <li key={k} style={{ display: 'flex', gap: '0.5rem' }}>
                      <span style={{ color: 'var(--ink-dim)', minWidth: 80 }}>{k}:</span>
                      <span style={{ color: 'var(--ink)' }}>{v}</span>
                    </li>
                  ))}
                </ul>
              )}
              {tab === 'Delivery' && (
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  <li>Standard delivery (3–5 days) — <strong style={{ color: 'var(--ink)', fontWeight: 500 }}>Free over £40</strong>, otherwise £4.99</li>
                  <li>Express delivery (1–2 days) — £6.99</li>
                  <li>International delivery — from £12.99</li>
                  <li>Free returns within 30 days, no questions asked</li>
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
