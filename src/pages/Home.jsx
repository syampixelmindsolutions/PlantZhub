import { useEffect, useRef, useState } from 'react'
import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  ArrowRight, Play, Check, Quote, ChevronLeft, ChevronRight
} from 'lucide-react'
import PlantCard from '../components/PlantCard'
import Reveal from '../components/Reveal'
import {
  plants, shopCategories, plantTypes, categories,
  testimonials, services, whyUs, blogs, gallery
} from '../data/plants'
import { use } from 'react'

const styles = `
  @keyframes slideFade {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-20px); }
  }
  .animate-slide-fade {
    animation: slideFade 0.8s ease-out forwards;
  }
  .animate-float {
    animation: float 6s ease-in-out infinite;
  }
  .animate-float-slow {
    animation: float 8s ease-in-out infinite;
  }
`;

// ─── HERO ─────────────────────────────────────────────────────────────────────
function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const heroSlides = [
    {
      title: ["Bring Nature", "Into Your", "Living Space"],
      italicWord: 1,
      description: "200+ curated plants — from beloved Indian village classics to rare tropical exotics",
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1800&q=85",
      cta: "Explore Plants",
      tagline: "Premium Plant Boutique — Est. 2020",
      accent: "#7a9e7e"
    },
    {
      title: ["Village Classics", "Meet Modern", "Urban Living"],
      italicWord: 2,
      description: "Traditional Indian plants like Nerium, Tecoma & Hibiscus adapted for contemporary homes",
      image: "https://images.unsplash.com/photo-1587334207766-f98c0e0fd9e7?w=1800&q=85",
      cta: "View Village Collection",
      tagline: "Heritage Plants — Since 2020",
      accent: "#b8965a"
    },
    {
      title: ["Rare Tropical", "Exotics for", "Your Home"],
      italicWord: 0,
      description: "Unique tropical plants sourced from sustainable nurseries worldwide",
      image: "https://images.unsplash.com/photo-1526397751294-331021109fbd?w=1800&q=85",
      cta: "Discover Rare Plants",
      tagline: "Tropical Collection — Since 2020",
      accent: "#4f8a8b"
    }
  ];

  useEffect (()=>{
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroSlides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Slides */}
      <div className="absolute inset-0 overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
            style={{ 
              backgroundImage: `url('${slide.image}')`,
              zIndex: index === currentSlide ? 1 : 0 
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-bg via-bg/80 to-bg/40" />
            <div className="absolute inset-0 bg-gradient-to-t from-bg/80 via-transparent to-transparent" />
          </div>
        ))}
      </div>

      {/* Decorative elements */}
      <div className="orb w-[500px] h-[500px] bg-green/10 top-[-150px] right-[-100px] animate-float" />
      <div className="orb w-[350px] h-[350px] bg-green-lime/5 bottom-[-80px] left-[-60px] animate-float-slow" />

      <div className="relative z-10 max-w-7xl mx-auto px-[5%] py-32 w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <motion.div
              className="inline-flex items-center gap-2 bg-green/10 border border-green/30 text-green text-xs font-semibold px-4 py-2 rounded-full mb-6 tracking-widest uppercase"
            >
              <span className="w-1.5 h-1.5 bg-green rounded-full animate-pulse" />
              {heroSlides[currentSlide].tagline}
            </motion.div>

            <motion.h1
              className="font-display text-5xl md:text-7xl font-black leading-[1.03] mb-6"
            >
              {heroSlides[currentSlide].title.map((line, i) => (
                <React.Fragment key={i}>
                  {i === heroSlides[currentSlide].italicWord ? (
                    <em className="text-green not-italic">{line}</em>
                  ) : (
                    line
                  )}
                  <br />
                </React.Fragment>
              ))}
            </motion.h1>

            <motion.p
              className="text-slate-300 text-lg md:text-xl leading-relaxed mb-8 max-w-xl"
            >
              {heroSlides[currentSlide].description}
            </motion.p>

            <div className="flex flex-wrap gap-4">
              <Link to="/shop" className="btn-primary text-base px-8 py-4">
                {heroSlides[currentSlide].cta} <ArrowRight size={16} />
              </Link>
              <button className="btn-outline text-base px-8 py-4">
                <Play size={16} className="fill-current" /> Watch Story
              </button>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Village plant pills */}
        <motion.div
          className="flex flex-wrap gap-2 mt-10"
        >
          {[
            'Nerium Oleander',
            'Hibiscus Gudhal',
            'Bougainvillea',
            'Tecoma Gaudichaudi',
            'Ixora Rangan'
          ].map(name => (
            <span key={name} className="text-xs text-slate-400 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
              🌸 {name}
            </span>
          ))}
        </motion.div>

        {/* Slide controls */}
        <div className="absolute bottom-10 left-[5%] flex gap-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${index === currentSlide ? 'bg-green w-8' : 'bg-white/30'}`}
            />
          ))}
        </div>

        {/* Stats */}
        <motion.div
          className="absolute bottom-10 right-[5%] flex gap-8 md:gap-12"
        >
          {[
            { num: '200+', label: 'Plant Varieties' },
            { num: '15K+', label: 'Happy Customers' },
            { num: '4.9★', label: 'Average Rating' },
          ].map(({ num, label }) => (
            <div key={label} className="text-center">
              <div className="font-display text-2xl md:text-3xl font-black text-green">{num}</div>
              <div className="text-slate-400 text-xs tracking-widest uppercase mt-1">{label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] text-slate-500 tracking-[0.2em] uppercase">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-green/60 to-transparent animate-pulse" />
      </motion.div>
    </section>
  );
}
// ─── MARQUEE ──────────────────────────────────────────────────────────────────
function Marquee() {
  const items = ['🌿 Village Plants', '🌸 Nerium Oleander', '🌼 Tecoma Gaudichaudi', '🌺 Hibiscus Gudhal', '🎋 Bonsai', '🌴 Palms', '🎍 Bamboo', '🍋 Fruit Plants', '🌾 Ornamental Grass', '🎁 Gifting Plants', '♻️ Eco Conscious', '⭐ 4.9 Rated']
  const doubled = [...items, ...items]
  return (
    <div className="bg-green py-3 overflow-hidden">
      <div className="flex marquee-content">
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center gap-5 flex-shrink-0 px-5 text-bg text-xs font-bold tracking-widest uppercase">
            {item}
            <span className="w-1 h-1 bg-bg/30 rounded-full" />
          </span>
        ))}
      </div>
    </div>
  )
}

