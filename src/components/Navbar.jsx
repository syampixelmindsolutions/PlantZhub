import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, Menu, X, Leaf } from 'lucide-react'

const links = [
  { label: 'Home', to: '/' },
  { label: 'Shop', to: '/shop' },
  { label: 'About', to: '/about' },
  { label: 'Blog', to: '/blog' },
  { label: 'Contact', to: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false) }, [pathname])

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-[5%] transition-all duration-500 ${
          scrolled
            ? 'py-3 bg-bg-3/90 backdrop-blur-xl border-b border-white/5 shadow-2xl'
            : 'py-5'
        }`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      >
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-green rounded-[60%_0_60%_0] flex items-center justify-center group-hover:shadow-[0_0_20px_rgba(34,197,94,0.5)] transition-shadow duration-300">
            <Leaf size={14} className="text-bg" strokeWidth={2.5} />
          </div>
          <span className="font-display text-xl font-black tracking-tight">
            Green<span className="text-green">CO</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map(({ label, to }) => (
            <li key={to}>
              <Link
                to={to}
                className={`text-sm font-medium transition-colors duration-200 hover-underline ${
                  pathname === to ? 'text-green' : 'text-slate-400 hover:text-white'
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Link to="/shop" className="relative p-2 text-slate-400 hover:text-white transition-colors">
            <ShoppingBag size={20} />
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-green text-bg text-[9px] font-bold rounded-full flex items-center justify-center">3</span>
          </Link>
          <Link
            to="/shop"
            className="bg-green text-bg text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-green-light hover:shadow-[0_0_20px_rgba(34,197,94,0.4)] transition-all duration-300 hover:-translate-y-0.5"
          >
            Shop Now
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-white"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-bg-3/98 backdrop-blur-2xl flex flex-col items-center justify-center gap-8 md:hidden"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {links.map(({ label, to }, i) => (
              <motion.div
                key={to}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.07 }}
              >
                <Link
                  to={to}
                  className={`font-display text-3xl font-bold hover:text-green transition-colors ${
                    pathname === to ? 'text-green' : 'text-white'
                  }`}
                >
                  {label}
                </Link>
              </motion.div>
            ))}
            <Link to="/shop" className="btn-primary mt-4">
              Shop Now
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
