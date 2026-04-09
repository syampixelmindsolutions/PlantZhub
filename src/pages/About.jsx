import { motion } from 'framer-motion'
import { Leaf, Award, Globe, Heart } from 'lucide-react'
import Reveal from '../components/Reveal'

const team = [
  { name: 'Kavya Reddy', role: 'Co-founder & Head Botanist', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80', bio: 'MSc Botany from IISc. 12 years of plant science expertise.' },
  { name: 'Rohan Sharma', role: 'Co-founder & Design Lead', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80', bio: 'Former Zomato designer. Obsessed with creating beautiful experiences.' },
  { name: 'Meera Pillai', role: 'Chief Plant Curator', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80', bio: 'Travels the world sourcing the rarest and most beautiful plant varieties.' },
  { name: 'Aarav Patel', role: 'Head of Sustainability', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80', bio: 'Environmental engineer ensuring every shipment is carbon neutral.' },
]

const milestones = [
  { year: '2020', event: 'Founded in Hyderabad with just 12 plant varieties' },
  { year: '2021', event: 'Reached 1,000 customers and launched nationwide delivery' },
  { year: '2022', event: 'Introduced rare tropical collection, 50+ species' },
  { year: '2023', event: 'Became India\'s highest-rated plant boutique (4.9★)' },
  { year: '2024', event: '15,000+ happy plant parents, 200+ varieties' },
  { year: '2025', event: 'Launched corporate greening & interior design services' },
]

const values = [
  { Icon: Leaf, title: 'Plant-First Philosophy', desc: 'Every decision we make starts with the question: is this good for the plant? That\'s why our quality is unmatched.' },
  { Icon: Heart, title: 'Community Love', desc: 'We\'re building India\'s most passionate community of plant lovers. Our botanists are always one message away.' },
  { Icon: Globe, title: 'Eco Responsibility', desc: 'Carbon-neutral shipping, biodegradable packaging, and ethically sourced plants from sustainable nurseries.' },
  { Icon: Award, title: 'Excellence Always', desc: 'We\'d rather send nothing than send a plant that isn\'t perfect. Our 7-day freshness guarantee is our promise.' },
]

export default function About() {
  return (
    <main className="min-h-screen bg-bg pt-24">
      {/* Hero */}
      <section className="relative py-24 px-[5%] overflow-hidden">
        <div className="orb w-[500px] h-[500px] bg-green/8 top-[-200px] right-0 animate-float" />
        <div className="orb w-[300px] h-[300px] bg-green/5 bottom-0 left-0 animate-float-slow" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <Reveal>
              <p className="section-tag">Our Story</p>
              <h1 className="font-display text-5xl md:text-6xl font-black leading-tight mb-6">
                Born from a Love of{' '}
                <em className="text-green italic">Living Things</em>
              </h1>
              <p className="text-slate-300 text-lg leading-relaxed mb-6">
                GreenCO began in 2020 when Kavya and Rohan — a botanist and a designer — got tired of seeing beautiful plants sold in sad conditions. They believed plants deserved better: expert curation, thoughtful packaging, and real care guidance.
              </p>
              <p className="text-slate-400 leading-relaxed">
                What started as a small operation from a Hyderabad apartment balcony has grown into India's most trusted premium plant boutique, shipping 200+ curated varieties to 15,000+ plant lovers nationwide.
              </p>
            </Reveal>
            <Reveal direction="left">
              <div className="relative rounded-3xl overflow-hidden aspect-square">
                <img
                  src="https://images.unsplash.com/photo-1463154545680-d59320fd685d?w=800&q=80"
                  alt="GreenCO founders"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg/50 to-transparent" />
                <div className="absolute bottom-6 left-6 glass rounded-2xl p-4">
                  <p className="text-white font-bold text-lg">Est. 2020</p>
                  <p className="text-slate-400 text-sm">Hyderabad, India 🇮🇳</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-[5%] bg-bg-2">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <Reveal>
              <p className="section-tag justify-center">What We Stand For</p>
              <h2 className="section-title">Our <em className="text-green italic">Values</em></h2>
            </Reveal>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map(({ Icon, title, desc }, i) => (
              <Reveal key={title} delay={i * 0.1}>
                <div className="group bg-white/[0.03] border border-white/5 hover:border-green/30 rounded-2xl p-6 transition-all duration-400 hover:-translate-y-1 h-full">
                  <div className="w-11 h-11 bg-green/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-green/20 transition-colors">
                    <Icon size={20} className="text-green" />
                  </div>
                  <h3 className="font-semibold text-white mb-2">{title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 px-[5%] bg-bg">
        <div className="max-w-3xl mx-auto">
          <Reveal>
            <p className="section-tag justify-center">Our Journey</p>
            <h2 className="section-title text-center mb-14">
              Growing <em className="text-green italic">Together</em>
            </h2>
          </Reveal>
          <div className="relative">
            <div className="absolute left-[72px] top-0 bottom-0 w-px bg-white/5" />
            <div className="space-y-6">
              {milestones.map(({ year, event }, i) => (
                <Reveal key={year} delay={i * 0.08}>
                  <div className="flex gap-6 items-start">
                    <div className="w-[72px] flex-shrink-0 text-right">
                      <span className="text-green font-display font-bold text-lg">{year}</span>
                    </div>
                    <div className="w-3 h-3 mt-1.5 flex-shrink-0 bg-green rounded-full border-2 border-bg shadow-[0_0_10px_rgba(34,197,94,0.5)] relative z-10" />
                    <p className="text-slate-300 pt-0.5 leading-relaxed">{event}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 px-[5%] bg-bg-2">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <Reveal>
              <p className="section-tag justify-center">The People</p>
              <h2 className="section-title">Meet Our <em className="text-green italic">Team</em></h2>
            </Reveal>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {team.map((member, i) => (
              <Reveal key={member.name} delay={i * 0.1}>
                <div className="group bg-white/[0.03] border border-white/5 hover:border-green/20 rounded-2xl overflow-hidden transition-all duration-400 hover:-translate-y-1">
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-semibold text-white mb-0.5">{member.name}</h3>
                    <p className="text-green text-xs font-medium mb-2">{member.role}</p>
                    <p className="text-slate-400 text-sm leading-relaxed">{member.bio}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Stats banner */}
      <section className="py-16 px-[5%] bg-bg">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { num: '200+', label: 'Plant Varieties' },
            { num: '15K+', label: 'Happy Customers' },
            { num: '4.9★', label: 'Average Rating' },
            { num: '100%', label: 'Eco Packaging' },
          ].map(({ num, label }, i) => (
            <Reveal key={label} delay={i * 0.1}>
              <div className="text-center p-6 bg-white/[0.03] border border-white/5 rounded-2xl">
                <div className="font-display text-3xl font-black text-green mb-1">{num}</div>
                <div className="text-slate-400 text-sm">{label}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  )
}
