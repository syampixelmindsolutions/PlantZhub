import React from 'react'
import { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  User, Package, MapPin, Heart, Settings, Camera,
  ChevronRight, Edit3, Check, X, Plus, Trash2,
  Star, LogOut, Bell, Shield, CreditCard, Home, Building2
} from 'lucide-react'
import { useAuth, useCart } from '../context/AppContext'
import { Avatar } from '../components/ProfilePopup'
import { plants } from '../data/plants'
import Reveal from '../components/Reveal'

const TABS = [
  { id: 'overview',   label: 'Overview',   icon: User },
  { id: 'orders',     label: 'My Orders',  icon: Package },
  { id: 'addresses',  label: 'Addresses',  icon: MapPin },
  { id: 'wishlist',   label: 'Wishlist',   icon: Heart },
  { id: 'settings',   label: 'Settings',   icon: Settings },
]

// Fake order history
const FAKE_ORDERS = [
  { id: 'GCO-847291', date: 'Apr 2, 2025', status: 'Delivered', statusColor: 'text-green', items: [{ name: 'Monstera Deliciosa', qty: 1, price: 1299, image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=100&q=70' }], total: 1299 },
  { id: 'GCO-721033', date: 'Mar 18, 2025', status: 'Delivered', statusColor: 'text-green', items: [{ name: 'Hibiscus (Gudhal)', qty: 2, price: 279, image: 'https://images.unsplash.com/photo-1610878180933-123728745d22?w=100&q=70' }, { name: 'Aloe Vera', qty: 1, price: 449, image: 'https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?w=100&q=70' }], total: 1007 },
  { id: 'GCO-610044', date: 'Feb 28, 2025', status: 'In Transit', statusColor: 'text-amber-400', items: [{ name: 'Ficus Bonsai', qty: 1, price: 2499, image: 'https://images.unsplash.com/photo-1599598425947-5202edd56bdb?w=100&q=70' }], total: 2499 },
]

// ─── Overview Tab ─────────────────────────────────────────────────────────────
function OverviewTab({ user, updateUser }) {
  const [editing, setEditing] = useState(false)
  const [draft, setDraft]     = useState({ name: user.name, email: user.email, phone: user.phone || '', bio: user.bio || '' })
  const [saved, setSaved]     = useState(false)

  const save = () => {
    updateUser(draft)
    setEditing(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="space-y-6">
      {/* Profile card */}
      <div className="bg-bg-2 border border-white/5 rounded-2xl overflow-hidden">
        {/* Cover */}
        <div className="h-28 bg-gradient-to-br from-green/20 via-green/10 to-transparent relative">
          <div className="absolute inset-0 dot-grid opacity-30" />
        </div>
        {/* Avatar + info */}
        <div className="px-6 pb-6">
          <div className="flex items-end gap-4 -mt-10 mb-4">
            <div className="relative">
              <Avatar user={user} size={72} />
              <button className="absolute -bottom-1 -right-1 w-7 h-7 bg-bg-2 border border-white/20 rounded-full flex items-center justify-center hover:border-green/40 transition-colors">
                <Camera size={12} className="text-slate-400" />
              </button>
            </div>
            <div className="flex-1 pb-2">
              <h2 className="font-display text-xl font-bold text-white">{user.name}</h2>
              <p className="text-slate-400 text-sm">{user.email}</p>
            </div>
            <button onClick={() => setEditing(!editing)}
              className="flex items-center gap-1.5 text-xs bg-white/5 hover:bg-green/10 border border-white/10 hover:border-green/30 text-slate-400 hover:text-green px-3 py-2 rounded-lg transition-all"
            >
              <Edit3 size={12} /> {editing ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>

          {editing ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { label: 'Full Name', key: 'name', type: 'text' },
                { label: 'Email', key: 'email', type: 'email' },
                { label: 'Phone', key: 'phone', type: 'tel' },
              ].map(({ label, key, type }) => (
                <div key={key}>
                  <label className="block text-xs text-slate-400 font-semibold mb-1.5 uppercase tracking-widest">{label}</label>
                  <input type={type} value={draft[key]} onChange={e => setDraft(d => ({ ...d, [key]: e.target.value }))} className="input text-sm w-full" />
                </div>
              ))}
              <div className="md:col-span-2">
                <label className="block text-xs text-slate-400 font-semibold mb-1.5 uppercase tracking-widest">Bio</label>
                <textarea value={draft.bio} onChange={e => setDraft(d => ({ ...d, bio: e.target.value }))} rows={2} placeholder="Tell us a bit about yourself..." className="input text-sm w-full resize-none" />
              </div>
              <div className="md:col-span-2 flex gap-3">
                <button onClick={save} className="bg-green text-bg font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-green-light transition-colors flex items-center gap-1.5">
                  <Check size={13} /> Save Changes
                </button>
                <button onClick={() => setEditing(false)} className="border border-white/10 text-slate-400 text-sm px-4 py-2.5 rounded-xl hover:border-white/20 transition-colors">
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { label: 'Member Since', val: new Date(user.joinedAt).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' }) },
                { label: 'Total Orders', val: FAKE_ORDERS.length },
                { label: 'Plants Bought', val: FAKE_ORDERS.reduce((s, o) => s + o.items.reduce((ss, i) => ss + i.qty, 0), 0) },
                { label: 'Green Points', val: '240 pts' },
              ].map(({ label, val }) => (
                <div key={label} className="bg-white/5 rounded-xl p-3 text-center">
                  <p className="text-green font-bold text-lg">{val}</p>
                  <p className="text-slate-500 text-xs">{label}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Recent orders preview */}
      <div className="bg-bg-2 border border-white/5 rounded-2xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-white text-sm">Recent Orders</h3>
          <button className="text-green text-xs hover:text-green-light transition-colors">View all →</button>
        </div>
        <div className="space-y-3">
          {FAKE_ORDERS.slice(0, 2).map(order => (
            <div key={order.id} className="flex items-center gap-3 p-3 bg-white/[0.03] rounded-xl border border-white/5">
              <img src={order.items[0].image} alt="" className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-medium truncate">{order.items.map(i => i.name).join(', ')}</p>
                <p className="text-slate-500 text-xs">{order.id} · {order.date}</p>
              </div>
              <span className={`text-xs font-semibold flex-shrink-0 ${order.statusColor}`}>{order.status}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {[
          { icon: '🌿', title: 'Get a Quote', desc: 'Custom plant projects', to: '/get-quote' },
          { icon: '📦', title: 'Track Order', desc: 'Real-time updates', to: '/profile?tab=orders' },
          { icon: '💬', title: 'Support', desc: 'Chat with a botanist', to: '/contact' },
        ].map(({ icon, title, desc, to }) => (
          <Link key={title} to={to} className="group bg-white/[0.02] border border-white/5 hover:border-green/20 rounded-2xl p-4 transition-all hover:-translate-y-0.5">
            <span className="text-2xl block mb-2">{icon}</span>
            <p className="text-white text-sm font-semibold group-hover:text-green transition-colors">{title}</p>
            <p className="text-slate-500 text-xs">{desc}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

// ─── Orders Tab ───────────────────────────────────────────────────────────────
function OrdersTab() {
  const statusStyles = {
    'Delivered':   'bg-green/20 text-green border-green/30',
    'In Transit':  'bg-amber-500/20 text-amber-400 border-amber-500/30',
    'Processing':  'bg-blue-500/20 text-blue-400 border-blue-500/30',
    'Cancelled':   'bg-red-500/20 text-red-400 border-red-500/30',
  }
  return (
    <div className="space-y-4">
      {FAKE_ORDERS.length === 0 ? (
        <div className="text-center py-16 text-slate-500">
          <Package size={40} className="mx-auto mb-3 opacity-30" />
          <p>No orders yet. Start shopping!</p>
          <Link to="/shop" className="btn-primary mt-4 inline-flex">Browse Plants</Link>
        </div>
      ) : FAKE_ORDERS.map((order, i) => (
        <motion.div key={order.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
          className="bg-bg-2 border border-white/5 hover:border-green/15 rounded-2xl p-5 transition-all"
        >
          <div className="flex items-start justify-between gap-3 mb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-white font-bold text-sm">{order.id}</span>
                <span className={`text-[10px] font-semibold px-2.5 py-0.5 rounded-full border ${statusStyles[order.status] || ''}`}>{order.status}</span>
              </div>
              <p className="text-slate-500 text-xs">Placed on {order.date}</p>
            </div>
            <span className="text-white font-bold">₹{order.total.toLocaleString()}</span>
          </div>
          <div className="flex gap-3 flex-wrap">
            {order.items.map(item => (
              <div key={item.name} className="flex items-center gap-2.5 bg-white/[0.03] border border-white/5 rounded-xl p-2.5">
                <img src={item.image} alt={item.name} className="w-10 h-10 rounded-lg object-cover" />
                <div>
                  <p className="text-white text-xs font-medium">{item.name}</p>
                  <p className="text-slate-500 text-[10px]">Qty: {item.qty} · ₹{item.price.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex gap-2 mt-4">
            <button className="text-xs border border-white/10 hover:border-green/30 text-slate-400 hover:text-green px-3 py-1.5 rounded-lg transition-all">Track Order</button>
            <button className="text-xs border border-white/10 hover:border-white/20 text-slate-400 hover:text-white px-3 py-1.5 rounded-lg transition-all">Invoice</button>
            {order.status === 'Delivered' && (
              <button className="text-xs border border-amber-500/30 text-amber-400 hover:bg-amber-500/10 px-3 py-1.5 rounded-lg transition-all">Write Review</button>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  )
}

// ─── Addresses Tab ────────────────────────────────────────────────────────────
function AddressesTab() {
  const addrs = [
    { id: 1, type: 'Home', name: 'Ananya Sharma', phone: '98765 43210', line: '12, Green Lane, Jubilee Hills', city: 'Hyderabad', state: 'Telangana', pin: '500033', default: true },
    { id: 2, type: 'Office', name: 'Ananya Sharma', phone: '98765 43210', line: '45, Tech Park, HITEC City', city: 'Hyderabad', state: 'Telangana', pin: '500081', default: false },
  ]
  return (
    <div className="space-y-4">
      <button className="flex items-center gap-2 text-sm text-green hover:text-green-light font-semibold mb-2 transition-colors">
        <Plus size={16} /> Add New Address
      </button>
      {addrs.map((addr, i) => (
        <motion.div key={addr.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
          className="bg-bg-2 border border-white/5 hover:border-green/15 rounded-2xl p-5 transition-all"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                {addr.type === 'Home' ? <Home size={16} className="text-green" /> : <Building2 size={16} className="text-green" />}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-white font-semibold text-sm">{addr.type}</span>
                  {addr.default && <span className="text-[10px] bg-green/20 text-green border border-green/30 px-2 py-0.5 rounded-full font-medium">Default</span>}
                </div>
                <p className="text-slate-300 text-sm">{addr.name} · +91 {addr.phone}</p>
                <p className="text-slate-400 text-xs mt-0.5">{addr.line}, {addr.city}, {addr.state} – {addr.pin}</p>
              </div>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <button className="p-1.5 text-slate-500 hover:text-green hover:bg-green/10 rounded-lg transition-all"><Edit3 size={13} /></button>
              {!addr.default && <button className="p-1.5 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"><Trash2 size={13} /></button>}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

// ─── Wishlist Tab ─────────────────────────────────────────────────────────────
function WishlistTab() {
  const { addItem } = useCart()
  const wishlistPlants = plants.slice(0, 4)
  return (
    <div>
      {wishlistPlants.length === 0 ? (
        <div className="text-center py-16 text-slate-500">
          <Heart size={40} className="mx-auto mb-3 opacity-30" />
          <p>Your wishlist is empty.</p>
          <Link to="/shop" className="btn-primary mt-4 inline-flex">Browse Plants</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {wishlistPlants.map((plant, i) => (
            <motion.div key={plant.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
              className="flex gap-3 bg-bg-2 border border-white/5 hover:border-green/20 rounded-2xl p-4 transition-all group"
            >
              <img src={plant.image} alt={plant.name} className="w-20 h-20 rounded-xl object-cover flex-shrink-0 group-hover:scale-105 transition-transform duration-300" />
              <div className="flex-1 min-w-0">
                <p className="text-slate-500 text-xs mb-0.5">{plant.category}</p>
                <p className="text-white font-semibold text-sm">{plant.name}</p>
                <p className="text-green font-bold text-sm mt-1">₹{plant.price.toLocaleString()}</p>
                <div className="flex gap-2 mt-2">
                  <button onClick={() => addItem(plant, 1)}
                    className="text-xs bg-green/10 hover:bg-green text-green hover:text-bg border border-green/30 hover:border-transparent px-2.5 py-1 rounded-lg font-medium transition-all">
                    Add to Cart
                  </button>
                  <button className="text-xs text-slate-500 hover:text-red-400 transition-colors p-1">
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── Settings Tab ─────────────────────────────────────────────────────────────
function SettingsTab({ user, updateUser, logout }) {
  const [notifications, setNotifications] = useState({ orders: true, offers: true, newsletter: false, whatsapp: true })
  const toggle = k => setNotifications(n => ({ ...n, [k]: !n[k] }))

  const Toggle = ({ k }) => (
    <button onClick={() => toggle(k)} className={`w-11 h-6 rounded-full transition-all duration-300 relative flex-shrink-0 ${notifications[k] ? 'bg-green' : 'bg-white/10'}`}>
      <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all duration-300 ${notifications[k] ? 'left-[calc(100%-22px)]' : 'left-0.5'}`} />
    </button>
  )

  return (
    <div className="space-y-5">
      {/* Notifications */}
      <div className="bg-bg-2 border border-white/5 rounded-2xl p-5">
        <h3 className="font-semibold text-white text-sm mb-4 flex items-center gap-2"><Bell size={14} className="text-green" /> Notifications</h3>
        <div className="space-y-4">
          {[
            { key: 'orders',     label: 'Order updates',      sub: 'Shipping, delivery status' },
            { key: 'offers',     label: 'Offers & discounts',  sub: 'Exclusive deals for you' },
            { key: 'newsletter', label: 'Plant newsletter',   sub: 'Weekly tips and new arrivals' },
            { key: 'whatsapp',   label: 'WhatsApp alerts',    sub: 'Fast updates via WhatsApp' },
          ].map(({ key, label, sub }) => (
            <div key={key} className="flex items-center justify-between gap-3">
              <div>
                <p className="text-white text-sm font-medium">{label}</p>
                <p className="text-slate-500 text-xs">{sub}</p>
              </div>
              <Toggle k={key} />
            </div>
          ))}
        </div>
      </div>

      {/* Account */}
      <div className="bg-bg-2 border border-white/5 rounded-2xl p-5">
        <h3 className="font-semibold text-white text-sm mb-4 flex items-center gap-2"><Shield size={14} className="text-green" /> Account & Security</h3>
        <div className="space-y-2">
          {['Change Password', 'Two-Factor Authentication', 'Connected Accounts', 'Download My Data'].map(item => (
            <button key={item} className="w-full flex items-center justify-between p-3 hover:bg-white/5 rounded-xl transition-colors group">
              <span className="text-slate-300 text-sm group-hover:text-white transition-colors">{item}</span>
              <ChevronRight size={14} className="text-slate-600 group-hover:text-slate-400" />
            </button>
          ))}
        </div>
      </div>

      {/* Danger zone */}
      <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-5">
        <h3 className="font-semibold text-red-400 text-sm mb-3">Danger Zone</h3>
        <div className="flex gap-3 flex-wrap">
          <button onClick={logout} className="flex items-center gap-2 border border-red-500/30 text-red-400 hover:bg-red-500/10 text-sm px-4 py-2 rounded-xl transition-all font-medium">
            <LogOut size={13} /> Sign Out
          </button>
          <button className="flex items-center gap-2 border border-red-500/30 text-red-400 hover:bg-red-500/10 text-sm px-4 py-2 rounded-xl transition-all font-medium">
            <X size={13} /> Delete Account
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── MAIN PROFILE PAGE ────────────────────────────────────────────────────────
export default function Profile() {
  const [searchParams] = useSearchParams()
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'overview')
  const { user, updateUser, logout } = useAuth()

  useEffect(() => {
    const t = searchParams.get('tab')
    if (t) setActiveTab(t)
  }, [searchParams])

  if (!user) {
    return (
      <main className="min-h-screen bg-bg pt-28 flex items-center justify-center px-5">
        <div className="text-center max-w-sm">
          <div className="text-5xl mb-4">🌿</div>
          <h2 className="font-display text-2xl font-black mb-3">Please <em className="text-green italic">Sign In</em></h2>
          <p className="text-slate-400 text-sm mb-6">Login to view your profile, orders and wishlist.</p>
          <Link to="/" className="btn-primary">Back to Home</Link>
        </div>
      </main>
    )
  }

  const tabContent = {
    overview:  <OverviewTab user={user} updateUser={updateUser} />,
    orders:    <OrdersTab />,
    addresses: <AddressesTab />,
    wishlist:  <WishlistTab />,
    settings:  <SettingsTab user={user} updateUser={updateUser} logout={logout} />,
  }

  return (
    <main className="min-h-screen bg-bg pt-24 pb-20">
      {/* Header */}
      <div className="bg-bg-3 border-b border-white/5 py-10 px-[5%]">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <div className="flex items-center gap-4">
              <Avatar user={user} size={52} />
              <div>
                <h1 className="font-display text-3xl font-black">
                  Welcome back, <em className="text-green italic">{user.name?.split(' ')[0]}</em>
                </h1>
                <p className="text-slate-400 text-sm">{user.email}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-[5%] py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar tabs */}
          <div className="lg:w-56 flex-shrink-0">
            <nav className="space-y-1 bg-bg-2 border border-white/5 rounded-2xl p-2 lg:sticky lg:top-28">
              {TABS.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all ${
                    activeTab === id
                      ? 'bg-green/15 text-green border border-green/30'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon size={15} className={activeTab === id ? 'text-green' : 'text-slate-500'} />
                  {label}
                  {activeTab === id && <div className="ml-auto w-1.5 h-1.5 bg-green rounded-full" />}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab content */}
          <div className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                {tabContent[activeTab]}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </main>
  )
}