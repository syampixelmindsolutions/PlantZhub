import { useState } from 'react'
import { motion } from 'framer-motion'
import { Clock, ArrowRight } from 'lucide-react'
import Reveal from '../components/Reveal'
import { blogs } from '../data/plants'

// Extended blog list
const allPosts = [
  ...blogs,
  {
    id: 4,
    title: 'How to Build a Thriving Balcony Garden',
    excerpt: 'Turn even the smallest urban balcony into a lush garden retreat. Practical tips for container gardening, vertical space, and plant selection.',
    category: 'Gardening',
    date: 'February 20, 2025',
    readTime: '7 min',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80',
    author: { name: 'Aryan Kapoor', role: 'Garden Designer', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&q=80' },
  },
  {
    id: 5,
    title: 'The Complete Guide to Succulents & Cacti',
    excerpt: 'Why succulents are the perfect plants for modern living — low maintenance, high beauty. Everything from propagation to pots.',
    category: 'Plant Care',
    date: 'February 10, 2025',
    readTime: '5 min',
    image: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?w=800&q=80',
    author: { name: 'Priya Nambiar', role: 'Succulent Specialist', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&q=80' },
  },
  {
    id: 6,
    title: 'Corporate Greening: Why Every Office Needs Plants',
    excerpt: 'Research shows plants in offices increase productivity by 15% and reduce sick days. Here\'s how to green your workspace beautifully.',
    category: 'Lifestyle',
    date: 'January 28, 2025',
    readTime: '4 min',
    image: 'https://images.unsplash.com/photo-1545241047-6083a3684587?w=800&q=80',
    author: { name: 'Vikram Nair', role: 'Botanist', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&q=80' },
  },
]

const CATS = ['All', 'Plant Care', 'Interior Design', 'Wellness', 'Gardening', 'Lifestyle']

export default function Blog() {
  const [cat, setCat] = useState('All')
  const filtered = cat === 'All' ? allPosts : allPosts.filter(p => p.category === cat)
  const [featured, ...rest] = filtered

  return (
    <main className="min-h-screen bg-bg pt-24">
      {/* Header */}
      <section className="relative py-20 px-[5%] bg-bg-3 border-b border-white/5 overflow-hidden">
        <div className="orb w-96 h-96 bg-green/8 top-[-100px] right-0 animate-float" />
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <Reveal>
            <p className="section-tag justify-center">Garden Journal</p>
            <h1 className="font-display text-5xl md:text-6xl font-black mb-4">
              Plant <em className="text-green italic">Wisdom</em>
            </h1>
            <p className="text-slate-400 max-w-xl mx-auto">
              Expert guides, care tips, and inspiration from our team of botanists and plant stylists.
            </p>
          </Reveal>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-[5%] py-12">
        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-10 justify-center">
          {CATS.map(c => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`text-sm px-4 py-2 rounded-full border transition-all font-medium ${
                cat === c ? 'bg-green text-bg border-green' : 'border-white/10 text-slate-400 hover:border-green/40 hover:text-green'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Featured post */}
        {featured && (
          <Reveal>
            <div className="group relative rounded-3xl overflow-hidden mb-10 cursor-pointer">
              <div className="aspect-[21/9] md:aspect-[21/7] overflow-hidden">
                <img
                  src={featured.image}
                  alt={featured.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                <div className="flex items-center gap-3 mb-3">
                  <span className="bg-green/20 text-green border border-green/30 text-xs font-semibold px-3 py-1 rounded-full">
                    {featured.category}
                  </span>
                  <span className="text-slate-400 text-xs flex items-center gap-1">
                    <Clock size={11} /> {featured.readTime} read
                  </span>
                </div>
                <h2 className="font-display text-3xl md:text-4xl font-black text-white mb-3 max-w-2xl group-hover:text-green transition-colors">
                  {featured.title}
                </h2>
                <p className="text-slate-300 max-w-xl mb-5 hidden md:block">{featured.excerpt}</p>
                <div className="flex items-center gap-3">
                  <img src={featured.author.avatar} alt={featured.author.name} className="w-8 h-8 rounded-full object-cover" />
                  <span className="text-slate-300 text-sm">{featured.author.name} · {featured.date}</span>
                </div>
              </div>
            </div>
          </Reveal>
        )}

        {/* Post grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {rest.map((post, i) => (
            <Reveal key={post.id} delay={i * 0.08}>
              <div className="group card cursor-pointer hover:-translate-y-1 h-full flex flex-col">
                <div className="relative h-48 overflow-hidden flex-shrink-0">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <span className="absolute top-3 left-3 bg-green/20 text-green border border-green/30 text-xs font-semibold px-2.5 py-1 rounded-full backdrop-blur-sm">
                    {post.category}
                  </span>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-center gap-2 text-slate-500 text-xs mb-3">
                    <Clock size={11} />
                    <span>{post.readTime} read</span>
                    <span>·</span>
                    <span>{post.date}</span>
                  </div>
                  <h3 className="font-semibold text-white text-base leading-snug mb-3 group-hover:text-green transition-colors flex-1">
                    {post.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-2">
                      <img src={post.author.avatar} alt={post.author.name} className="w-6 h-6 rounded-full object-cover" />
                      <span className="text-slate-400 text-xs">{post.author.name}</span>
                    </div>
                    <span className="text-green text-xs flex items-center gap-1 group-hover:gap-2 transition-all">
                      Read <ArrowRight size={11} />
                    </span>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">📖</div>
            <p className="text-slate-400">No articles in this category yet.</p>
          </div>
        )}
      </div>
    </main>
  )
}
