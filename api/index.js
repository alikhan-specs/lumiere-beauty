import express from 'express'
import cors from 'cors'
import { v4 as uuid } from 'uuid'
import { products } from '../backend/src/data/products.js'

const app = express()
app.use(cors())
app.use(express.json())

// ── In-memory stores ────────────────────────────────────────────────────────
const carts  = {}   // { sessionId: [ { product, quantity } ] }
const orders = []

// ── Products ────────────────────────────────────────────────────────────────
app.get('/api/products', (req, res) => {
  const { category, search, sort } = req.query
  let list = [...products]

  if (category && category !== 'All')
    list = list.filter(p => p.category === category)

  if (search)
    list = list.filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.brand.toLowerCase().includes(search.toLowerCase())
    )

  if (sort === 'price-asc')  list.sort((a,b) => a.price - b.price)
  if (sort === 'price-desc') list.sort((a,b) => b.price - a.price)
  if (sort === 'rating')     list.sort((a,b) => b.rating - a.rating)

  res.json({ products: list, total: list.length })
})

app.get('/api/products/:id', (req, res) => {
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
  const cart = carts[req.params.sessionId] || []
  const total = cart.reduce((sum, i) => sum + i.product.price * i.quantity, 0)
  res.json({ items: cart, total: +total.toFixed(2), count: cart.reduce((s,i) => s+i.quantity, 0) })
})

app.post('/api/cart/:sessionId', (req, res) => {
  const { productId, quantity = 1 } = req.body
  const product = products.find(p => p.id === productId)
  if (!product) return res.status(404).json({ error: 'Product not found' })

  if (!carts[req.params.sessionId]) carts[req.params.sessionId] = []
  const cart = carts[req.params.sessionId]
  const existing = cart.find(i => i.product.id === productId)

  if (existing) existing.quantity += quantity
  else cart.push({ product, quantity })

  const total = cart.reduce((sum, i) => sum + i.product.price * i.quantity, 0)
  res.json({ items: cart, total: +total.toFixed(2), count: cart.reduce((s,i) => s+i.quantity, 0) })
})

app.put('/api/cart/:sessionId/:productId', (req, res) => {
  const { quantity } = req.body
  const cart = carts[req.params.sessionId] || []
  const idx = cart.findIndex(i => i.product.id === req.params.productId)
  if (idx === -1) return res.status(404).json({ error: 'Item not in cart' })

  if (quantity <= 0) cart.splice(idx, 1)
  else cart[idx].quantity = quantity

  const total = cart.reduce((sum, i) => sum + i.product.price * i.quantity, 0)
  res.json({ items: cart, total: +total.toFixed(2), count: cart.reduce((s,i) => s+i.quantity, 0) })
})

app.delete('/api/cart/:sessionId/:productId', (req, res) => {
  const cart = carts[req.params.sessionId] || []
  const idx = cart.findIndex(i => i.product.id === req.params.productId)
  if (idx !== -1) cart.splice(idx, 1)
  const total = cart.reduce((sum, i) => sum + i.product.price * i.quantity, 0)
  res.json({ items: cart, total: +total.toFixed(2), count: cart.reduce((s,i) => s+i.quantity, 0) })
})

// ── Orders / Checkout ─────────────────────────────────────────────────────────
app.post('/api/orders', (req, res) => {
  const { sessionId, customer } = req.body
  const cart = carts[sessionId] || []
  if (!cart.length) return res.status(400).json({ error: 'Cart is empty' })

  const order = {
    id: `ORD-${uuid().slice(0,8).toUpperCase()}`,
    customer,
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
  const order = orders.find(o => o.id === req.params.orderId)
  if (!order) return res.status(404).json({ error: 'Order not found' })
  res.json(order)
})

// ── Health ────────────────────────────────────────────────────────────────────
app.get('/api/health', (_req, res) => res.json({ status: 'ok', products: products.length }))

export default app
