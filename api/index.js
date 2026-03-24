import express from 'express'
import cors from 'cors'
import { v4 as uuid } from 'uuid'
import { products } from '../backend/src/data/products.js'

const app = express()

// ── Security: CORS — restrict to same origin + vercel previews ───────────────
app.use(cors({
  origin: (origin, cb) => {
    // Allow same-origin (no origin header), Vercel deployments, localhost dev
    if (!origin ||
        origin.endsWith('.vercel.app') ||
        /^https?:\/\/localhost(:\d+)?$/.test(origin)) {
      cb(null, true)
    } else {
      cb(new Error('Not allowed by CORS'))
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
}))

// ── Security: body size limit (prevents large-payload DoS) ───────────────────
app.use(express.json({ limit: '16kb' }))

// ── Security: remove X-Powered-By header ─────────────────────────────────────
app.disable('x-powered-by')

// ── Security: basic security headers ─────────────────────────────────────────
app.use((_req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.setHeader('X-Frame-Options', 'DENY')
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin')
  next()
})

// ── Input validation helpers ──────────────────────────────────────────────────
const isValidProductId = (id) => typeof id === 'string' && /^\d{1,3}$/.test(id)
const isValidQty = (q) => Number.isInteger(q) && q >= 1 && q <= 99
const isValidSessionId = (id) => typeof id === 'string' && /^[a-zA-Z0-9_-]{8,64}$/.test(id)
const isNonEmptyString = (s, max = 200) => typeof s === 'string' && s.trim().length > 0 && s.length <= max

// ── In-memory stores ────────────────────────────────────────────────────────
const carts  = {}   // { sessionId: [ { product, quantity } ] }
const orders = []

// ── Products ────────────────────────────────────────────────────────────────
app.get('/api/products', (req, res) => {
  const { category, search, sort } = req.query
  let list = [...products]

  if (category && category !== 'All')
    list = list.filter(p => p.category === category)

  if (search && typeof search === 'string') {
    const q = search.slice(0, 100).toLowerCase()
    list = list.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q)
    )
  }

  if (sort === 'price-asc')  list.sort((a,b) => a.price - b.price)
  if (sort === 'price-desc') list.sort((a,b) => b.price - a.price)
  if (sort === 'rating')     list.sort((a,b) => b.rating - a.rating)

  res.json({ products: list, total: list.length })
})

app.get('/api/products/:id', (req, res) => {
  if (!isValidProductId(req.params.id))
    return res.status(400).json({ error: 'Invalid product id' })
  const product = products.find(p => p.id === req.params.id)
  if (!product) return res.status(404).json({ error: 'Product not found' })
  res.json(product)
})

app.get('/api/categories', (_req, res) => {
  const cats = ['All', ...new Set(products.map(p => p.category))]
  res.json(cats)
})

// ── Cart ─────────────────────────────────────────────────────────────────────
app.get('/api/cart/:sessionId', (req, res) => {
  if (!isValidSessionId(req.params.sessionId))
    return res.status(400).json({ error: 'Invalid session' })
  const cart = carts[req.params.sessionId] || []
  const total = cart.reduce((sum, i) => sum + i.product.price * i.quantity, 0)
  res.json({ items: cart, total: +total.toFixed(2), count: cart.reduce((s,i) => s+i.quantity, 0) })
})

app.post('/api/cart/:sessionId', (req, res) => {
  if (!isValidSessionId(req.params.sessionId))
    return res.status(400).json({ error: 'Invalid session' })

  const { productId, quantity = 1 } = req.body
  if (!isValidProductId(productId))
    return res.status(400).json({ error: 'Invalid productId' })
  const qty = parseInt(quantity, 10)
  if (!isValidQty(qty))
    return res.status(400).json({ error: 'Quantity must be 1–99' })

  const product = products.find(p => p.id === productId)
  if (!product) return res.status(404).json({ error: 'Product not found' })

  if (!carts[req.params.sessionId]) carts[req.params.sessionId] = []
  const cart = carts[req.params.sessionId]
  const existing = cart.find(i => i.product.id === productId)

  if (existing) existing.quantity = Math.min(existing.quantity + qty, 99)
  else cart.push({ product, quantity: qty })

  const total = cart.reduce((sum, i) => sum + i.product.price * i.quantity, 0)
  res.json({ items: cart, total: +total.toFixed(2), count: cart.reduce((s,i) => s+i.quantity, 0) })
})

