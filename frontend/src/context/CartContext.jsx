import { createContext, useContext, useEffect, useState } from 'react'

const API  = '/api'
const SID_KEY = 'beauty_session_id'

function getSessionId() {
  let id = localStorage.getItem(SID_KEY)
  if (!id) { id = crypto.randomUUID(); localStorage.setItem(SID_KEY, id) }
  return id
}

const CartContext = createContext(null)
export const useCart = () => useContext(CartContext)

export function CartProvider({ children }) {
  const [cart, setCart]     = useState({ items: [], total: 0, count: 0 })
  const [loading, setLoading] = useState(false)
  const sessionId = getSessionId()

  const fetchCart = async () => {
    const r = await fetch(`${API}/cart/${sessionId}`)
    setCart(await r.json())
  }

  useEffect(() => { fetchCart() }, [])

  const addToCart = async (productId, quantity = 1) => {
    setLoading(true)
    const r = await fetch(`${API}/cart/${sessionId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId, quantity }),
    })
    setCart(await r.json())
    setLoading(false)
  }

  const updateQty = async (productId, quantity) => {
    const r = await fetch(`${API}/cart/${sessionId}/${productId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ quantity }),
    })
    setCart(await r.json())
  }

  const removeItem = async (productId) => {
    const r = await fetch(`${API}/cart/${sessionId}/${productId}`, { method: 'DELETE' })
    setCart(await r.json())
  }

  const checkout = async (customer) => {
    const r = await fetch(`${API}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId, customer }),
    })
    if (!r.ok) throw new Error('Checkout failed')
    const order = await r.json()
    setCart({ items: [], total: 0, count: 0 })
    return order
  }

  return (
    <CartContext.Provider value={{ cart, loading, addToCart, updateQty, removeItem, checkout }}>
      {children}
    </CartContext.Provider>
  )
}
