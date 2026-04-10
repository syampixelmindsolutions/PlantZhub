import { Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, Leaf, ShieldCheck } from 'lucide-react'
import { useCart, useAuth } from '../context/AppContext'
import Reveal from '../components/Reveal'

export default function Cart() {
  const { items, removeItem, updateQty, total, count, discount, delivery, grandTotal } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()

  const handleCheckout = () => {
    if (!user) {
      // Show auth prompt — navigate to checkout, auth modal will handle
    }
    navigate('/checkout')
  }

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-bg pt-28 pb-20 flex items-center justify-center">
        <div className="text-center max-w-sm mx-auto px-6">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-24 h-24 bg-white/5 border border-white/10 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <ShoppingBag size={36} className="text-slate-600" />
          </motion.div>
          <h2 className="font-display text-3xl font-black mb-3">Your cart is <em className="text-green italic">empty</em></h2>
          <p className="text-slate-400 mb-8 text-sm">Looks like you haven't added any plants yet. Start exploring our lush collection!</p>
          <Link to="/shop" className="btn-primary">Browse Plants <ArrowRight size={16} /></Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-bg pt-24 pb-20">
      {/* Header */}
      <div className="bg-bg-3 border-b border-white/5 py-10 px-[5%]">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <p className="section-tag">Your Selection</p>
            <h1 className="font-display text-4xl font-black">
              Shopping <em className="text-green italic">Cart</em>
              <span className="text-slate-500 text-2xl ml-3 font-normal">({count} items)</span>
            </h1>
          </Reveal>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-[5%] py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ── Cart Items ── */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence>
              {items.map((item, i) => (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -60, transition: { duration: 0.25 } }}
                  transition={{ delay: i * 0.06 }}
                  className="flex gap-4 bg-bg-2 border border-white/5 hover:border-green/20 rounded-2xl p-4 transition-all duration-300 group"
                >
                  {/* Image */}
                  <Link to={`/shop/${item.id}`} className="flex-shrink-0">
                    <div className="w-24 h-24 md:w-28 md:h-28 rounded-xl overflow-hidden bg-bg-4">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                  </Link>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-slate-500 text-xs mb-0.5">{item.category}</p>
                        <Link to={`/shop/${item.id}`} className="text-white font-semibold text-sm hover:text-green transition-colors leading-snug">{item.name}</Link>
                      </div>
                      <button onClick={() => removeItem(item.id)} className="flex-shrink-0 p-1.5 text-slate-600 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all">
                        <Trash2 size={14} />
                      </button>
                    </div>

                    <div className="flex items-center gap-1 mt-1.5 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={`text-[10px] ${i < Math.floor(item.rating) ? 'text-amber-400' : 'text-slate-700'}`}>★</span>
                      ))}
                      <span className="text-slate-600 text-[10px] ml-1">{item.rating}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      {/* Qty */}
                      <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                        <button onClick={() => updateQty(item.id, item.qty - 1)} className="px-3 py-2 hover:bg-red-500/20 hover:text-red-400 text-white transition-colors text-sm font-bold">
                          <Minus size={12} />
                        </button>
                        <span className="text-white font-bold text-sm px-3 py-2 min-w-[2.5rem] text-center">{item.qty}</span>
                        <button onClick={() => updateQty(item.id, item.qty + 1)} className="px-3 py-2 hover:bg-green/20 hover:text-green text-white transition-colors text-sm font-bold">
                          <Plus size={12} />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <p className="text-white font-bold">₹{(item.price * item.qty).toLocaleString()}</p>
                        <p className="text-slate-500 text-xs">₹{item.price.toLocaleString()} each</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Continue shopping */}
            <Link to="/shop" className="flex items-center gap-2 text-sm text-slate-400 hover:text-green transition-colors mt-4 w-fit">
              <Leaf size={14} /> Continue Shopping
            </Link>
          </div>

          {/* ── Order Summary ── */}
          <div className="lg:col-span-1">
            <div className="bg-bg-2 border border-white/5 rounded-2xl p-6 sticky top-28">
              <h2 className="font-semibold text-white mb-5 text-lg">Order Summary</h2>

              <div className="space-y-3 mb-5">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Subtotal ({count} items)</span>
                  <span className="text-white font-medium">₹{total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400 flex items-center gap-1"><Tag size={12} className="text-green" /> App Discount (5%)</span>
                  <span className="text-green font-medium">− ₹{discount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Delivery</span>
                  <span className={delivery === 0 ? 'text-green font-medium' : 'text-white font-medium'}>
                    {delivery === 0 ? 'FREE' : `₹${delivery}`}
                  </span>
                </div>
                {delivery === 0 && (
                  <p className="text-green/70 text-xs">🎉 Free delivery on orders above ₹999!</p>
                )}
                <div className="border-t border-white/10 pt-3 flex justify-between">
                  <span className="text-white font-bold">Grand Total</span>
                  <span className="text-white font-bold text-xl">₹{grandTotal.toLocaleString()}</span>
                </div>
              </div>

              {/* Coupon */}
              <div className="flex gap-2 mb-5">
                <input type="text" placeholder="Coupon code" className="input flex-1 text-sm py-2.5" />
                <button className="bg-white/5 border border-white/10 hover:border-green/40 text-slate-300 hover:text-green text-sm px-4 rounded-xl transition-all font-medium">
                  Apply
                </button>
              </div>

              {/* Checkout */}
              <button
                onClick={handleCheckout}
                className="w-full bg-green text-bg font-bold py-4 rounded-xl hover:bg-green-light hover:shadow-[0_0_30px_rgba(34,197,94,0.4)] transition-all duration-300 flex items-center justify-center gap-2 text-sm"
              >
                Proceed to Checkout <ArrowRight size={16} />
              </button>

              {/* Trust */}
              <div className="mt-4 space-y-2">
                {['Secure 256-bit SSL Checkout', '7-day freshness guarantee', 'Easy returns & refunds'].map(t => (
                  <div key={t} className="flex items-center gap-2 text-xs text-slate-500">
                    <ShieldCheck size={12} className="text-green flex-shrink-0" /> {t}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}