import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useState } from 'react'

const NAV_LINKS = ['Skincare', 'Makeup', 'Haircare', 'Fragrance']

export default function Header() {
  const { cart }                      = useCart()
  const [search, setSearch]           = useState('')
  const [searchOpen, setSearchOpen]   = useState(false)
  const navigate                      = useNavigate()
  const location                      = useLocation()

  const handleSearch = (e) => {
    e.preventDefault()
    if (search.trim()) {
      navigate(`/?search=${encodeURIComponent(search.trim())}`)
      setSearchOpen(false)
      setSearch('')
    }
  }

  const isActive = (cat) => location.search.includes(cat)

  return (
    <header
      style={{
        position: 'sticky',
        top: 3, /* sits below the 3px burgundy bar */
        zIndex: 50,
        background: `rgba(250,247,242,0.94)`,
        backdropFilter: 'blur(20px) saturate(160%)',
        WebkitBackdropFilter: 'blur(20px) saturate(160%)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      {/* ── Main navigation row ─────────────────────────────── */}
      <div
        style={{
          maxWidth: '80rem',
          margin: '0 auto',
          padding: '0 2rem',
          height: '4.25rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          position: 'relative',
        }}
      >
        {/* Left — category nav */}
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '2.2rem',
          }}
          className="hidden md:flex"
        >
          {NAV_LINKS.map((cat) => (
            <Link
              key={cat}
              to={`/?category=${cat}`}
              style={{
                fontFamily: '"Jost", sans-serif',
                fontSize: '0.6rem',
                fontWeight: 500,
                letterSpacing: '0.24em',
                textTransform: 'uppercase',
                color: isActive(cat) ? 'var(--burgundy)' : 'var(--ink-muted)',
                textDecoration: 'none',
                transition: 'color 0.2s',
                paddingBottom: '2px',
                borderBottom: isActive(cat) ? '1px solid var(--burgundy)' : '1px solid transparent',
              }}
              onMouseEnter={(e) => {
                if (!isActive(cat)) e.currentTarget.style.color = 'var(--ink)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = isActive(cat) ? 'var(--burgundy)' : 'var(--ink-muted)'
              }}
            >
              {cat.toUpperCase()}
            </Link>
          ))}
        </nav>

        {/* Centre — wordmark, absolutely positioned */}
        <Link
          to="/"
          style={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            textAlign: 'center',
            textDecoration: 'none',
            lineHeight: 1,
          }}
        >
          <p
            style={{
              fontFamily: '"Playfair Display", Georgia, serif',
              fontStyle: 'italic',
              fontWeight: 500,
              fontSize: '2rem',
              color: 'var(--ink)',
              letterSpacing: '0.02em',
              margin: 0,
              lineHeight: 1,
            }}
          >
            Lumière
          </p>
          <p
            style={{
              fontFamily: '"Jost", sans-serif',
              fontWeight: 500,
              fontSize: '0.48rem',
              letterSpacing: '0.4em',
              color: 'var(--gold)',
              textTransform: 'uppercase',
              marginTop: '3px',
            }}
          >
            BEAUTÉ DE LUXE
          </p>
        </Link>

        {/* Right — search + bag */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          {/* Search icon button */}
          <button
            onClick={() => setSearchOpen((v) => !v)}
            aria-label="Search"
            style={{
              background: 'none',
              border: 'none',
              padding: '0.25rem',
              color: searchOpen ? 'var(--burgundy)' : 'var(--ink-muted)',
              transition: 'color 0.2s',
              display: 'flex',
              alignItems: 'center',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--ink)')}
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = searchOpen
                ? 'var(--burgundy)'
                : 'var(--ink-muted)')
            }
          >
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </button>

          {/* Bag link */}
          <Link
            to="/cart"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
              textDecoration: 'none',
              color: 'var(--ink-muted)',
              position: 'relative',
              fontFamily: '"Jost", sans-serif',
              fontSize: '0.6rem',
              fontWeight: 500,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--ink)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--ink-muted)')}
          >
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007z" />
            </svg>
            <span className="hidden sm:inline">BAG</span>
            {cart.count > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: '-8px',
                  right: '-6px',
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  background: 'var(--burgundy)',
                  color: '#fff',
                  fontSize: '0.5rem',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {cart.count}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* ── Search drawer ────────────────────────────────────── */}
      {searchOpen && (
        <div
          style={{
            background: 'rgba(250,247,242,0.98)',
            backdropFilter: 'blur(20px)',
            borderBottom: '1px solid var(--border)',
            animation: 'fadeIn 0.2s ease',
          }}
        >
          <form
            onSubmit={handleSearch}
            style={{
              maxWidth: '36rem',
              margin: '0 auto',
              padding: '1rem 1.5rem',
            }}
          >
            <div style={{ position: 'relative' }}>
              <svg
                width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"
                style={{
                  position: 'absolute',
                  left: '0.85rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: 'var(--ink-dim)',
                  pointerEvents: 'none',
                }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
              <input
                autoFocus
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products, brands, ingredients…"
                className="input-dark"
                style={{ paddingLeft: '2.5rem', paddingRight: '4rem' }}
              />
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                style={{
                  position: 'absolute',
                  right: '0.75rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  fontFamily: '"Jost", sans-serif',
                  fontSize: '0.55rem',
                  fontWeight: 600,
                  letterSpacing: '0.18em',
                  color: 'var(--ink-dim)',
                  padding: '0.25rem',
                }}
              >
                ESC
              </button>
            </div>
          </form>
        </div>
      )}
    </header>
  )
}
