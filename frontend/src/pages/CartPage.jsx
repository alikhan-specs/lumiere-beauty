import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function CartPage() {
  const { cart, updateQty, removeItem } = useCart()
  const delivery   = cart.total >= 40 ? 0 : 4.99
  const orderTotal = +(cart.total + delivery).toFixed(2)

  if (cart.items.length === 0) return (
    <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 1.5rem' }}>
      <p className="font-italic" style={{ fontSize: '5rem', fontStyle: 'italic', color: 'var(--burgundy)', opacity: 0.2, lineHeight: 1, marginBottom: '1.5rem' }}>∅</p>
      <h1 className="font-display" style={{ fontSize: '2rem', fontWeight: 400, color: 'var(--ink)', marginBottom: '0.75rem' }}>Your bag is empty</h1>
      <p style={{ fontFamily: '"Jost"', fontSize: '0.9rem', color: 'var(--ink-muted)', marginBottom: '2.5rem', textAlign: 'center', maxWidth: '24rem' }}>
        Discover our curated edit of luxury beauty products.
      </p>
      <Link to="/" className="btn-primary">EXPLORE COLLECTION</Link>
    </div>
  )

  const SummaryCard = () => (
    <div style={{
      background: 'var(--cream-card)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--r-lg)',
      boxShadow: 'var(--shadow-md)',
      padding: '1.75rem',
      position: 'sticky',
      top: '5.5rem',
    }}>
      <h2 className="font-display" style={{ fontSize: '1.4rem', fontWeight: 400, color: 'var(--ink)', marginBottom: '1.5rem' }}>Order Summary</h2>

      {/* Item list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--border)' }}>
        {cart.items.map(({ product, quantity }) => (
          <div key={product.id} style={{ display: 'flex', justifyContent: 'space-between', gap: '0.5rem' }}>
            <span style={{ fontFamily: '"Jost"', fontSize: '0.8rem', color: 'var(--ink-muted)', flex: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {product.name} ×{quantity}
            </span>
            <span style={{ fontFamily: '"Cormorant Garamond"', fontSize: '1rem', color: 'var(--ink)', whiteSpace: 'nowrap' }}>
              £{(product.price * quantity).toFixed(2)}
            </span>
          </div>
        ))}
      </div>

      {/* Totals */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
          <span style={{ fontFamily: '"Jost"', color: 'var(--ink-muted)' }}>Subtotal</span>
          <span style={{ fontFamily: '"Cormorant Garamond"', fontSize: '1rem', color: 'var(--ink)' }}>£{cart.total.toFixed(2)}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
          <span style={{ fontFamily: '"Jost"', color: 'var(--ink-muted)' }}>Delivery</span>
          <span style={{ fontFamily: '"Cormorant Garamond"', fontSize: '1rem', color: delivery === 0 ? '#2e6644' : 'var(--ink)', fontWeight: delivery === 0 ? 400 : 400 }}>
            {delivery === 0 ? 'Free' : `£${delivery.toFixed(2)}`}
          </span>
        </div>
      </div>

      {/* Free delivery nudge */}
      {cart.total < 40 && (
        <div style={{
          padding: '0.75rem 1rem',
          borderRadius: 'var(--r)',
          background: 'rgba(139,46,78,0.05)',
          border: '1px solid rgba(139,46,78,0.15)',
          marginBottom: '1.25rem',
        }}>
          <p style={{ fontFamily: '"Jost"', fontSize: '0.72rem', color: 'var(--burgundy)', lineHeight: 1.5 }}>
            Add <strong>£{(40 - cart.total).toFixed(2)}</strong> more to qualify for free delivery
          </p>
        </div>
      )}

      {/* Total */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', paddingTop: '1.25rem', borderTop: '1px solid var(--border)', marginBottom: '1.5rem' }}>
        <span className="font-display" style={{ fontSize: '1.25rem', color: 'var(--ink)', fontWeight: 400 }}>Total</span>
        <span className="price" style={{ fontSize: '1.75rem', color: 'var(--ink)' }}>£{orderTotal.toFixed(2)}</span>
      </div>

      <Link to="/checkout" className="btn-primary" style={{ width: '100%', justifyContent: 'center', display: 'flex' }}>
        PROCEED TO CHECKOUT
      </Link>
    </div>
  )

  return (
    <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '3rem 4rem 6rem' }}>
      {/* Heading */}
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '3rem' }}>
        <h1 className="font-display" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 400, color: 'var(--ink)' }}>Your Bag</h1>
        <span style={{ fontFamily: '"Jost"', fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.22em', color: 'var(--ink-dim)', textTransform: 'uppercase' }}>
          {cart.count} ITEM{cart.count !== 1 ? 'S' : ''}
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr minmax(300px, 360px)', gap: '4rem', alignItems: 'start' }}>
        {/* Items */}
        <div>
          <div style={{ borderTop: '1px solid var(--border)' }}>
            {cart.items.map(({ product, quantity }) => (
              <div key={product.id} style={{ display: 'flex', gap: '1.5rem', padding: '1.75rem 0', borderBottom: '1px solid var(--border)' }}>
                {/* Thumbnail */}
                <Link to={`/products/${product.id}`}>
                  <div style={{
                    width: 88, height: 110,
                    borderRadius: 'var(--r-lg)',
                    overflow: 'hidden',
                    background: 'var(--cream-surface)',
                    flexShrink: 0,
                    border: '1px solid var(--border)',
                    boxShadow: 'var(--shadow-sm)',
                  }}>
                    <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                </Link>

                {/* Info */}
                <div style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <p className="label" style={{ marginBottom: '0.3rem' }}>{product.brand}</p>
                    <Link to={`/products/${product.id}`} style={{ textDecoration: 'none' }}>
                      <h3 className="font-display" style={{ fontSize: '1.1rem', fontWeight: 400, color: 'var(--ink)', lineHeight: 1.2, marginBottom: '0.4rem' }}>
                        {product.name}
                      </h3>
                    </Link>
                    <p className="price" style={{ fontSize: '1.3rem', color: 'var(--gold-dim)' }}>£{product.price.toFixed(2)}</p>
                  </div>

                  {/* Controls */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    {/* Qty */}
                    <div style={{
                      display: 'flex', alignItems: 'center',
                      border: '1px solid var(--border-hi)',
                      borderRadius: 'var(--r-pill)',
                      overflow: 'hidden',
                      background: 'var(--cream-card)',
                    }}>
                      <button onClick={() => updateQty(product.id, quantity - 1)}
                        style={{ background: 'none', border: 'none', padding: '0.4rem 0.85rem', fontFamily: '"Jost"', fontSize: '1rem', color: 'var(--ink-muted)' }}>−</button>
                      <span style={{ fontFamily: '"DM Mono", monospace', fontSize: '0.8rem', color: 'var(--ink)', padding: '0 0.25rem', minWidth: 24, textAlign: 'center' }}>{quantity}</span>
                      <button onClick={() => updateQty(product.id, quantity + 1)}
                        style={{ background: 'none', border: 'none', padding: '0.4rem 0.85rem', fontFamily: '"Jost"', fontSize: '1rem', color: 'var(--ink-muted)' }}>+</button>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                      <span className="price" style={{ fontSize: '1.4rem', color: 'var(--ink)' }}>£{(product.price * quantity).toFixed(2)}</span>
                      <button onClick={() => removeItem(product.id)}
                        style={{
                          background: 'none', border: 'none',
                          fontFamily: '"Jost"', fontSize: '0.58rem', fontWeight: 600,
                          letterSpacing: '0.18em', textTransform: 'uppercase',
                          color: 'var(--ink-dim)', transition: 'color 0.2s',
                        }}
                        onMouseEnter={e => e.currentTarget.style.color = 'var(--burgundy)'}
                        onMouseLeave={e => e.currentTarget.style.color = 'var(--ink-dim)'}>
                        REMOVE
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '2rem' }}>
            <Link to="/" className="btn-ghost" style={{ fontSize: '0.62rem', letterSpacing: '0.18em' }}>← CONTINUE SHOPPING</Link>
          </div>
        </div>

        {/* Summary */}
        <SummaryCard />
      </div>
    </div>
  )
}
