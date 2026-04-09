import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import PlantCard from '../components/PlantCard'
import Reveal from '../components/Reveal'
import { plants } from '../data/plants'

const CATEGORIES = ['All', 'Indoor', 'Outdoor', 'Succulents', 'Flowering', 'Herbs', 'Trees']
const SORT_OPTIONS = [
  { label: 'Featured', value: 'featured' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Best Rated', value: 'rating' },
  { label: 'Most Reviews', value: 'reviews' },
]

export default function Shop() {
  const [search, setSearch] = useState('')
  const [selectedCat, setSelectedCat] = useState('All')
  const [sort, setSort] = useState('featured')
  const [maxPrice, setMaxPrice] = useState(5500)
  const [showFilters, setShowFilters] = useState(false)

  const filtered = useMemo(() => {
    let result = [...plants]
    if (search) result = result.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.description.toLowerCase().includes(search.toLowerCase()))
    if (selectedCat !== 'All') result = result.filter(p => p.category === selectedCat)
    result = result.filter(p => p.price <= maxPrice)
    switch (sort) {
      case 'price-asc': result.sort((a, b) => a.price - b.price); break
      case 'price-desc': result.sort((a, b) => b.price - a.price); break
      case 'rating': result.sort((a, b) => b.rating - a.rating); break
      case 'reviews': result.sort((a, b) => b.reviews - a.reviews); break
    }
    return result
  }, [search, selectedCat, sort, maxPrice])

  return (
    <main className="min-h-screen bg-bg pt-24">
      {/* Page header */}
      <div className="relative bg-bg-3 border-b border-white/5 py-16 px-[5%] overflow-hidden">
        <div className="orb w-96 h-96 bg-green/8 top-[-150px] right-[-80px] animate-float" />
        <div className="max-w-7xl mx-auto relative z-10">
          <Reveal>
            <p className="section-tag">Our Collection</p>
            <h1 className="font-display text-4xl md:text-5xl font-black mb-3">
              Find Your <em className="text-green italic">Perfect Plant</em>
            </h1>
            <p className="text-slate-400 max-w-xl">
              {filtered.length} plants available — rare, curated, and ready to thrive in your space.
            </p>
          </Reveal>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-[5%] py-10">
        {/* Search + Sort bar */}
        <div className="flex flex-col md:flex-row gap-3 mb-8">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search plants..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="input pl-10 text-sm"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white">
                <X size={14} />
              </button>
            )}
          </div>
          <select
            value={sort}
            onChange={e => setSort(e.target.value)}
            className="input w-full md:w-48 text-sm cursor-pointer"
          >
            {SORT_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value} className="bg-bg-2">{opt.label}</option>
            ))}
          </select>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="btn-outline text-sm md:w-auto gap-2"
          >
            <SlidersHorizontal size={15} /> Filters
            {showFilters && <X size={13} />}
          </button>
        </div>

        {/* Filters panel */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white/[0.03] border border-white/5 rounded-2xl p-5 mb-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-xs text-slate-400 uppercase tracking-widest mb-3 font-semibold">Max Price: ₹{maxPrice.toLocaleString()}</p>
                <input
                  type="range" min={400} max={5500} step={100}
                  value={maxPrice}
                  onChange={e => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-green"
                />
                <div className="flex justify-between text-xs text-slate-500 mt-1">
                  <span>₹400</span><span>₹5,500</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Category pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`text-sm px-4 py-2 rounded-full border transition-all duration-200 font-medium ${
                selectedCat === cat
                  ? 'bg-green text-bg border-green'
                  : 'border-white/10 text-slate-400 hover:border-green/40 hover:text-green'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {filtered.map((plant, i) => (
              <PlantCard key={plant.id} plant={plant} index={i} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24">
            <div className="text-6xl mb-4">🌵</div>
            <h3 className="font-semibold text-white mb-2">No plants found</h3>
            <p className="text-slate-400 text-sm">Try adjusting your search or filters</p>
            <button onClick={() => { setSearch(''); setSelectedCat('All'); setMaxPrice(5500) }} className="btn-outline text-sm mt-4">
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </main>
  )
}
