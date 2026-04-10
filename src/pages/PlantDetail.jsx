import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Star, ShoppingCart, Heart, ArrowLeft, Check, Leaf, Truck, Shield, RotateCcw } from 'lucide-react'
import { plants } from '../data/plants'
import { useCart } from '../context/AppContext'
import PlantCard from '../components/PlantCard'
import Reveal from '../components/Reveal'


export default function PlantDetail() {
  const { id } = useParams()
  const plant = plants.find(p => p.id === Number(id)) || plants[0]
  const related = plants.filter(p => p.id !== plant.id && p.category === plant.category).slice(0, 4)

  const { addItem } = useCart()
  const [activeImg, setActiveImg] = useState(0)
  const [qty, setQty] = useState(1)
  const [wished, setWished] = useState(false)
  const [added, setAdded] = useState(false)

  const handleAdd = () => {
    addItem(plant, qty)
    setAdded(true)
    setTimeout(() => setAdded(false), 2500)
  }

  const gallery = plant.gallery || [plant.image]

  const guarantees = [
    { Icon: Truck, text: '24-48 hour delivery' },
    { Icon: Shield, text: '7-day freshness guarantee' },
    { Icon: RotateCcw, text: 'Easy returns' },
    { Icon: Leaf, text: 'Ethically sourced' },
  ]

  return (
    <main className="min-h-screen bg-bg pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-[5%]">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-slate-500 mb-8">
          <Link to="/" className="hover:text-green transition-colors">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-green transition-colors">Shop</Link>
          <span>/</span>
          <span className="text-green">{plant.name}</span>
        </div>

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* ── Image Gallery ── */}
          <Reveal direction="right">
            <div className="space-y-3">
              <div className="relative rounded-3xl overflow-hidden aspect-square bg-bg-2">
                <motion.img
                  key={activeImg}
                  src={gallery[activeImg]}
                  alt={plant.name}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                />
                {plant.badge && (
                  <span className="absolute top-4 left-4 bg-green/20 text-green border border-green/30 text-xs font-semibold px-3 py-1.5 rounded-full backdrop-blur-sm">
                    {plant.badge}
                  </span>
                )}
                {!plant.inStock && (
                  <div className="absolute inset-0 bg-bg-3/50 backdrop-blur-sm flex items-center justify-center">
                    <span className="bg-bg-3/90 border border-white/10 text-slate-300 font-semibold px-5 py-2.5 rounded-full">
                      Out of Stock
                    </span>
                  </div>
                )}
              </div>
              {/* Thumbnails */}
              {gallery.length > 1 && (
                <div className="flex gap-2">
                  {gallery.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImg(i)}
                      className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                        activeImg === i ? 'border-green' : 'border-transparent opacity-50 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </Reveal>

          {/* ── Product Info ── */}
          <Reveal direction="left">
            <div>
              <p className="text-green text-sm font-semibold tracking-widest uppercase mb-2">{plant.category}</p>
              <h1 className="font-display text-3xl md:text-4xl font-black mb-3">{plant.name}</h1>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className={i < Math.floor(plant.rating) ? 'text-amber-400 fill-amber-400' : 'text-slate-600'} />
                  ))}
                </div>
                <span className="text-sm text-slate-400">{plant.rating} · {plant.reviews} reviews</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-5">
                <span className="font-display text-4xl font-black text-white">₹{plant.price.toLocaleString()}</span>
                {plant.originalPrice && (
                  <>
                    <span className="text-slate-500 text-xl line-through">₹{plant.originalPrice.toLocaleString()}</span>
                    <span className="bg-green/20 text-green text-xs font-bold px-2 py-1 rounded-full">
                      {Math.round((1 - plant.price / plant.originalPrice) * 100)}% OFF
                    </span>
                  </>
                )}
              </div>

              {/* Description */}
              <p className="text-slate-300 leading-relaxed mb-6">{plant.description}</p>

              {/* Features */}
              <div className="flex flex-wrap gap-2 mb-6">
                {plant.features.map(f => (
                  <span key={f} className="flex items-center gap-1.5 bg-white/5 border border-white/10 text-slate-300 text-xs px-3 py-1.5 rounded-full">
                    <Check size={10} className="text-green" strokeWidth={3} /> {f}
                  </span>
                ))}
              </div>

              {/* Care at a glance */}
              <div className="grid grid-cols-2 gap-3 mb-7 p-4 bg-white/[0.03] rounded-2xl border border-white/5">
                {Object.entries(plant.care).map(([key, val]) => (
                  <div key={key}>
                    <p className="text-slate-500 text-xs capitalize tracking-wide">{key}</p>
                    <p className="text-white text-sm font-medium">{val}</p>
                  </div>
                ))}
              </div>

              {/* Qty + Add */}
              <div className="flex gap-3 mb-6">
                <div className="flex items-center gap-0 bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                  <button onClick={() => setQty(q => Math.max(1, q - 1))} className="px-4 py-3 hover:bg-white/10 transition-colors text-white font-bold">−</button>
                  <span className="px-4 py-3 text-white font-semibold min-w-[3rem] text-center">{qty}</span>
                  <button onClick={() => setQty(q => q + 1)} className="px-4 py-3 hover:bg-white/10 transition-colors text-white font-bold">+</button>
                </div>
                <button
                  onClick={handleAdd}
                  disabled={!plant.inStock}
                  className={`flex-1 flex items-center justify-center gap-2 font-semibold py-3 rounded-xl transition-all duration-300 ${
                    added ? 'bg-green/20 text-green border border-green/40' :
                    plant.inStock ? 'bg-green text-bg hover:bg-green-light hover:shadow-[0_0_30px_rgba(34,197,94,0.4)]' :
                    'bg-white/5 text-slate-600 cursor-not-allowed'
                  }`}
                >
                  {added ? <><Check size={16} /> Added to Cart!</> : <><ShoppingCart size={16} /> {plant.inStock ? 'Add to Cart' : 'Out of Stock'}</>}
                </button>
                <button
                  onClick={() => setWished(!wished)}
                  className="p-3 border border-white/10 hover:border-red-400/40 rounded-xl transition-colors"
                >
                  <Heart size={20} className={wished ? 'text-red-400 fill-red-400' : 'text-slate-400'} />
                </button>
              </div>

              {/* Guarantees */}
              <div className="grid grid-cols-2 gap-2">
                {guarantees.map(({ Icon, text }) => (
                  <div key={text} className="flex items-center gap-2 text-xs text-slate-400">
                    <Icon size={13} className="text-green flex-shrink-0" />
                    {text}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div>
            <Reveal>
              <h2 className="font-display text-2xl font-bold mb-8">
                You might also <em className="text-green italic">love</em>
              </h2>
            </Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {related.map((p, i) => <PlantCard key={p.id} plant={p} index={i} />)}
            </div>
          </div>
        )}
      </div>
    </main>
  )
}