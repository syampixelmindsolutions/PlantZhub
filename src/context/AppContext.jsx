import { createContext, useContext, useState, useEffect, useCallback } from 'react'

// ─── CONTEXTS ─────────────────────────────────────────────────────────────────
const AuthContext = createContext(null)
const CartContext = createContext(null)

// ─── AUTH PROVIDER ────────────────────────────────────────────────────────────
export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem('greenco_user')) || null } catch { return null }
  })

  const login = useCallback((userData) => {
    const u = { ...userData, id: userData.id || Date.now(), joinedAt: userData.joinedAt || new Date().toISOString() }
    setUser(u)
    localStorage.setItem('greenco_user', JSON.stringify(u))
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    localStorage.removeItem('greenco_user')
  }, [])

  const updateUser = useCallback((patch) => {
    setUser(prev => {
      const updated = { ...prev, ...patch }
      localStorage.setItem('greenco_user', JSON.stringify(updated))
      return updated
    })
  }, [])

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  )
}

// ─── CART PROVIDER ────────────────────────────────────────────────────────────
export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem('greenco_cart')) || [] } catch { return [] }
  })

  useEffect(() => {
    localStorage.setItem('greenco_cart', JSON.stringify(items))
  }, [items])

  const addItem = useCallback((plant, qty = 1) => {
    setItems(prev => {
      const existing = prev.find(i => i.id === plant.id)
      if (existing) return prev.map(i => i.id === plant.id ? { ...i, qty: i.qty + qty } : i)
      return [...prev, { ...plant, qty }]
    })
  }, [])

  const removeItem = useCallback((id) => {
    setItems(prev => prev.filter(i => i.id !== id))
  }, [])

  const updateQty = useCallback((id, qty) => {
    if (qty < 1) { setItems(prev => prev.filter(i => i.id !== id)); return }
    setItems(prev => prev.map(i => i.id === id ? { ...i, qty } : i))
  }, [])

  const clearCart = useCallback(() => setItems([]), [])

  const total    = items.reduce((s, i) => s + i.price * i.qty, 0)
  const count    = items.reduce((s, i) => s + i.qty, 0)
  const discount = Math.round(total * 0.05)          // 5% app discount
  const delivery = total >= 999 ? 0 : 99
  const grandTotal = total - discount + delivery

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQty, clearCart, total, count, discount, delivery, grandTotal }}>
      {children}
    </CartContext.Provider>
  )
}

// ─── HOOKS ────────────────────────────────────────────────────────────────────
export const useAuth = () => useContext(AuthContext)
export const useCart = () => useContext(CartContext)