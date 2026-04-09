import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Leaf, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react'

const footerLinks = {
  Shop: [
    { label: 'Indoor Plants', to: '/shop?cat=indoor' },
    { label: 'Outdoor Plants', to: '/shop?cat=outdoor' },
    { label: 'Succulents', to: '/shop?cat=succulents' },
    { label: 'Flowering Plants', to: '/shop?cat=flowering' },
    { label: 'Trees & Palms', to: '/shop?cat=trees' },
  ],
  Company: [
    { label: 'About Us', to: '/about' },
    { label: 'Blog', to: '/blog' },
    { label: 'Careers', to: '/about' },
    { label: 'Press', to: '/about' },
  ],
  Support: [
    { label: 'Plant Care Guides', to: '/blog' },
    { label: 'Track Order', to: '/contact' },
    { label: 'Returns', to: '/contact' },
    { label: 'Contact Us', to: '/contact' },
  ],
}

export default function Footer() {
  return (
    <footer className="relative bg-bg-3 border-t border-white/5 overflow-hidden">
      {/* Decorative orb */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-green/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-[5%] pt-20 pb-8">
        {/* Top row */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-green rounded-[60%_0_60%_0] flex items-center justify-center">
                <Leaf size={14} className="text-bg" strokeWidth={2.5} />
              </div>
              <span className="font-display text-xl font-black">
                Green<span className="text-green">CO</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-xs">
              India's most loved premium plant boutique. Bringing nature's finest specimens to your home with expert care and conscious practices.
            </p>
            {/* Contact */}
            <div className="space-y-2">
              {[
                { Icon: Mail, text: 'hello@greenco.in' },
                { Icon: Phone, text: '+91 98765 43210' },
                { Icon: MapPin, text: 'Hyderabad, Telangana' },
              ].map(({ Icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-sm text-slate-400 hover:text-green transition-colors">
                  <Icon size={14} className="text-green flex-shrink-0" />
                  {text}
                </div>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold text-white mb-4 tracking-wider uppercase">{title}</h4>
              <ul className="space-y-2.5">
                {links.map(({ label, to }) => (
                  <li key={label}>
                    <Link
                      to={to}
                      className="text-sm text-slate-400 hover:text-green transition-colors hover-underline"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-6 md:p-8 mb-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-display text-xl font-bold mb-1">
              Join our <span className="text-green italic">Green</span> community
            </h3>
            <p className="text-slate-400 text-sm">Plant tips, new arrivals, and exclusive offers.</p>
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <input
              type="email"
              placeholder="your@email.com"
              className="input flex-1 md:w-64 text-sm py-2.5"
            />
            <button className="bg-green text-bg font-semibold text-sm px-5 py-2.5 rounded-xl hover:bg-green-light transition-colors whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6 border-t border-white/5">
          <p className="text-slate-500 text-xs">
            © 2025 GreenCO. Crafted with 🌿 in Hyderabad, India
          </p>
          <div className="flex items-center gap-4">
            {[Instagram, Twitter, Youtube].map((Icon, i) => (
              <a key={i} href="#" className="w-8 h-8 bg-white/5 hover:bg-green/20 border border-white/10 hover:border-green/40 rounded-full flex items-center justify-center text-slate-400 hover:text-green transition-all duration-300">
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
