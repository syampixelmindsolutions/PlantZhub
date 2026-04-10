import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Mail, Lock, User, Phone, Eye, EyeOff, Leaf, Check } from 'lucide-react'
import { useAuth } from '../context/AppContext'

export default function AuthModal({ open, onClose }) {
  const { login } = useAuth()
  const [mode, setMode]         = useState('login') // 'login' | 'signup' | 'otp'
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading]   = useState(false)
  const [step, setStep]         = useState(1)       // otp step
  const [form, setForm]         = useState({ name: '', email: '', phone: '', password: '', otp: '' })
  const [errors, setErrors]     = useState({})

  const set = (k) => (e) => { setForm(f => ({ ...f, [k]: e.target.value })); setErrors(er => ({ ...er, [k]: '' })) }

  const validate = () => {
    const e = {}
    if (mode === 'signup' && !form.name.trim())  e.name     = 'Name is required'
    if (!form.email.includes('@'))               e.email    = 'Valid email required'
    if (form.password.length < 6)               e.password = 'Min 6 characters'
    if (mode === 'signup' && form.phone.length < 10) e.phone = 'Valid phone required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    await new Promise(r => setTimeout(r, 1200))
    setLoading(false)
    // Simulate login
    login({
      name:    form.name  || form.email.split('@')[0],
      email:   form.email,
      phone:   form.phone,
      avatar:  null,
      address: [],
      orders:  [],
    })
    onClose()
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[200]"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-bg-3 border-l border-white/8 z-[201] flex flex-col overflow-y-auto"
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 26, stiffness: 260 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-7 py-6 border-b border-white/5">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 bg-green rounded-[60%_0_60%_0] flex items-center justify-center">
                  <Leaf size={12} className="text-bg" strokeWidth={2.5} />
                </div>
                <span className="font-display font-black text-lg">Green<span className="text-green">CO</span></span>
              </div>
              <button onClick={onClose} className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-white transition-colors rounded-lg hover:bg-white/5">
                <X size={18} />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 px-7 py-8">
              {/* Mode tabs */}
              <div className="flex bg-white/5 rounded-xl p-1 mb-8">
                {[['login','Sign In'], ['signup','Create Account']].map(([m, label]) => (
                  <button
                    key={m}
                    onClick={() => { setMode(m); setErrors({}) }}
                    className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${mode === m ? 'bg-green text-bg shadow-lg' : 'text-slate-400 hover:text-white'}`}
                  >
                    {label}
                  </button>
                ))}
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name (signup only) */}
                <AnimatePresence>
                  {mode === 'signup' && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                      <label className="block text-xs text-slate-400 font-semibold mb-1.5 uppercase tracking-widest">Full Name</label>
                      <div className="relative">
                        <User size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                        <input value={form.name} onChange={set('name')} placeholder="Ananya Sharma" className={`input pl-9 text-sm w-full ${errors.name ? 'border-red-500/60' : ''}`} />
                      </div>
                      {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Email */}
                <div>
                  <label className="block text-xs text-slate-400 font-semibold mb-1.5 uppercase tracking-widest">Email Address</label>
                  <div className="relative">
                    <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input type="email" value={form.email} onChange={set('email')} placeholder="you@example.com" className={`input pl-9 text-sm w-full ${errors.email ? 'border-red-500/60' : ''}`} />
                  </div>
                  {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                </div>

                {/* Phone (signup) */}
                <AnimatePresence>
                  {mode === 'signup' && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                      <label className="block text-xs text-slate-400 font-semibold mb-1.5 uppercase tracking-widest">WhatsApp / Phone</label>
                      <div className="relative flex gap-2">
                        <span className="input w-14 text-sm text-center flex-shrink-0 flex items-center justify-center text-slate-400">+91</span>
                        <input type="tel" value={form.phone} onChange={set('phone')} placeholder="98765 43210" className={`input flex-1 text-sm ${errors.phone ? 'border-red-500/60' : ''}`} />
                      </div>
                      {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Password */}
                <div>
                  <label className="block text-xs text-slate-400 font-semibold mb-1.5 uppercase tracking-widest">Password</label>
                  <div className="relative">
                    <Lock size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
                    <input type={showPass ? 'text' : 'password'} value={form.password} onChange={set('password')} placeholder="••••••••" className={`input pl-9 pr-10 text-sm w-full ${errors.password ? 'border-red-500/60' : ''}`} />
                    <button type="button" onClick={() => setShowPass(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors">
                      {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
                    </button>
                  </div>
                  {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
                </div>

                {/* Forgot password */}
                {mode === 'login' && (
                  <div className="text-right">
                    <button type="button" className="text-xs text-green hover:text-green-light transition-colors">Forgot password?</button>
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-green text-bg font-bold py-3.5 rounded-xl hover:bg-green-light hover:shadow-[0_0_25px_rgba(34,197,94,0.4)] transition-all duration-300 flex items-center justify-center gap-2 text-sm mt-2"
                >
                  {loading ? (
                    <><div className="w-4 h-4 border-2 border-bg/30 border-t-bg rounded-full animate-spin" /> Please wait...</>
                  ) : mode === 'login' ? 'Sign In to GreenCO' : 'Create My Account'}
                </button>

                {/* Divider */}
                <div className="flex items-center gap-3 my-4">
                  <div className="flex-1 h-px bg-white/10" />
                  <span className="text-slate-600 text-xs">or continue with</span>
                  <div className="flex-1 h-px bg-white/10" />
                </div>

                {/* Google / Phone */}
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { icon: '🔍', label: 'Google' },
                    { icon: '📱', label: 'OTP Login' },
                  ].map(({ icon, label }) => (
                    <button key={label} type="button"
                      className="flex items-center justify-center gap-2 border border-white/10 hover:border-green/30 text-slate-400 hover:text-white text-sm py-2.5 rounded-xl transition-all font-medium"
                    >
                      {icon} {label}
                    </button>
                  ))}
                </div>
              </form>
            </div>

            {/* Footer note */}
            <div className="px-7 pb-6 text-center">
              <p className="text-slate-600 text-xs">
                By continuing you agree to our{' '}
                <span className="text-green cursor-pointer hover:text-green-light">Terms</span> &{' '}
                <span className="text-green cursor-pointer hover:text-green-light">Privacy Policy</span>
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}