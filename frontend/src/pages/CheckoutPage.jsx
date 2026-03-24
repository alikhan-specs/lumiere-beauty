import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const CARD_STYLE = {
  background: 'var(--cream-card)',
  border: '1px solid var(--border)',
  borderRadius: 'var(--r-lg)',
  boxShadow: 'var(--shadow-sm)',
  padding: '1.75rem 2rem',
}

export default function CheckoutPage() {
  const { cart, checkout } = useCart()
  const navigate = useNavigate()
  const [step, setStep]           = useState(1)
  const [submitting, setSubmitting] = useState(false)
  const [errors, setErrors]       = useState({})
  const [form, setForm]           = useState({
    firstName: '', lastName: '', email: '', phone: '',
    address: '', city: '', postcode: '', country: 'GB',
    cardNumber: '', cardExpiry: '', cardCvc: '',
  })

  const set = k => e => {
    setForm(f => ({ ...f, [k]: e.target.value }))
    setErrors(er => ({ ...er, [k]: '' }))
  }

  const validateStep1 = () => {
    const e = {}
    if (!form.firstName.trim()) e.firstName = 'Required'
    if (!form.lastName.trim())  e.lastName  = 'Required'
    if (!form.email.includes('@')) e.email  = 'Valid email required'
    if (!form.address.trim())   e.address   = 'Required'
    if (!form.city.trim())      e.city      = 'Required'
    if (!form.postcode.trim())  e.postcode  = 'Required'
    return e
  }

  const validateStep2 = () => {
    const e = {}
    if (form.cardNumber.replace(/\s/g, '').length < 16) e.cardNumber = '16-digit number required'
    if (!form.cardExpiry.includes('/'))                  e.cardExpiry = 'Format: MM/YY'
    if (form.cardCvc.length < 3)                         e.cardCvc   = 'Required'
    return e
  }

  const nextStep = () => {
    const errs = validateStep1()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setStep(2); window.scrollTo(0, 0)
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const errs = validateStep2()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setSubmitting(true)
    try {
      const order = await checkout({
        name:    `${form.firstName} ${form.lastName}`,
        email:   form.email,
        address: `${form.address}, ${form.city} ${form.postcode}`,
      })
      navigate(`/order/${order.id}`)
    } catch { setSubmitting(false) }
  }

  const fmtCard   = v => v.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim()
  const fmtExpiry = v => v.replace(/\D/g, '').slice(0, 4).replace(/(\d{2})(\d)/, '$1/$2')

  const delivery   = cart.total >= 40 ? 0 : 4.99
  const orderTotal = +(cart.total + delivery).toFixed(2)

  if (cart.items.length === 0) return (
    <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1.5rem' }}>
      <p className="font-display" style={{ fontSize: '1.5rem', color: 'var(--ink-muted)', fontWeight: 400 }}>Your bag is empty</p>
      <Link to="/" className="btn-primary">SHOP NOW</Link>
    </div>
  )

  return (
    <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '3rem 4rem 6rem' }}>
      <Link to="/cart" className="btn-ghost" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginBottom: '2.5rem', fontSize: '0.62rem', letterSpacing: '0.18em' }}>
        ← BACK TO BAG
      </Link>

      {/* Step indicator */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '3rem' }}>
        {[{ n: 1, label: 'Contact & Delivery' }, { n: 2, label: 'Payment' }].map((s, i) => (
          <span key={s.n} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{
              width: 28, height: 28,
              borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: '"Jost"', fontSize: '0.65rem', fontWeight: 600,
              background: step >= s.n ? 'var(--burgundy)' : 'transparent',
              border: `1px solid ${step >= s.n ? 'var(--burgundy)' : 'var(--border-hi)'}`,
              color: step >= s.n ? '#fff' : 'var(--ink-dim)',
              boxShadow: step >= s.n ? '0 4px 14px rgba(139,46,78,0.3)' : 'none',
              transition: 'all 0.3s ease',
            }}>{s.n}</span>
            <span style={{
              fontFamily: '"Jost"', fontSize: '0.6rem', fontWeight: 600,
              letterSpacing: '0.2em', textTransform: 'uppercase',
              color: step === s.n ? 'var(--ink)' : 'var(--ink-dim)',
              display: window.innerWidth < 640 ? 'none' : 'inline',
            }}>{s.label}</span>
            {i < 1 && <span style={{ color: 'var(--border-hi)', margin: '0 0.25rem', fontSize: '0.85rem' }}>›</span>}
          </span>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr minmax(280px, 340px)', gap: '4rem', alignItems: 'start' }}>
        {/* Form area */}
        <div>
          {step === 1 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <FormSection title="Contact" style={CARD_STYLE}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <Field label="First Name" value={form.firstName} onChange={set('firstName')} error={errors.firstName} />
                  <Field label="Last Name"  value={form.lastName}  onChange={set('lastName')}  error={errors.lastName} />
                  <div style={{ gridColumn: '1/-1' }}>
                    <Field label="Email Address" type="email" value={form.email} onChange={set('email')} error={errors.email} />
                  </div>
                  <div style={{ gridColumn: '1/-1' }}>
                    <Field label="Phone (optional)" value={form.phone} onChange={set('phone')} />
                  </div>
                </div>
              </FormSection>

              <FormSection title="Delivery Address" style={CARD_STYLE}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div style={{ gridColumn: '1/-1' }}>
                    <Field label="Street Address" value={form.address} onChange={set('address')} error={errors.address} />
                  </div>
                  <Field label="City"     value={form.city}    onChange={set('city')}    error={errors.city} />
                  <Field label="Postcode" value={form.postcode} onChange={set('postcode')} error={errors.postcode} />
                  <div style={{ gridColumn: '1/-1' }}>
                    <label style={{ display: 'block', fontFamily: '"Jost"', fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--ink-dim)', marginBottom: '0.5rem' }}>COUNTRY</label>
                    <select value={form.country} onChange={set('country')} className="input-dark">
                      <option value="GB">United Kingdom</option>
                      <option value="US">United States</option>
                      <option value="AE">UAE</option>
                      <option value="AU">Australia</option>
                      <option value="EU">Europe</option>
                    </select>
                  </div>
                </div>
              </FormSection>

              <button type="button" onClick={nextStep} className="btn-primary" style={{ justifyContent: 'center' }}>
                CONTINUE TO PAYMENT
              </button>
            </div>
          )}

          {step === 2 && (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {/* Delivery recap */}
              <div style={{ ...CARD_STYLE, padding: '1rem 1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <p style={{ fontFamily: '"Jost"', fontSize: '0.85rem', color: 'var(--ink-muted)' }}>
                      {form.firstName} {form.lastName} · {form.email}
                    </p>
                    <p style={{ fontFamily: '"Jost"', fontSize: '0.75rem', color: 'var(--ink-dim)', marginTop: '0.2rem' }}>
                      {form.address}, {form.city} {form.postcode}
                    </p>
                  </div>
                  <button type="button" onClick={() => setStep(1)}
                    style={{ background: 'none', border: 'none', fontFamily: '"Jost"', fontSize: '0.58rem', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--burgundy)' }}>
                    EDIT
                  </button>
                </div>
              </div>

              <FormSection title="Payment" style={CARD_STYLE}>
                {/* Security note */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
                  <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" style={{ color: 'var(--ink-dim)', flexShrink: 0 }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                  </svg>
                  <span style={{ fontFamily: '"Jost"', fontSize: '0.58rem', fontWeight: 600, letterSpacing: '0.2em', color: 'var(--ink-dim)', textTransform: 'uppercase' }}>
                    SECURE · SSL ENCRYPTED
                  </span>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div style={{ gridColumn: '1/-1' }}>
                    <Field label="Card Number" value={form.cardNumber}
                      onChange={e => setForm(f => ({ ...f, cardNumber: fmtCard(e.target.value) }))}
                      error={errors.cardNumber} placeholder="1234 5678 9012 3456" maxLength={19} />
                  </div>
                  <Field label="Expiry Date" value={form.cardExpiry}
                    onChange={e => setForm(f => ({ ...f, cardExpiry: fmtExpiry(e.target.value) }))}
                    error={errors.cardExpiry} placeholder="MM/YY" maxLength={5} />
                  <Field label="CVC" value={form.cardCvc}
                    onChange={e => setForm(f => ({ ...f, cardCvc: e.target.value.slice(0, 4) }))}
                    error={errors.cardCvc} placeholder="123" maxLength={4} />
                </div>
              </FormSection>

              <button type="submit" disabled={submitting} className="btn-primary"
                style={{ justifyContent: 'center', opacity: submitting ? 0.65 : 1 }}>
                {submitting ? (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <span style={{ width: 12, height: 12, border: '2px solid rgba(255,255,255,0.35)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.7s linear infinite', display: 'inline-block' }} />
                    PROCESSING…
                  </span>
                ) : `PLACE ORDER · £${orderTotal.toFixed(2)}`}
              </button>
              <p style={{ fontFamily: '"Jost"', fontSize: '0.68rem', color: 'var(--ink-dim)', textAlign: 'center' }}>
                Demo only — no real payment taken
              </p>
            </form>
          )}
        </div>

        {/* Order sidebar */}
        <div style={{
          ...CARD_STYLE,
          position: 'sticky',
          top: '5.5rem',
        }}>
          <h2 className="font-display" style={{ fontSize: '1.3rem', fontWeight: 400, color: 'var(--ink)', marginBottom: '1.25rem' }}>Summary</h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', maxHeight: '14rem', overflowY: 'auto', marginBottom: '1.25rem', paddingRight: '0.25rem' }}>
            {cart.items.map(({ product, quantity }) => (
              <div key={product.id} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ width: 44, height: 52, borderRadius: 'var(--r)', overflow: 'hidden', background: 'var(--cream-surface)', border: '1px solid var(--border)', flexShrink: 0 }}>
                  <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontFamily: '"Jost"', fontSize: '0.75rem', color: 'var(--ink-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{product.name}</p>
                  <p style={{ fontFamily: '"Jost"', fontSize: '0.65rem', color: 'var(--ink-dim)' }}>×{quantity}</p>
                </div>
                <span className="price" style={{ fontSize: '1rem', color: 'var(--ink)', whiteSpace: 'nowrap' }}>£{(product.price * quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border)', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem' }}>
              <span style={{ fontFamily: '"Jost"', color: 'var(--ink-muted)' }}>Subtotal</span>
              <span style={{ fontFamily: '"Cormorant Garamond"', fontSize: '1rem', color: 'var(--ink)' }}>£{cart.total.toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem' }}>
              <span style={{ fontFamily: '"Jost"', color: 'var(--ink-muted)' }}>Delivery</span>
              <span style={{ fontFamily: '"Cormorant Garamond"', fontSize: '1rem', color: delivery === 0 ? '#2e6644' : 'var(--ink)' }}>{delivery === 0 ? 'Free' : `£${delivery.toFixed(2)}`}</span>
            </div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
            <span className="font-display" style={{ fontSize: '1.1rem', color: 'var(--ink)', fontWeight: 400 }}>Total</span>
            <span className="price" style={{ fontSize: '1.6rem', color: 'var(--ink)' }}>£{orderTotal.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function FormSection({ title, children, style }) {
  return (
    <div style={style}>
      <h3 className="font-display" style={{ fontSize: '1.25rem', fontWeight: 400, color: 'var(--ink)', marginBottom: '1.25rem' }}>{title}</h3>
      {children}
    </div>
  )
}

function Field({ label, error, ...props }) {
  return (
    <div>
      <label style={{ display: 'block', fontFamily: '"Jost"', fontSize: '0.6rem', fontWeight: 600, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--ink-dim)', marginBottom: '0.5rem' }}>
        {label}
      </label>
      <input {...props} className={`input-dark${error ? ' error' : ''}`} />
      {error && <p style={{ fontFamily: '"Jost"', fontSize: '0.7rem', color: '#c05050', marginTop: '0.3rem' }}>{error}</p>}
    </div>
  )
}
