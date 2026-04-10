import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, Menu, X, Leaf, FileText, LogIn } from 'lucide-react'
import { useAuth, useCart } from '../context/AppContext'
import AuthModal from '../components/AuthModel'
import ProfilePopup, { Avatar } from './ProfilePopup'

const links = [
  { label: 'Home',    to: '/' },
  { label: 'Shop',    to: '/shop' },
  { label: 'About',   to: '/about' },
  { label: 'Blog',    to: '/blog' },
  { label: 'Contact', to: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled]       = useState(false)
  const [mobileOpen, setMobileOpen]   = useState(false)
  const [authOpen, setAuthOpen]       = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const { pathname } = useLocation()
  const { user } = useAuth()
  const { count } = useCart()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMobileOpen(false) }, [pathname])

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-[5%] transition-all duration-500 ${
          scrolled ? 'py-3 bg-bg-3/90 backdrop-blur-xl border-b border-white/5 shadow-2xl' : 'py-5'
        }`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      >
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group flex-shrink-0">
          <div className="w-8 h-8 bg-green rounded-[60%_0_60%_0] flex items-center justify-center group-hover:shadow-[0_0_20px_rgba(34,197,94,0.5)] transition-shadow duration-300">
            <Leaf size={14} className="text-bg" strokeWidth={2.5} />
          </div>
          <span className="font-display text-xl font-black tracking-tight">Green<span className="text-green">CO</span></span>
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-5 lg:gap-8">
          {links.map(({ label, to }) => (
            <li key={to}>
              <Link to={to} className={`text-sm font-medium transition-colors duration-200 hover-underline ${pathname === to ? 'text-green' : 'text-slate-400 hover:text-white'}`}>
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop Right */}
        <div className="hidden md:flex items-center gap-2 lg:gap-3 flex-shrink-0">
          {/* Get Quote */}
          <Link to="/get-quote"
            className={`relative flex items-center gap-1.5 text-sm font-bold px-4 py-2.5 rounded-full transition-all duration-300 overflow-hidden group ${
              pathname === '/get-quote'
                ? 'bg-amber-400 text-bg shadow-[0_0_24px_rgba(251,191,36,0.45)]'
                : 'border border-amber-400/60 text-amber-300 hover:bg-amber-400/10 hover:border-amber-400'
            }`}
          >
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-amber-300/20 to-transparent transition-transform duration-700" />
            <FileText size={14} />
            <span className="hidden lg:inline">Get Quote</span>
            <span className="lg:hidden">Quote</span>
          </Link>

          {/* Cart */}
          <Link to="/cart" className="relative p-2 text-slate-400 hover:text-white transition-colors">
            <ShoppingBag size={20} />
            <AnimatePresence>
              {count > 0 && (
                <motion.span key={count} initial={{ scale: 0.5 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                  className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-green text-bg text-[9px] font-bold rounded-full flex items-center justify-center"
                >
                  {count > 9 ? '9+' : count}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>

          {/* Auth */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setProfileOpen(v => !v)}
                className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-full border border-white/10 hover:border-green/40 transition-all group"
              >
                <Avatar user={user} size={28} />
                <span className="text-sm text-slate-300 group-hover:text-white font-medium hidden lg:block max-w-[80px] truncate">
                  {user.name?.split(' ')[0]}
                </span>
              </button>
              <ProfilePopup open={profileOpen} onClose={() => setProfileOpen(false)} />
            </div>
          ) : (
            <button
              onClick={() => setAuthOpen(true)}
              className="flex items-center gap-1.5 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white text-sm font-semibold px-4 py-2.5 rounded-full transition-all"
            >
              <LogIn size={14} /> Login
            </button>
          )}

          {/* Shop Now */}
          <Link to="/shop" className="bg-green text-bg text-sm font-semibold px-4 lg:px-5 py-2.5 rounded-full hover:bg-green-light hover:shadow-[0_0_20px_rgba(34,197,94,0.4)] transition-all duration-300 hover:-translate-y-0.5 whitespace-nowrap">
            Shop Now
          </Link>
        </div>

        {/* Mobile right */}
        <div className="md:hidden flex items-center gap-2">
          <Link to="/cart" className="relative p-2 text-slate-400">
            <ShoppingBag size={20} />
            {count > 0 && <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-green text-bg text-[9px] font-bold rounded-full flex items-center justify-center">{count}</span>}
          </Link>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2 text-white">
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-bg-3/98 backdrop-blur-2xl flex flex-col items-center justify-center gap-6 md:hidden"
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
          >
            {user && (
              <div className="flex items-center gap-3 bg-white/5 px-6 py-3 rounded-2xl border border-white/10 mb-2">
                <Avatar user={user} size={36} />
                <div><p className="text-white font-semibold text-sm">{user.name}</p><p className="text-slate-400 text-xs">{user.email}</p></div>
              </div>
            )}
            {links.map(({ label, to }, i) => (
              <motion.div key={to} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
                <Link to={to} className={`font-display text-3xl font-bold hover:text-green transition-colors ${pathname === to ? 'text-green' : 'text-white'}`}>{label}</Link>
              </motion.div>
            ))}
            <Link to="/get-quote" className="border border-amber-400/60 text-amber-300 font-bold text-lg px-6 py-3 rounded-full hover:bg-amber-400/10 transition-all flex items-center gap-2">
              <FileText size={18} /> Get Quote
            </Link>
            {user
              ? <Link to="/profile" className="btn-outline">My Profile</Link>
              : <button onClick={() => { setMobileOpen(false); setAuthOpen(true) }} className="btn-outline flex items-center gap-2"><LogIn size={16} /> Login / Sign Up</button>
            }
            <Link to="/shop" className="btn-primary mt-2">Shop Now</Link>
          </motion.div>
        )}
      </AnimatePresence>

      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  )
}