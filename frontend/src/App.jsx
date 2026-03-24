import { useEffect, useRef } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import ProductPage from './pages/ProductPage'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import OrderConfirmation from './pages/OrderConfirmation'

/* ── Custom Cursor ─────────────────────────────────────── */
function CursorEffect() {
  const dotRef  = useRef(null)
  const ringRef = useRef(null)
  const ring    = useRef({ x: 0, y: 0 })
  const mouse   = useRef({ x: 0, y: 0 })
  const raf     = useRef(null)

  useEffect(() => {
    const dot  = dotRef.current
    const rng  = ringRef.current
    if (!dot || !rng) return

    const onMove = (e) => {
      mouse.current.x = e.clientX
      mouse.current.y = e.clientY
      dot.style.left = e.clientX + 'px'
      dot.style.top  = e.clientY + 'px'
    }

    const lerp = (a, b, t) => a + (b - a) * t

    const animate = () => {
      ring.current.x = lerp(ring.current.x, mouse.current.x, 0.15)
      ring.current.y = lerp(ring.current.y, mouse.current.y, 0.15)
      rng.style.left = ring.current.x + 'px'
      rng.style.top  = ring.current.y + 'px'
      raf.current = requestAnimationFrame(animate)
    }

    const onOver = (e) => {
      const el = e.target.closest('a, button, [role="button"], label, select')
      if (el) rng.classList.add('hovered')
      else    rng.classList.remove('hovered')
    }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onOver)
    raf.current = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      cancelAnimationFrame(raf.current)
    }
  }, [])

  return (
    <>
      <div ref={dotRef}  className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  )
}

/* ── Footer ────────────────────────────────────────────── */
const FOOTER_COLS = [
  {
    heading: 'Lumière',
    links: ['Our Story', 'Sustainability', 'Press', 'Careers'],
  },
  {
    heading: 'Shop',
    links: ['Skincare', 'Makeup', 'Haircare', 'Fragrance'],
  },
  {
    heading: 'Help',
    links: ['Delivery & Returns', 'Track Order', 'Contact Us', 'FAQ'],
  },
  {
    heading: 'Connect',
    links: ['Instagram', 'Pinterest', 'TikTok', 'Newsletter'],
  },
]

function Footer() {
  return (
    <footer
      style={{
        marginTop: '6rem',
        paddingTop: '4rem',
        paddingBottom: '2.5rem',
        paddingLeft: '1.5rem',
        paddingRight: '1.5rem',
        borderTop: '1px solid var(--border)',
        background: 'var(--cream-card)',
      }}
    >
      <div style={{ maxWidth: '80rem', margin: '0 auto' }}>
        {/* 4-column link grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: '2.5rem',
            marginBottom: '3.5rem',
          }}
        >
          {FOOTER_COLS.map((col) => (
            <div key={col.heading}>
              <p
                style={{
                  fontFamily: '"Jost", sans-serif',
                  fontSize: '0.6rem',
                  fontWeight: 600,
                  letterSpacing: '0.28em',
                  textTransform: 'uppercase',
                  color: 'var(--burgundy)',
                  marginBottom: '1.1rem',
                }}
              >
                {col.heading}
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                {col.links.map((l) => (
                  <li key={l}>
                    <span
                      style={{
                        fontFamily: '"Jost", sans-serif',
                        fontSize: '0.8rem',
                        fontWeight: 300,
                        color: 'var(--ink-dim)',
                        transition: 'color 0.2s',
                      }}
                      onMouseEnter={(e) => (e.target.style.color = 'var(--ink-muted)')}
                      onMouseLeave={(e) => (e.target.style.color = 'var(--ink-dim)')}
                    >
                      {l}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Decorative rule */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem',
            marginBottom: '1.75rem',
          }}
        >
          <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
          <span
            style={{
              fontFamily: '"Cormorant Garamond", Georgia, serif',
              fontStyle: 'italic',
              fontSize: '1rem',
              color: 'var(--gold)',
              letterSpacing: '0.04em',
              whiteSpace: 'nowrap',
            }}
          >
            — Est. 2016
          </span>
          <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
        </div>

        {/* Copyright row */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
          }}
        >
          <p
            style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontStyle: 'italic',
              fontSize: '1.6rem',
              color: 'var(--burgundy)',
              letterSpacing: '0.02em',
              lineHeight: 1,
            }}
          >
            Lumière
          </p>
          <p
            style={{
              fontFamily: '"Jost", sans-serif',
              fontSize: '0.6rem',
              fontWeight: 400,
              letterSpacing: '0.2em',
              color: 'var(--ink-dim)',
              textTransform: 'uppercase',
            }}
          >
            © 2026 Lumière Beauty Boutique · All Rights Reserved
          </p>
          <p
            style={{
              fontFamily: '"Jost", sans-serif',
              fontSize: '0.6rem',
              fontWeight: 400,
              color: 'var(--ink-dim)',
              letterSpacing: '0.12em',
            }}
          >
            Cruelty-Free · Vegan Options · Clean Beauty
          </p>
        </div>
      </div>
    </footer>
  )
}

/* ── App ───────────────────────────────────────────────── */
export default function App() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--cream)',
      }}
    >
      {/* Burgundy 3px accent bar — fixed top */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          background: 'var(--burgundy)',
          zIndex: 9997,
        }}
      />

      <CursorEffect />

      <Header />

      <main style={{ flex: 1, paddingTop: 3 }}>
        <Routes>
          <Route path="/"             element={<Home />} />
          <Route path="/products/:id" element={<ProductPage />} />
          <Route path="/cart"         element={<CartPage />} />
          <Route path="/checkout"     element={<CheckoutPage />} />
          <Route path="/order/:id"    element={<OrderConfirmation />} />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}