// ─── SHOP CATEGORY TABS + PLANTS ──────────────────────────────────────────────
function ShopCategorySection() {
  const [activeTab, setActiveTab] = useState('Best Sale')

  const filtered = plants.filter(p => p.shopCategory?.includes(activeTab))

  return (
    <section className="section-pad bg-bg-2">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <Reveal>
            <p className="section-tag">Shop by Category</p>
            <h2 className="section-title">
              Browse Our <em className="text-green italic">Collections</em>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <Link to="/shop" className="btn-outline text-sm whitespace-nowrap">
              View All <ArrowRight size={14} />
            </Link>
          </Reveal>
        </div>

        {/* Tab Pills */}
        <div className="flex flex-wrap gap-2 mb-10">
          {shopCategories.map((cat, i) => (
            <motion.button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              whileTap={{ scale: 0.96 }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold border transition-all duration-300 ${
                activeTab === cat.id
                  ? 'bg-green text-bg border-green shadow-[0_0_20px_rgba(34,197,94,0.3)]'
                  : 'border-white/10 text-slate-400 hover:border-green/40 hover:text-green bg-white/[0.02]'
              }`}
            >
              <span>{cat.emoji}</span>
              {cat.label}
            </motion.button>
          ))}
        </div>

        {/* Plant grid with animation */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {filtered.slice(0, 8).map((plant, i) => (
              <PlantCard key={plant.id} plant={plant} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-slate-500">No plants in this category yet. Check back soon!</div>
        )}
      </div>
    </section>
  )
}


// ─── BLOG PREVIEW ─────────────────────────────────────────────────────────────
function BlogPreview() {
  return (
    <section className="section-pad bg-bg-2">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-end justify-between gap-4 mb-12">
          <Reveal>
            <p className="section-tag">Plant Knowledge</p>
            <h2 className="section-title">From the <em className="text-green italic">Garden Journal</em></h2>
          </Reveal>
          <Reveal delay={0.2}>
            <Link to="/blog" className="btn-outline text-sm">All Articles <ArrowRight size={14} /></Link>
          </Reveal>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {blogs.map((post, i) => (
            <Reveal key={post.id} delay={i * 0.1}>
              <div className="group card cursor-pointer hover:-translate-y-1">
                <div className="relative h-48 overflow-hidden">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                  <span className="absolute top-3 left-3 bg-green/20 text-green border border-green/30 text-xs font-semibold px-2.5 py-1 rounded-full">{post.category}</span>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 text-slate-500 text-xs mb-3">
                    <span>{post.date}</span><span>·</span><span>{post.readTime} read</span>
                  </div>
                  <h3 className="font-semibold text-white text-base leading-snug mb-3 group-hover:text-green transition-colors">{post.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center gap-2">
                    <img src={post.author.avatar} alt={post.author.name} className="w-6 h-6 rounded-full object-cover" />
                    <span className="text-slate-400 text-xs">{post.author.name}</span>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── VIDEO BLOG SECTION ───────────────────────────────────────────────────────
const videos = [
  {
    id: 1,
    title: 'How to Plant & Repot Monstera Deliciosa',
    desc: 'Step-by-step guide to repotting your Monstera for faster growth and healthier roots.',
    category: 'Planting Guide',
    duration: '8:24',
    views: '1.2M',
    thumb: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=700&q=80',
    youtubeId: 'PO7MfZg7v2c',
    tag: '🌿 Planting',
  },
  {
    id: 2,
    title: 'Complete Bougainvillea Care Guide',
    desc: 'Everything about pruning, watering and getting maximum blooms from your Bougainvillea.',
    category: 'Plant Care',
    duration: '11:05',
    views: '870K',
    thumb: 'https://images.unsplash.com/photo-1587334207766-f98c0e0fd9e7?w=700&q=80',
    youtubeId: 'JNmq2TFJPUk',
    tag: '🌸 Care Tips',
  },
  {
    id: 3,
    title: 'Building a Terrace Garden from Scratch',
    desc: 'Transform a bare terrace into a lush green paradise — budget tips, plant selection and layout.',
    category: 'Garden Design',
    duration: '15:32',
    views: '2.4M',
    thumb: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=700&q=80',
    youtubeId: 'QgN6H5i_z5A',
    tag: '🏡 Garden Design',
  },
  {
    id: 4,
    title: 'Hibiscus: Daily Care in Indian Summer',
    desc: 'How to keep your Gudhal blooming every day through the harsh Indian summer months.',
    category: 'Village Plants',
    duration: '7:18',
    views: '560K',
    thumb: 'https://images.unsplash.com/photo-1610878180933-123728745d22?w=700&q=80',
    youtubeId: 'i3-MF3nQjQ8',
    tag: '🏡 Village Plants',
  },
  {
    id: 5,
    title: 'Propagating Snake Plant — 3 Easy Methods',
    desc: 'Multiply your Snake Plant collection for free using leaf cuttings, division and water propagation.',
    category: 'Propagation',
    duration: '9:47',
    views: '3.1M',
    thumb: 'https://images.unsplash.com/photo-1572688484438-313a6e50c333?w=700&q=80',
    youtubeId: 'qsL3MVMQJAE',
    tag: '🌱 Propagation',
  },
  {
    id: 6,
    title: 'Bonsai for Absolute Beginners — India',
    desc: 'Your first bonsai journey starts here — tools, soil, wiring and the mindset of a bonsai artist.',
    category: 'Bonsai',
    duration: '18:02',
    views: '1.8M',
    thumb: 'https://images.unsplash.com/photo-1599598425947-5202edd56bdb?w=700&q=80',
    youtubeId: 'zW4kGaF9Psg',
    tag: '🎋 Bonsai',
  },
]

const VIDEO_CATS = ['All', 'Planting Guide', 'Plant Care', 'Garden Design', 'Village Plants', 'Propagation', 'Bonsai']

function VideoBlog() {
  const [activeVideo, setActiveVideo] = useState(null)
  const [activeCat, setActiveCat] = useState('All')

  const filtered = activeCat === 'All' ? videos : videos.filter(v => v.category === activeCat)

  const tagColors = {
    '🌿 Planting':       'bg-green/20 text-green border-green/30',
    '🌸 Care Tips':      'bg-pink-500/20 text-pink-400 border-pink-500/30',
    '🏡 Garden Design':  'bg-amber-500/20 text-amber-400 border-amber-500/30',
    '🏡 Village Plants': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    '🌱 Propagation':    'bg-lime-500/20 text-lime-400 border-lime-500/30',
    '🎋 Bonsai':         'bg-teal-500/20 text-teal-400 border-teal-500/30',
  }

  return (
    <section className="section-pad bg-bg-3 relative overflow-hidden">
      {/* Decorative orb */}
      <div className="orb w-[500px] h-[500px] bg-green/5 top-[-100px] right-[-100px] animate-float-slow" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <Reveal>
            <p className="section-tag">Plant Education</p>
            <h2 className="section-title">
              Learn From Our <em className="text-green italic">Garden Videos</em>
            </h2>
            <p className="text-slate-400 max-w-lg mt-2 text-sm">
              Expert planting guides, care tutorials, and garden inspiration — straight from our botanists.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <a
              href="https://www.youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 border border-red-500/40 text-red-400 hover:bg-red-500/10 hover:border-red-500 px-5 py-2.5 rounded-full text-sm font-semibold transition-all whitespace-nowrap"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-red-400"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              View YouTube Channel
            </a>
          </Reveal>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {VIDEO_CATS.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCat(cat)}
              className={`text-xs px-4 py-2 rounded-full border font-medium transition-all duration-200 ${
                activeCat === cat ? 'bg-green text-bg border-green' : 'border-white/10 text-slate-400 hover:border-green/40 hover:text-green'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured big video */}
        {filtered.length > 0 && (
          <Reveal>
            <div
              className="relative group rounded-3xl overflow-hidden cursor-pointer mb-6"
              onClick={() => setActiveVideo(filtered[0])}
            >
              <div className="aspect-[21/9] md:aspect-[21/8] overflow-hidden">
                <img
                  src={filtered[0].thumb}
                  alt={filtered[0].title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-bg/95 via-bg/50 to-transparent" />
              {/* Play button */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  whileHover={{ scale: 1.12 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-16 h-16 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center group-hover:bg-green/30 group-hover:border-green/50 transition-all duration-300 shadow-2xl"
                >
                  <Play size={24} className="text-white fill-white ml-1" />
                </motion.div>
              </div>
              {/* Info overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                <div className="flex items-center gap-2 mb-3 flex-wrap">
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${tagColors[filtered[0].tag] || 'bg-green/20 text-green border-green/30'}`}>
                    {filtered[0].tag}
                  </span>
                  <span className="text-slate-400 text-xs">{filtered[0].duration}</span>
                  <span className="text-slate-500 text-xs">·</span>
                  <span className="text-slate-400 text-xs">{filtered[0].views} views</span>
                </div>
                <h3 className="font-display text-2xl md:text-3xl font-black text-white mb-2 group-hover:text-green transition-colors">
                  {filtered[0].title}
                </h3>
                <p className="text-slate-300 text-sm hidden md:block max-w-xl">{filtered[0].desc}</p>
              </div>
            </div>
          </Reveal>
        )}

        {/* Video grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.slice(1).map((video, i) => (
            <Reveal key={video.id} delay={i * 0.08}>
              <motion.div
                className="group cursor-pointer"
                onClick={() => setActiveVideo(video)}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25 }}
              >
                <div className="relative rounded-2xl overflow-hidden aspect-video bg-bg-2 mb-3">
                  <img
                    src={video.thumb}
                    alt={video.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  {/* Dark overlay */}
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-300" />
                  {/* Play button */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 bg-white/15 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center group-hover:bg-green/30 group-hover:border-green/50 group-hover:scale-110 transition-all duration-300">
                      <Play size={16} className="text-white fill-white ml-0.5" />
                    </div>
                  </div>
                  {/* Duration badge */}
                  <span className="absolute bottom-2 right-2 bg-black/70 text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                    {video.duration}
                  </span>
                  {/* Category tag */}
                  <span className={`absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-full border backdrop-blur-sm ${tagColors[video.tag] || 'bg-green/20 text-green border-green/30'}`}>
                    {video.tag}
                  </span>
                </div>
                <div className="px-1">
                  <h4 className="text-white font-semibold text-sm leading-snug group-hover:text-green transition-colors mb-1 line-clamp-2">
                    {video.title}
                  </h4>
                  <p className="text-slate-500 text-xs line-clamp-2 leading-relaxed">{video.desc}</p>
                  <span className="text-slate-600 text-[10px] mt-1 block">{video.views} views</span>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* ── Video Lightbox Modal ── */}
      <AnimatePresence>
        {activeVideo && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/90 backdrop-blur-md z-[500]"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setActiveVideo(null)}
            />
            {/* Modal */}
            <motion.div
              className="fixed inset-4 md:inset-8 lg:inset-16 z-[501] flex flex-col"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ type: 'spring', damping: 24, stiffness: 220 }}
            >
              {/* Close bar */}
              <div className="flex items-center justify-between mb-3 flex-shrink-0">
                <div>
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${tagColors[activeVideo.tag] || 'bg-green/20 text-green border-green/30'}`}>
                    {activeVideo.tag}
                  </span>
                </div>
                <button
                  onClick={() => setActiveVideo(null)}
                  className="w-9 h-9 bg-white/10 hover:bg-white/20 border border-white/10 rounded-full flex items-center justify-center transition-colors"
                >
                  <ChevronRight size={16} className="text-white rotate-45 translate-x-[1px] -translate-y-[1px]" />
                </button>
              </div>

              {/* Video embed */}
              <div className="flex-1 rounded-2xl overflow-hidden bg-black">
                <iframe
                  src={`https://www.youtube.com/embed/${activeVideo.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                  title={activeVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                  style={{ border: 'none' }}
                />
              </div>

              {/* Title bar */}
              <div className="mt-3 flex-shrink-0">
                <h3 className="text-white font-display font-bold text-lg leading-snug">{activeVideo.title}</h3>
                <p className="text-slate-400 text-sm mt-0.5">{activeVideo.desc}</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  )
}

// ─── SCROLLABLE PLANT TYPE NAVIGATOR ──────────────────────────────────────────
function PlantTypeNavigator() {
  const [activeType, setActiveType] = useState('all')
  const scrollRef = useRef(null)

  const filtered = activeType === 'all'
    ? plants
    : plants.filter(p => p.category === activeType)

  const scroll = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir * 220, behavior: 'smooth' })
    }
  }

  return (
    <section className="section-pad bg-bg">
      <div className="max-w-7xl mx-auto">
        <Reveal>
          <p className="section-tag">Explore by Type</p>
          <h2 className="section-title mb-2">
            Every Plant, <em className="text-green italic">Every Style</em>
          </h2>
          <p className="text-slate-400 mb-8 max-w-xl">
            Click any category below to instantly browse that plant collection.
          </p>
        </Reveal>

        {/* Scrollable type pills */}
        <div className="relative mb-10">
          {/* Left arrow */}
          <button
            onClick={() => scroll(-1)}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-9 h-9 bg-bg-2 border border-white/10 rounded-full flex items-center justify-center hover:border-green/40 transition-colors shadow-xl"
          >
            <ChevronLeft size={16} className="text-slate-400" />
          </button>

          {/* Scrollable row */}
          <div
            ref={scrollRef}
            className="flex gap-3 overflow-x-auto scrollbar-hide px-10 pb-2"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {plantTypes.map((type, i) => (
              <motion.button
                key={type.id}
                onClick={() => setActiveType(type.id)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className={`flex-shrink-0 flex flex-col items-center gap-2.5 px-5 py-4 rounded-2xl border transition-all duration-300 min-w-[110px] ${
                  activeType === type.id
                    ? 'bg-green/20 border-green/50 shadow-[0_0_20px_rgba(34,197,94,0.2)]'
                    : 'bg-white/[0.02] border-white/8 hover:border-green/30 hover:bg-white/[0.04]'
                }`}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${type.bg} flex items-center justify-center text-2xl shadow-lg`}>
                  {type.emoji}
                </div>
                <span className={`text-xs font-semibold text-center leading-tight ${
                  activeType === type.id ? 'text-green' : 'text-slate-400'
                }`}>
                  {type.label}
                </span>
                <span className="text-[10px] text-slate-600">
                  {type.id === 'all' ? plants.length : plants.filter(p => p.category === type.id).length} plants
                </span>
              </motion.button>
            ))}
          </div>

          {/* Right arrow */}
          <button
            onClick={() => scroll(1)}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-9 h-9 bg-bg-2 border border-white/10 rounded-full flex items-center justify-center hover:border-green/40 transition-colors shadow-xl"
          >
            <ChevronRight size={16} className="text-slate-400" />
          </button>
        </div>

        {/* Active label */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeType}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-white font-semibold text-lg">
                {activeType === 'all' ? 'All Plants' : plantTypes.find(t => t.id === activeType)?.label}
                <span className="ml-2 text-green text-sm font-normal">({filtered.length} plants)</span>
              </h3>
              <Link to={`/shop${activeType !== 'all' ? `?cat=${activeType}` : ''}`} className="text-green text-sm hover:text-green-light transition-colors flex items-center gap-1">
                View all <ArrowRight size={13} />
              </Link>
            </div>

            {filtered.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {filtered.slice(0, 8).map((plant, i) => (
                  <PlantCard key={plant.id} plant={plant} index={i} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-slate-500">
                <div className="text-4xl mb-3">🌱</div>
                <p>No plants in this category yet. Coming soon!</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

// ─── SERVICES ─────────────────────────────────────────────────────────────────
function Services() {
  return (
    <section className="section-pad bg-bg-2">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <Reveal>
            <p className="section-tag justify-center">What We Offer</p>
            <h2 className="section-title">
              The <em className="text-green italic">GreenCO</em> Difference
            </h2>
          </Reveal>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.1}>
              <div className="group relative bg-white/[0.03] border border-white/5 rounded-2xl p-6 hover:border-green/30 hover:-translate-y-1 transition-all duration-400 overflow-hidden h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-green/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                <div className="relative z-10">
                  <div className="w-12 h-12 bg-green/10 rounded-xl flex items-center justify-center text-2xl mb-4">{s.icon}</div>
                  <h3 className="font-semibold text-white mb-2">{s.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{s.description}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── VILLAGE PLANTS SPOTLIGHT ─────────────────────────────────────────────────
function VillagePlants() {
  const villagePlants = plants.filter(p => p.category === 'Village')
  return (
    <section className="section-pad bg-bg relative overflow-hidden">
      {/* Warm background glow */}
      <div className="orb w-[500px] h-[400px] bg-amber-600/5 top-0 left-1/2 -translate-x-1/2 animate-float-slow" />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row items-end justify-between gap-4 mb-12">
          <Reveal>
            <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold px-4 py-1.5 rounded-full mb-3 tracking-widest uppercase">
              🏡 Traditional Heritage
            </div>
            <h2 className="section-title">
              Village Plant <em className="text-amber-400 italic">Collection</em>
            </h2>
            <p className="text-slate-400 max-w-lg mt-2">
              Nerium, Tecoma, Thevetia, Hibiscus, Ixora, Bougainvillea — the beloved plants of Indian courtyards, now curated for modern homes.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <Link to="/shop?cat=Village" className="flex items-center gap-2 text-amber-400 border border-amber-400/30 hover:bg-amber-400/10 px-5 py-2.5 rounded-full text-sm font-semibold transition-all whitespace-nowrap">
              All Village Plants <ArrowRight size={14} />
            </Link>
          </Reveal>
        </div>

        {/* Featured village plant banner */}
        <Reveal>
          <div className="relative rounded-3xl overflow-hidden mb-8 group cursor-pointer">
            <div className="h-52 md:h-64 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: "url('https://images.unsplash.com/photo-1587334207766-f98c0e0fd9e7?w=1400&q=80')" }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-bg/95 via-bg/70 to-transparent" />
            <div className="absolute inset-0 flex items-center px-8 md:px-12">
              <div className="max-w-lg">
                <span className="text-amber-400 text-xs font-bold tracking-widest uppercase">Heritage Collection</span>
                <h3 className="font-display text-2xl md:text-3xl font-black text-white mt-2 mb-3">
                  Flowers That Tell India's Story
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-4 hidden md:block">
                  From temple courtyards to village pathways — these plants carry centuries of Indian tradition, fragrance, and beauty into your modern home.
                </p>
                <div className="flex flex-wrap gap-2">
                  {['Nerium Oleander','Tecoma Gaudichaudi','Thevetia Neriifolia','Hibiscus Gudhal','Ixora Rangan'].map(name => (
                    <span key={name} className="text-xs text-amber-300 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-full">{name}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {villagePlants.slice(0, 4).map((plant, i) => (
            <PlantCard key={plant.id} plant={plant} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── CATEGORY VISUAL GRID ─────────────────────────────────────────────────────
function Categories() {
  return (
    <section className="section-pad bg-bg-2">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <Reveal>
            <p className="section-tag justify-center">Browse By Type</p>
            <h2 className="section-title">Find Your Perfect <em className="text-green italic">Match</em></h2>
          </Reveal>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {categories.map((cat, i) => (
            <Reveal key={cat.id} delay={i * 0.07}>
              <Link to={`/shop?cat=${cat.id}`} className="group relative rounded-2xl overflow-hidden aspect-[4/3] block">
                <img src={cat.image} alt={cat.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                <div className={`absolute inset-0 bg-gradient-to-t ${cat.color} to-transparent via-bg-3/20`} />
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
                  <p className="text-green text-xs font-semibold tracking-widest uppercase mb-1">{cat.count} plants</p>
                  <h3 className="font-display font-bold text-white text-lg md:text-xl leading-tight">{cat.name}</h3>
                  <p className="text-slate-300 text-xs mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">{cat.description} →</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── WHY CHOOSE US ────────────────────────────────────────────────────────────
function WhyUs() {
  return (
    <section className="section-pad bg-bg overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <Reveal direction="right">
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden aspect-[4/5]">
                <img src="https://images.unsplash.com/photo-1545241047-6083a3684587?w=800&q=80" alt="Premium plant care" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-bg/60 to-transparent" />
              </div>
              <motion.div
                className="absolute -bottom-6 -right-6 glass rounded-2xl p-4 shadow-2xl"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green/20 rounded-xl flex items-center justify-center text-xl">🌱</div>
                  <div>
                    <p className="text-white text-sm font-semibold">15,000+</p>
                    <p className="text-slate-400 text-xs">Happy plant parents</p>
                  </div>
                </div>
              </motion.div>
              <div className="absolute -top-6 -left-6 w-24 h-24 dot-grid rounded-2xl opacity-50" />
            </div>
          </Reveal>

          <Reveal direction="left">
            <p className="section-tag">Why GreenCO</p>
            <h2 className="section-title mb-4">More Than Just a <em className="text-green italic">Plant Shop</em></h2>
            <p className="text-slate-400 mb-8 leading-relaxed">A team of botanists, designers, and plant enthusiasts obsessed with creating the most thoughtful plant buying experience in India — from rare exotics to beloved village classics.</p>
            <ul className="space-y-4">
              {whyUs.map((item, i) => (
                <motion.li key={i} className="flex items-center gap-3 text-slate-300"
                  initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                >
                  <div className="w-5 h-5 bg-green/20 border border-green/40 rounded-full flex items-center justify-center flex-shrink-0">
                    <Check size={11} className="text-green" strokeWidth={3} />
                  </div>
                  {item.text}
                </motion.li>
              ))}
            </ul>
            <Link to="/about" className="btn-primary mt-8 w-fit">Our Story <ArrowRight size={16} /></Link>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

// ─── GALLERY ──────────────────────────────────────────────────────────────────
function Gallery() {
  return (
    <section className="section-pad bg-bg-2">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <Reveal>
            <p className="section-tag justify-center">Visual Garden</p>
            <h2 className="section-title">Plants in Their <em className="text-green italic">Element</em></h2>
          </Reveal>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-4 gap-3 auto-rows-[160px]">
          {gallery.map((item, i) => (
            <Reveal key={item.id} delay={i * 0.06} className={i === 0 ? 'col-span-2 row-span-2' : ''}>
              <div className="group relative rounded-2xl overflow-hidden h-full">
                <img src={item.image} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                <div className="absolute inset-0 bg-green/0 group-hover:bg-green/10 transition-colors duration-300" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── TESTIMONIALS ─────────────────────────────────────────────────────────────
function Testimonials() {
  return (
    <section className="section-pad bg-bg">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <Reveal>
            <p className="section-tag justify-center">Customer Love</p>
            <h2 className="section-title">What Our Community <em className="text-green italic">Says</em></h2>
          </Reveal>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {testimonials.map((t, i) => (
            <Reveal key={t.id} delay={i * 0.1}>
              <div className="group bg-white/[0.03] border border-white/5 hover:border-green/20 rounded-2xl p-5 transition-all duration-400 hover:-translate-y-1 h-full flex flex-col">
                <Quote size={20} className="text-green/40 mb-3" />
                <p className="text-slate-300 text-sm leading-relaxed flex-1 mb-4">"{t.text}"</p>
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(t.rating)].map((_, i) => (<span key={i} className="text-amber-400 text-xs">★</span>))}
                </div>
                <div className="flex items-center gap-3">
                  <img src={t.avatar} alt={t.name} className="w-9 h-9 rounded-full object-cover border border-white/10" />
                  <div>
                    <p className="text-white text-sm font-semibold">{t.name}</p>
                    <p className="text-slate-500 text-xs">{t.role}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}


// ─── CTA BANNER ───────────────────────────────────────────────────────────────
function CTABanner() {
  return (
    <section className="py-24 px-[5%] bg-bg overflow-hidden">
      <Reveal>
        <div className="relative max-w-5xl mx-auto bg-gradient-to-br from-green/20 via-green/10 to-transparent border border-green/30 rounded-3xl p-12 md:p-16 text-center overflow-hidden">
          <div className="orb w-[400px] h-[400px] bg-green/15 top-[-200px] left-1/2 -translate-x-1/2 animate-float" />
          <div className="absolute inset-0 dot-grid opacity-30" />
          <div className="relative z-10">
            <p className="section-tag justify-center mb-4">Ready to grow?</p>
            <h2 className="font-display text-4xl md:text-6xl font-black mb-5 leading-tight">
              Start Your <em className="text-green italic">Green</em> Journey Today
            </h2>
            <p className="text-slate-300 text-lg mb-8 max-w-lg mx-auto">
              Join 15,000+ plant lovers who've transformed their spaces. Free shipping on orders over ₹999.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/shop" className="btn-primary px-10 py-4 text-base animate-pulse-glow">
                Shop Plants Now <ArrowRight size={16} />
              </Link>
              <Link to="/contact" className="btn-outline px-10 py-4 text-base">
                Get Expert Advice
              </Link>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}

// ─── HOME ─────────────────────────────────────────────────────────────────────
export default function Home() {
  return (
    <main>
      <Hero />
      {/* <Marquee /> */}
      <ShopCategorySection />
      <VideoBlog />
      {/* <PlantTypeNavigator /> */}
      {/* <VillagePlants /> */}
      <Services />
      <Categories />
      <WhyUs />
      <Gallery />
      <Testimonials />
      <BlogPreview />
      <CTABanner />
    </main>
  )
}