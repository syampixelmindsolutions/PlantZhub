import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  MapPin, CreditCard, Check, ChevronLeft, ChevronRight,
  Plus, Home, Building2, Landmark, Smartphone, Shield,
  Leaf, Package, Truck
} from 'lucide-react'
import { useCart, useAuth } from '../context/AppContext'
import Reveal from '../components/Reveal'

const STEPS = [
  { num: 1, label: 'Address',  icon: MapPin },
  { num: 2, label: 'Payment',  icon: CreditCard },
  { num: 3, label: 'Confirm',  icon: Check },
]

function StepBar({ current }) {
  return (
    <div className="flex items-center justify-center gap-0 mb-10">
      {STEPS.map((step, i) => {
        const done = current > step.num
        const active = current === step.num
        return (
          <div key={step.num} className="flex items-center">
            <div className="flex flex-col items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-all duration-400 ${
                done   ? 'bg-green border-green text-bg' :
                active ? 'bg-green/20 border-green text-green shadow-[0_0_20px_rgba(34,197,94,0.3)]' :
                         'bg-white/5 border-white/10 text-slate-500'
              }`}>
                {done ? <Check size={14} strokeWidth={3} /> : step.num}
              </div>
              <span className={`text-[10px] mt-1.5 font-medium hidden sm:block ${active ? 'text-green' : done ? 'text-slate-400' : 'text-slate-600'}`}>{step.label}</span>
            </div>
            {i < STEPS.length - 1 && <div className={`w-16 md:w-24 h-px mx-1 mb-4 transition-colors duration-400 ${done ? 'bg-green' : 'bg-white/10'}`} />}
          </div>
        )
      })}
    </div>
  )
}

// ─── Step 1: Address ──────────────────────────────────────────────────────────
function AddressStep({ form, setForm }) {
  const [addingNew, setAddingNew] = useState(false)
  const { user } = useAuth()

  const savedAddresses = user?.address?.length ? user.address : [
    { id: 1, type: 'Home', name: user?.name || 'User', phone: user?.phone || '', line1: '12, Green Lane, Jubilee Hills', city: 'Hyderabad', state: 'Telangana', pin: '500033', default: true },
  ]

  const set = k => e => setForm(f => ({ ...f, address: { ...f.address, [k]: e.target.value } }))

  return (
    <div>
      <h2 className="font-display text-2xl font-bold mb-2">Delivery <em className="text-green italic">Address</em></h2>
      <p className="text-slate-400 text-sm mb-7">Where should we deliver your plants?</p>

      {/* Saved addresses */}
      <div className="space-y-3 mb-5">
        {savedAddresses.map(addr => (
          <button
            key={addr.id}
            onClick={() => setForm(f => ({ ...f, selectedAddress: addr.id }))}
            className={`w-full flex items-start gap-3 p-4 rounded-2xl border text-left transition-all ${
              form.selectedAddress === addr.id ? 'bg-green/10 border-green/40' : 'bg-white/[0.02] border-white/8 hover:border-green/20'
            }`}
          >
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 ${form.selectedAddress === addr.id ? 'bg-green/20' : 'bg-white/5'}`}>
              {addr.type === 'Home' ? <Home size={15} className={form.selectedAddress === addr.id ? 'text-green' : 'text-slate-400'} />
               : addr.type === 'Office' ? <Building2 size={15} className={form.selectedAddress === addr.id ? 'text-green' : 'text-slate-400'} />
               : <Landmark size={15} className={form.selectedAddress === addr.id ? 'text-green' : 'text-slate-400'} />}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-0.5">
                <span className={`text-sm font-semibold ${form.selectedAddress === addr.id ? 'text-green' : 'text-white'}`}>{addr.type}</span>
                {addr.default && <span className="text-[10px] bg-green/20 text-green px-2 py-0.5 rounded-full font-medium">Default</span>}
              </div>
              <p className="text-slate-300 text-sm">{addr.name} · +91 {addr.phone}</p>
              <p className="text-slate-400 text-xs mt-0.5">{addr.line1}, {addr.city}, {addr.state} – {addr.pin}</p>
            </div>
            {form.selectedAddress === addr.id && (
              <div className="w-5 h-5 bg-green rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <Check size={11} className="text-bg" strokeWidth={3} />
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Add new address */}
      <button onClick={() => setAddingNew(v => !v)} className="flex items-center gap-2 text-sm text-green hover:text-green-light font-semibold mb-4 transition-colors">
        <Plus size={16} /> {addingNew ? 'Cancel' : 'Add New Address'}
      </button>

      <AnimatePresence>
        {addingNew && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            className="bg-white/[0.02] border border-white/8 rounded-2xl p-5 grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {[
              { label: 'Full Name', key: 'name', placeholder: 'Recipient name', cols: 1 },
              { label: 'Phone', key: 'phone', placeholder: '98765 43210', cols: 1 },
              { label: 'Flat / House No., Street', key: 'line1', placeholder: '12, Green Lane', cols: 2 },
              { label: 'City', key: 'city', placeholder: 'Hyderabad', cols: 1 },
              { label: 'State', key: 'state', placeholder: 'Telangana', cols: 1 },
              { label: 'PIN Code', key: 'pin', placeholder: '500033', cols: 1 },
            ].map(({ label, key, placeholder, cols }) => (
              <div key={key} className={cols === 2 ? 'md:col-span-2' : ''}>
                <label className="block text-xs text-slate-400 font-semibold mb-1.5 uppercase tracking-widest">{label}</label>
                <input placeholder={placeholder} onChange={set(key)} className="input text-sm w-full" />
              </div>
            ))}
            <div className="md:col-span-2">
              <button className="bg-green text-bg font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-green-light transition-colors">
                Save Address
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ─── Step 2: Payment ──────────────────────────────────────────────────────────
function PaymentStep({ form, setForm }) {
  const methods = [
    { id: 'upi',    label: 'UPI Payment',     sub: 'GPay, PhonePe, Paytm, BHIM', icon: '📱' },
    { id: 'card',   label: 'Credit / Debit Card', sub: 'Visa, Mastercard, RuPay', icon: '💳' },
    { id: 'netbanking', label: 'Net Banking', sub: 'All major banks supported', icon: '🏦' },
    { id: 'wallet', label: 'Wallets',         sub: 'Paytm, Amazon Pay, Freecharge', icon: '👛' },
    { id: 'cod',    label: 'Cash on Delivery', sub: '₹50 COD charge applies', icon: '💵' },
  ]

  return (
    <div>
      <h2 className="font-display text-2xl font-bold mb-2">Payment <em className="text-green italic">Method</em></h2>
      <p className="text-slate-400 text-sm mb-7">Choose how you'd like to pay.</p>

      <div className="space-y-3 mb-7">
        {methods.map(method => (
          <button
            key={method.id}
            onClick={() => setForm(f => ({ ...f, paymentMethod: method.id }))}
            className={`w-full flex items-center gap-4 p-4 rounded-2xl border text-left transition-all ${
              form.paymentMethod === method.id ? 'bg-green/10 border-green/40' : 'bg-white/[0.02] border-white/8 hover:border-green/20'
            }`}
          >
            <div className="text-2xl flex-shrink-0">{method.icon}</div>
            <div className="flex-1">
              <p className={`font-semibold text-sm ${form.paymentMethod === method.id ? 'text-green' : 'text-white'}`}>{method.label}</p>
              <p className="text-slate-500 text-xs">{method.sub}</p>
            </div>
            {form.paymentMethod === method.id && (
              <div className="w-5 h-5 bg-green rounded-full flex items-center justify-center flex-shrink-0">
                <Check size={11} className="text-bg" strokeWidth={3} />
              </div>
            )}
          </button>
        ))}
      </div>

      {/* UPI input */}
      <AnimatePresence>
        {form.paymentMethod === 'upi' && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}>
            <label className="block text-xs text-slate-400 font-semibold mb-1.5 uppercase tracking-widest">Your UPI ID</label>
            <input placeholder="yourname@upi" className="input text-sm w-full mb-4" />
          </motion.div>
        )}
        {form.paymentMethod === 'card' && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4"
          >
            <div className="md:col-span-2">
              <label className="block text-xs text-slate-400 font-semibold mb-1.5 uppercase tracking-widest">Card Number</label>
              <input placeholder="1234 5678 9012 3456" maxLength={19} className="input text-sm w-full" />
            </div>
            <div>
              <label className="block text-xs text-slate-400 font-semibold mb-1.5 uppercase tracking-widest">Expiry</label>
              <input placeholder="MM / YY" className="input text-sm w-full" />
            </div>
            <div>
              <label className="block text-xs text-slate-400 font-semibold mb-1.5 uppercase tracking-widest">CVV</label>
              <input placeholder="•••" type="password" maxLength={4} className="input text-sm w-full" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs text-slate-400 font-semibold mb-1.5 uppercase tracking-widest">Name on Card</label>
              <input placeholder="As printed on card" className="input text-sm w-full" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex items-center gap-2 text-xs text-slate-500 bg-white/5 border border-white/8 rounded-xl px-4 py-3">
        <Shield size={14} className="text-green flex-shrink-0" />
        Your payment info is encrypted with 256-bit SSL. GreenCO never stores card details.
      </div>
    </div>
  )
}

// ─── Step 3: Confirm ──────────────────────────────────────────────────────────
function ConfirmStep({ form, items, total, discount, delivery, grandTotal }) {
  const savedAddresses = [{ id: 1, type: 'Home', line1: '12, Green Lane, Jubilee Hills', city: 'Hyderabad', state: 'Telangana', pin: '500033' }]
  const addr = savedAddresses.find(a => a.id === form.selectedAddress) || savedAddresses[0]
  const payLabels = { upi: 'UPI Payment', card: 'Credit / Debit Card', netbanking: 'Net Banking', wallet: 'Wallet', cod: 'Cash on Delivery' }

  return (
    <div>
      <h2 className="font-display text-2xl font-bold mb-2">Review <em className="text-green italic">Your Order</em></h2>
      <p className="text-slate-400 text-sm mb-7">Check everything before placing your order.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
        <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-4">
          <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold mb-3 flex items-center gap-1"><MapPin size={11} /> Delivering to</p>
          <p className="text-white font-semibold text-sm">{addr.type}</p>
          <p className="text-slate-400 text-xs">{addr.line1}, {addr.city}, {addr.state} – {addr.pin}</p>
        </div>
        <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-4">
          <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold mb-3 flex items-center gap-1"><CreditCard size={11} /> Payment</p>
          <p className="text-white font-semibold text-sm">{payLabels[form.paymentMethod] || 'Not selected'}</p>
          <p className="text-slate-400 text-xs">Secure encrypted payment</p>
        </div>
      </div>

      {/* Items */}
      <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-4 mb-5">
        <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold mb-4 flex items-center gap-1"><Package size={11} /> Order Items</p>
        <div className="space-y-3">
          {items.map(item => (
            <div key={item.id} className="flex items-center gap-3">
              <img src={item.image} alt={item.name} className="w-12 h-12 rounded-xl object-cover flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-medium truncate">{item.name}</p>
                <p className="text-slate-500 text-xs">Qty: {item.qty}</p>
              </div>
              <span className="text-white font-semibold text-sm flex-shrink-0">₹{(item.price * item.qty).toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Price breakdown */}
      <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-4">
        <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold mb-4">Price Breakdown</p>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between"><span className="text-slate-400">Subtotal</span><span className="text-white">₹{total.toLocaleString()}</span></div>
          <div className="flex justify-between"><span className="text-slate-400">Discount (5%)</span><span className="text-green">− ₹{discount.toLocaleString()}</span></div>
          <div className="flex justify-between"><span className="text-slate-400">Delivery</span><span className={delivery === 0 ? 'text-green' : 'text-white'}>{delivery === 0 ? 'FREE' : `₹${delivery}`}</span></div>
          <div className="flex justify-between pt-3 border-t border-white/10">
            <span className="text-white font-bold text-base">Total</span>
            <span className="text-white font-bold text-xl">₹{grandTotal.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Success ──────────────────────────────────────────────────────────────────
function OrderSuccess({ orderId }) {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center max-w-lg mx-auto py-10">
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.2 }}
        className="w-24 h-24 bg-green/20 border border-green/40 rounded-full flex items-center justify-center mx-auto mb-6"
      >
        <Check size={40} className="text-green" strokeWidth={2.5} />
      </motion.div>
      <h2 className="font-display text-4xl font-black mb-3">Order <em className="text-green italic">Placed!</em></h2>
      <p className="text-slate-400 mb-2">Your plants are on their way to you! 🌿</p>
      <div className="inline-flex items-center gap-2 bg-green/10 border border-green/30 text-green text-sm font-bold px-4 py-2 rounded-full mb-8">
        Order ID: {orderId}
      </div>
      <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-5 text-left mb-8 space-y-3">
        <p className="text-white font-semibold text-sm">What happens next?</p>
        {[
          { icon: <Package size={13} />, text: 'Order confirmed — you\'ll receive an email in 2 mins' },
          { icon: <Truck size={13} />, text: 'Plants carefully packed within 24 hours' },
          { icon: <Leaf size={13} />, text: 'Delivered to your door in 24–48 hours' },
        ].map(({ icon, text }) => (
          <div key={text} className="flex items-center gap-3 text-slate-300 text-sm">
            <div className="text-green flex-shrink-0">{icon}</div> {text}
          </div>
        ))}
      </div>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link to="/profile?tab=orders" className="btn-primary">Track My Order <ChevronRight size={16} /></Link>
        <Link to="/shop" className="btn-outline">Continue Shopping</Link>
      </div>
    </motion.div>
  )
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
export default function Checkout() {
  const { items, total, discount, delivery, grandTotal, clearCart } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [step, setStep]       = useState(1)
  const [placing, setPlacing] = useState(false)
  const [orderId, setOrderId] = useState(null)
  const [form, setForm]       = useState({
    selectedAddress: 1,
    address: {},
    paymentMethod: 'upi',
  })

  if (!user) {
    return (
      <main className="min-h-screen bg-bg pt-28 flex items-center justify-center px-5">
        <div className="text-center max-w-sm">
          <div className="text-5xl mb-4">🔐</div>
          <h2 className="font-display text-2xl font-black mb-3">Login to <em className="text-green italic">Checkout</em></h2>
          <p className="text-slate-400 text-sm mb-6">Please sign in to place your order securely.</p>
          <Link to="/" className="btn-primary">Go Back & Login</Link>
        </div>
      </main>
    )
  }

  if (items.length === 0 && !orderId) {
    navigate('/cart'); return null
  }

  const placeOrder = async () => {
    setPlacing(true)
    await new Promise(r => setTimeout(r, 2000))
    const id = `GCO-${Date.now().toString().slice(-8)}`
    setOrderId(id)
    clearCart()
    setPlacing(false)
  }

  if (orderId) return (
    <main className="min-h-screen bg-bg pt-28 pb-20 px-[5%]"><OrderSuccess orderId={orderId} /></main>
  )

  const stepComponents = { 1: AddressStep, 2: PaymentStep, 3: ConfirmStep }
  const StepComponent = stepComponents[step]

  const canNext = () => {
    if (step === 1) return true
    if (step === 2) return !!form.paymentMethod
    return true
  }

  return (
    <main className="min-h-screen bg-bg pt-24 pb-20">
      <div className="bg-bg-3 border-b border-white/5 py-10 px-[5%]">
        <div className="max-w-5xl mx-auto">
          <Reveal>
            <h1 className="font-display text-4xl font-black">Secure <em className="text-green italic">Checkout</em></h1>
          </Reveal>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-[5%] py-10">
        <StepBar current={step} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              <motion.div key={step}
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white/[0.02] border border-white/5 rounded-3xl p-6 md:p-8"
              >
                <StepComponent form={form} setForm={setForm} items={items} total={total} discount={discount} delivery={delivery} grandTotal={grandTotal} />
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-6">
              <button onClick={() => step === 1 ? navigate('/cart') : setStep(s => s - 1)}
                className="flex items-center gap-2 border border-white/10 text-slate-400 hover:text-white hover:border-white/20 px-5 py-3 rounded-xl text-sm font-medium transition-all"
              >
                <ChevronLeft size={15} /> {step === 1 ? 'Back to Cart' : 'Back'}
              </button>

              {step < 3 ? (
                <button onClick={() => setStep(s => s + 1)} disabled={!canNext()}
                  className="flex items-center gap-2 bg-green text-bg px-7 py-3 rounded-xl font-bold text-sm hover:bg-green-light transition-all hover:-translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Continue <ChevronRight size={15} />
                </button>
              ) : (
                <button onClick={placeOrder} disabled={placing}
                  className="flex items-center gap-2 bg-green text-bg px-7 py-3 rounded-xl font-bold text-sm hover:bg-green-light hover:shadow-[0_0_25px_rgba(34,197,94,0.4)] transition-all"
                >
                  {placing ? (
                    <><div className="w-4 h-4 border-2 border-bg/30 border-t-bg rounded-full animate-spin" /> Placing Order...</>
                  ) : (
                    <><Check size={15} /> Place Order • ₹{grandTotal.toLocaleString()}</>
                  )}
                </button>
              )}
            </div>
          </div>

          {/* Mini summary */}
          <div>
            <div className="bg-bg-2 border border-white/5 rounded-2xl p-5 sticky top-28">
              <h3 className="font-semibold text-white mb-4 text-sm">Order Summary</h3>
              <div className="space-y-2 mb-4 max-h-48 overflow-y-auto" style={{ scrollbarWidth: 'thin' }}>
                {items.map(item => (
                  <div key={item.id} className="flex gap-2.5 items-center">
                    <img src={item.image} alt={item.name} className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-xs font-medium truncate">{item.name}</p>
                      <p className="text-slate-500 text-[10px]">×{item.qty}</p>
                    </div>
                    <span className="text-green text-xs font-semibold flex-shrink-0">₹{(item.price * item.qty).toLocaleString()}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-white/10 pt-3 space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-400"><span>Subtotal</span><span>₹{total.toLocaleString()}</span></div>
                <div className="flex justify-between text-green"><span>Discount</span><span>− ₹{discount.toLocaleString()}</span></div>
                <div className="flex justify-between text-slate-400"><span>Delivery</span><span>{delivery === 0 ? 'FREE' : `₹${delivery}`}</span></div>
                <div className="flex justify-between text-white font-bold text-sm pt-2 border-t border-white/10">
                  <span>Total</span><span>₹{grandTotal.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}