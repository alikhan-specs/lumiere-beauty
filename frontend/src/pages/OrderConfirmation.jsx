import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

export default function OrderConfirmation() {
  const { id } = useParams()
  const [order, setOrder] = useState(null)

  useEffect(() => {
    window.scrollTo(0, 0)
    fetch(`/api/orders/${id}`).then(r => r.json()).then(setOrder)
  }, [id])

  if (!order) return (
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

  return (
    <div style={{ maxWidth: '36rem', margin: '0 auto', padding: '5rem 1.5rem 6rem' }}>

      {/* Success mark */}
      <div style={{ textAlign: 'center', marginBottom: '3.5rem', animation: 'fadeUp 0.65s cubic-bezier(0.16,1,0.3,1) both' }}>
        {/* Circle with check */}
        <div style={{
          width: 72, height: 72,
          borderRadius: '50%',
          margin: '0 auto 1.75rem',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'rgba(139,46,78,0.07)',
          border: '1.5px solid rgba(139,46,78,0.3)',
          boxShadow: '0 8px 32px rgba(139,46,78,0.12)',
        }}>
          <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
            <defs>
              <linearGradient id="chk" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="var(--burgundy)" />
                <stop offset="100%" stopColor="var(--gold)" />
              </linearGradient>
            </defs>
            <path stroke="url(#chk)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>

        {/* Order confirmed label */}
        <p className="section-label" style={{ marginBottom: '1rem' }}>Order Confirmed</p>

        {/* Thank you */}
        <h1 className="font-display" style={{
          fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
          fontWeight: 400,
          color: 'var(--ink)',
          lineHeight: 1.1,
          marginBottom: '1rem',
        }}>
          Thank you,<br />
          <em style={{ fontStyle: 'italic', color: 'var(--burgundy)' }}>
            {order.customer.name.split(' ')[0]}.
          </em>
        </h1>
        <p style={{ fontFamily: '"Jost"', fontSize: '0.9rem', color: 'var(--ink-muted)' }}>
          Your order has been received and is being prepared.
        </p>
      </div>

      {/* ── Order card ─────────────────────────────────────── */}
      <div style={{
        background: 'var(--cream-card)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--r-lg)',
        boxShadow: 'var(--shadow-md)',
        marginBottom: '2rem',
        animation: 'fadeUp 0.65s cubic-bezier(0.16,1,0.3,1) 0.12s both',
        overflow: 'hidden',
      }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--border)' }}>
          <div>
            <p className="label" style={{ marginBottom: '0.3rem' }}>Order Reference</p>
            <p style={{ fontFamily: '"DM Mono", monospace', fontSize: '0.9rem', color: 'var(--burgundy)', letterSpacing: '0.04em' }}>{order.id}</p>
          </div>
          <span className="badge-vegan" style={{ padding: '0.3rem 0.9rem' }}>Confirmed</span>
        </div>

        {/* Customer info */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--border)' }}>
          {[
            { title: 'Email', value: order.customer.email },
            { title: 'Delivery To', value: order.customer.address },
          ].map(({ title, value }) => (
            <div key={title}>
              <p style={{ fontFamily: '"Jost"', fontSize: '0.58rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--ink-dim)', marginBottom: '0.35rem' }}>{title}</p>
              <p style={{ fontFamily: '"Jost"', fontSize: '0.82rem', color: 'var(--ink-muted)' }}>{value}</p>
            </div>
          ))}
        </div>

        {/* Items */}
        <div style={{ padding: '1.25rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {order.items.map(({ product, quantity }) => (
            <div key={product.id} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{
                width: 52, height: 64,
                borderRadius: 'var(--r)',
                overflow: 'hidden',
                background: 'var(--cream-surface)',
                border: '1px solid var(--border)',
                flexShrink: 0,
                boxShadow: 'var(--shadow-sm)',
              }}>
                <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p className="label" style={{ marginBottom: '0.2rem' }}>{product.brand}</p>
                <p className="font-display" style={{ fontSize: '0.95rem', color: 'var(--ink)', fontWeight: 400, lineHeight: 1.2 }}>{product.name}</p>
                <p style={{ fontFamily: '"Jost"', fontSize: '0.7rem', color: 'var(--ink-dim)', marginTop: '0.2rem' }}>Qty: {quantity}</p>
              </div>
              <span className="price" style={{ fontSize: '1.25rem', color: 'var(--ink)', whiteSpace: 'nowrap' }}>
                £{(product.price * quantity).toFixed(2)}
              </span>
            </div>
          ))}
        </div>

        {/* Total */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '1.25rem 1.5rem', borderTop: '1px solid var(--border)', background: 'rgba(139,46,78,0.03)' }}>
          <span className="font-display" style={{ fontSize: '1.1rem', color: 'var(--ink-muted)', fontWeight: 400 }}>Total Paid</span>
          <span className="price" style={{ fontSize: '1.75rem', color: 'var(--burgundy)' }}>£{order.total.toFixed(2)}</span>
        </div>
      </div>

      {/* CTAs */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', animation: 'fadeUp 0.65s cubic-bezier(0.16,1,0.3,1) 0.22s both' }}>
        <Link to="/" className="btn-primary" style={{ justifyContent: 'center' }}>CONTINUE SHOPPING</Link>
        <Link to="/" className="btn-outline" style={{ justifyContent: 'center' }}>BACK TO HOME</Link>
      </div>

      {/* Email note */}
      <p style={{ fontFamily: '"Jost"', fontSize: '0.72rem', color: 'var(--ink-dim)', textAlign: 'center', marginTop: '2rem' }}>
        A confirmation has been sent to {order.customer.email}
      </p>
    </div>
  )
}