app.put('/api/cart/:sessionId/:productId', (req, res) => {
  if (!isValidSessionId(req.params.sessionId))
    return res.status(400).json({ error: 'Invalid session' })
  if (!isValidProductId(req.params.productId))
    return res.status(400).json({ error: 'Invalid productId' })

  const quantity = parseInt(req.body.quantity, 10)
  if (isNaN(quantity) || quantity < 0 || quantity > 99)
    return res.status(400).json({ error: 'Quantity must be 0–99' })

  const cart = carts[req.params.sessionId] || []
  const idx = cart.findIndex(i => i.product.id === req.params.productId)
  if (idx === -1) return res.status(404).json({ error: 'Item not in cart' })

  if (quantity <= 0) cart.splice(idx, 1)
  else cart[idx].quantity = quantity

  const total = cart.reduce((sum, i) => sum + i.product.price * i.quantity, 0)
  res.json({ items: cart, total: +total.toFixed(2), count: cart.reduce((s,i) => s+i.quantity, 0) })
})

app.delete('/api/cart/:sessionId/:productId', (req, res) => {
  if (!isValidSessionId(req.params.sessionId))
    return res.status(400).json({ error: 'Invalid session' })
  if (!isValidProductId(req.params.productId))
    return res.status(400).json({ error: 'Invalid productId' })

  const cart = carts[req.params.sessionId] || []
  const idx = cart.findIndex(i => i.product.id === req.params.productId)
  if (idx !== -1) cart.splice(idx, 1)
  const total = cart.reduce((sum, i) => sum + i.product.price * i.quantity, 0)
  res.json({ items: cart, total: +total.toFixed(2), count: cart.reduce((s,i) => s+i.quantity, 0) })
})

// ── Orders / Checkout ─────────────────────────────────────────────────────────
app.post('/api/orders', (req, res) => {
  const { sessionId, customer } = req.body

  if (!isValidSessionId(sessionId))
    return res.status(400).json({ error: 'Invalid session' })
  if (!customer ||
      !isNonEmptyString(customer.name, 100) ||
      !isNonEmptyString(customer.email, 254) ||
      !isNonEmptyString(customer.address, 300))
    return res.status(400).json({ error: 'Invalid customer details' })

  const cart = carts[sessionId] || []
  if (!cart.length) return res.status(400).json({ error: 'Cart is empty' })

  // Always recalculate total server-side — never trust client price data
  const order = {
    id: `ORD-${uuid().slice(0,8).toUpperCase()}`,
    customer: {
      name:    customer.name.trim(),
      email:   customer.email.trim().toLowerCase(),
      address: customer.address.trim(),
    },
    items: [...cart],
    total: +cart.reduce((s,i) => s + i.product.price * i.quantity, 0).toFixed(2),
    status: 'confirmed',
    createdAt: new Date().toISOString(),
  }
  orders.push(order)
  delete carts[sessionId]
  res.status(201).json(order)
})

app.get('/api/orders/:orderId', (req, res) => {
  if (typeof req.params.orderId !== 'string' || req.params.orderId.length > 20)
    return res.status(400).json({ error: 'Invalid order id' })
  const order = orders.find(o => o.id === req.params.orderId)
  if (!order) return res.status(404).json({ error: 'Order not found' })
  res.json(order)
})

// ── Health ────────────────────────────────────────────────────────────────────
app.get('/api/health', (_req, res) => res.json({ status: 'ok', products: products.length }))

export default app
