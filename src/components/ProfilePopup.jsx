import { useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { User, Package, MapPin, Heart, LogOut, ChevronRight, Star, Settings } from 'lucide-react'
import { useAuth } from '../context/AppContext'

function Avatar({ user, size = 32 }) {
  const initials = (user?.name || 'U').split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
  if (user?.avatar) {
    return <img src={user.avatar} alt={user.name} className="rounded-full object-cover" style={{ width: size, height: size }} />
  }
  return (
    <div
      className="rounded-full bg-gradient-to-br from-green/80 to-green-dark flex items-center justify-center font-bold text-bg"
      style={{ width: size, height: size, fontSize: size * 0.35 }}
    >
      {initials}
    </div>
  )
}

const menuItems = [
  { icon: User,    label: 'My Profile',   to: '/profile' },
  { icon: Package, label: 'My Orders',    to: '/profile?tab=orders' },
  { icon: MapPin,  label: 'Addresses',    to: '/profile?tab=addresses' },
  { icon: Heart,   label: 'Wishlist',     to: '/profile?tab=wishlist' },
  { icon: Settings,label: 'Settings',    to: '/profile?tab=settings' },
]

export default function ProfilePopup({ open, onClose, onOpenAuth }) {
  const { user, logout } = useAuth()
  const ref = useRef(null)

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) onClose() }
    if (open) document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open, onClose])

  return (
    <div ref={ref} className="relative">
      <AnimatePresence>
        {open && user && (
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: -8 }}
            transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
            className="absolute right-0 top-full mt-3 w-72 bg-bg-3/95 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] overflow-hidden z-[300]"
          >
            {/* Profile header */}
            <div className="px-5 py-5 bg-gradient-to-br from-green/10 to-transparent border-b border-white/5">
              <div className="flex items-center gap-3 mb-3">
                <Avatar user={user} size={44} />
                <div className="flex-1 min-w-0">
                  <p className="text-white font-semibold text-sm truncate">{user.name}</p>
                  <p className="text-slate-400 text-xs truncate">{user.email}</p>
                </div>
              </div>
              {/* Mini stats */}
              <div className="flex gap-3">
                {[
                  { label: 'Orders', val: user.orders?.length || 0 },
                  { label: 'Points', val: '240 pts' },
                  { label: 'Member', val: 'Green+' },
                ].map(({ label, val }) => (
                  <div key={label} className="flex-1 bg-white/5 rounded-xl px-2 py-2 text-center">
                    <p className="text-green font-bold text-sm">{val}</p>
                    <p className="text-slate-500 text-[10px]">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Menu items */}
            <div className="py-2">
              {menuItems.map(({ icon: Icon, label, to }) => (
                <Link
                  key={label}
                  to={to}
                  onClick={onClose}
                  className="flex items-center gap-3 px-5 py-3 hover:bg-white/5 transition-colors group"
                >
                  <div className="w-8 h-8 bg-white/5 group-hover:bg-green/15 rounded-lg flex items-center justify-center transition-colors">
                    <Icon size={14} className="text-slate-400 group-hover:text-green transition-colors" />
                  </div>
                  <span className="text-slate-300 text-sm group-hover:text-white transition-colors flex-1">{label}</span>
                  <ChevronRight size={12} className="text-slate-600 group-hover:text-slate-400 transition-colors" />
                </Link>
              ))}
            </div>

            {/* View profile CTA */}
            <div className="px-4 py-3 border-t border-white/5">
              <Link
                to="/profile"
                onClick={onClose}
                className="flex items-center justify-center gap-2 w-full bg-green/10 hover:bg-green/20 border border-green/30 text-green text-sm font-semibold py-2.5 rounded-xl transition-all duration-200 mb-2"
              >
                <User size={14} /> View Full Profile
              </Link>
              <button
                onClick={() => { logout(); onClose() }}
                className="flex items-center justify-center gap-2 w-full hover:bg-red-500/10 border border-transparent hover:border-red-500/20 text-slate-500 hover:text-red-400 text-sm py-2 rounded-xl transition-all duration-200"
              >
                <LogOut size={13} /> Sign Out
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// Export Avatar for reuse
export { Avatar }