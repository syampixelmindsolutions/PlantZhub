import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Clock, Send, Check } from 'lucide-react'
import Reveal from '../components/Reveal'

const contactInfo = [
  { Icon: Mail, label: 'Email Us', value: 'hello@greenco.in', sub: 'We reply within 2 hours' },
  { Icon: Phone, label: 'Call Us', value: '+91 98765 43210', sub: 'Mon–Sat, 9am–6pm IST' },
  { Icon: MapPin, label: 'Visit Us', value: 'Jubilee Hills, Hyderabad', sub: 'Telangana 500033, India' },
  { Icon: Clock, label: 'Working Hours', value: 'Mon – Sat', sub: '9:00am – 6:00pm IST' },
]

const faqs = [
  { q: 'How long does delivery take?', a: 'We deliver within 24–48 hours in Hyderabad and 2–5 business days across India.' },
  { q: 'What if my plant arrives damaged?', a: 'We offer a 7-day freshness guarantee. Simply send us a photo and we\'ll replace it immediately.' },
  { q: 'Do you do bulk/corporate orders?', a: 'Absolutely! We love working with offices, hotels, and interior designers. Email us for a custom quote.' },
  { q: 'Can I return a plant?', a: 'Yes, within 7 days of delivery if the plant is unhealthy. We make returns easy and hassle-free.' },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 1500))
    setLoading(false)
    setSent(true)
    setTimeout(() => setSent(false), 4000)
    setForm({ name: '', email: '', subject: '', message: '' })
  }

  return (
    <main className="min-h-screen bg-bg pt-24">
      {/* Header */}
      <section className="relative py-20 px-[5%] bg-bg-3 border-b border-white/5 overflow-hidden">
        <div className="orb w-80 h-80 bg-green/8 top-[-80px] right-0 animate-float" />
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <Reveal>
            <p className="section-tag justify-center">Get in Touch</p>
            <h1 className="font-display text-5xl md:text-6xl font-black mb-4">
              Let's <em className="text-green italic">Talk Plants</em>
            </h1>
            <p className="text-slate-400 max-w-xl mx-auto">
              Questions about an order, need planting advice, or want to discuss a bulk order? Our botanists are here to help.
            </p>
          </Reveal>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-[5%] py-16">
        {/* Contact cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {contactInfo.map(({ Icon, label, value, sub }, i) => (
            <Reveal key={label} delay={i * 0.08}>
              <div className="group bg-white/[0.03] border border-white/5 hover:border-green/30 rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1">
                <div className="w-10 h-10 bg-green/10 group-hover:bg-green/20 rounded-xl flex items-center justify-center mb-3 transition-colors">
                  <Icon size={18} className="text-green" />
                </div>
                <p className="text-slate-400 text-xs mb-1 font-medium">{label}</p>
                <p className="text-white font-semibold text-sm mb-0.5">{value}</p>
                <p className="text-slate-500 text-xs">{sub}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Form + FAQ */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Contact Form */}
          <div className="lg:col-span-3">
            <Reveal>
              <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-8">
                <h2 className="font-display text-2xl font-bold mb-6">
                  Send Us a <em className="text-green italic">Message</em>
                </h2>

                {sent && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-3 bg-green/10 border border-green/30 text-green px-4 py-3 rounded-xl mb-5 text-sm font-medium"
                  >
                    <Check size={16} strokeWidth={3} />
                    Message sent! We'll get back to you within 2 hours.
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs text-slate-400 font-medium mb-1.5">Your Name</label>
                      <input
                        type="text"
                        required
                        placeholder="Ananya Iyer"
                        value={form.name}
                        onChange={e => setForm({...form, name: e.target.value})}
                        className="input text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-slate-400 font-medium mb-1.5">Email Address</label>
                      <input
                        type="email"
                        required
                        placeholder="ananya@example.com"
                        value={form.email}
                        onChange={e => setForm({...form, email: e.target.value})}
                        className="input text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 font-medium mb-1.5">Subject</label>
                    <select
                      value={form.subject}
                      onChange={e => setForm({...form, subject: e.target.value})}
                      className="input text-sm cursor-pointer"
                    >
                      <option value="" className="bg-bg-2">Select a topic</option>
                      <option value="order" className="bg-bg-2">Order Enquiry</option>
                      <option value="care" className="bg-bg-2">Plant Care Advice</option>
                      <option value="bulk" className="bg-bg-2">Bulk / Corporate Order</option>
                      <option value="return" className="bg-bg-2">Return / Refund</option>
                      <option value="other" className="bg-bg-2">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-slate-400 font-medium mb-1.5">Message</label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Tell us how we can help you..."
                      value={form.message}
                      onChange={e => setForm({...form, message: e.target.value})}
                      className="input text-sm resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary w-full justify-center py-3.5 text-sm"
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-bg/30 border-t-bg rounded-full animate-spin" />
                        Sending...
                      </span>
                    ) : (
                      <><Send size={15} /> Send Message</>
                    )}
                  </button>
                </form>
              </div>
            </Reveal>
          </div>

          {/* FAQ */}
          <div className="lg:col-span-2">
            <Reveal delay={0.2}>
              <h2 className="font-display text-2xl font-bold mb-6">
                Common <em className="text-green italic">Questions</em>
              </h2>
              <div className="space-y-3">
                {faqs.map(({ q, a }, i) => (
                  <motion.div
                    key={q}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white/[0.03] border border-white/5 rounded-2xl p-5"
                  >
                    <h4 className="text-white font-semibold text-sm mb-2">{q}</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">{a}</p>
                  </motion.div>
                ))}
              </div>

              {/* Map placeholder */}
              <div className="mt-6 rounded-2xl overflow-hidden border border-white/5 aspect-video bg-bg-2 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl mb-2">🗺️</div>
                  <p className="text-slate-400 text-sm">Jubilee Hills, Hyderabad</p>
                  <p className="text-slate-500 text-xs">Telangana, India</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </main>
  )
}
