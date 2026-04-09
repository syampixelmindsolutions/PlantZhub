import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Star, ShoppingCart, Heart } from 'lucide-react'
import { useState } from 'react'

export default function PlantCard({ plant, index = 0 }) {
  const [wished, setWished] = useState(false)
  const [added, setAdded] = useState(false)

  const handleAdd = (e) => {
    e.preventDefault()
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const badgeColors = {
    green: 'bg-green/20 text-green border-green/30',
    blue: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    amber: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    purple: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.23, 1, 0.32, 1] }}
    >
      <Link to={`/shop/${plant.id}`} className="block group">
        <div className="card hover:-translate-y-2 cursor-pointer">
          {/* Image */}
          <div className="relative h-60 overflow-hidden bg-bg-4">
            <img
              src={plant.image}
              alt={plant.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
            />
            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-bg-3/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

            {/* Badge */}
            {plant.badge && (
              <span className={`absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full border backdrop-blur-sm ${badgeColors[plant.badgeColor] || badgeColors.green}`}>
                {plant.badge}
              </span>
            )}

            {/* Wishlist */}
            <button
              onClick={(e) => { e.preventDefault(); setWished(!wished) }}
              className="absolute top-3 right-3 w-8 h-8 bg-bg-3/70 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 hover:border-red-400/50"
            >
              <Heart size={14} className={wished ? 'text-red-400 fill-red-400' : 'text-slate-400'} />
            </button>

            {/* Out of stock overlay */}
            {!plant.inStock && (
              <div className="absolute inset-0 bg-bg-3/60 backdrop-blur-[2px] flex items-center justify-center">
                <span className="text-xs font-semibold text-slate-300 bg-bg-3/80 px-3 py-1.5 rounded-full border border-white/10">
                  Out of Stock
                </span>
              </div>
            )}
          </div>

          {/* Info */}
          <div className="p-4">
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="text-xs text-slate-500 font-medium mb-0.5">{plant.category}</p>
                <h3 className="font-semibold text-white text-sm leading-tight group-hover:text-green transition-colors">
                  {plant.name}
                </h3>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-base font-bold text-white">₹{plant.price.toLocaleString()}</span>
                {plant.originalPrice && (
                  <span className="text-xs text-slate-500 line-through">₹{plant.originalPrice.toLocaleString()}</span>
                )}
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-1.5 mb-3">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={11}
                    className={i < Math.floor(plant.rating) ? 'text-amber-400 fill-amber-400' : 'text-slate-600'}
                  />
                ))}
              </div>
              <span className="text-xs text-slate-400">{plant.rating} ({plant.reviews})</span>
            </div>

            {/* Add to cart */}
            <button
              onClick={handleAdd}
              disabled={!plant.inStock}
              className={`w-full text-sm font-semibold py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 ${
                added
                  ? 'bg-green text-bg'
                  : plant.inStock
                  ? 'bg-white/5 hover:bg-green hover:text-bg border border-white/10 hover:border-transparent text-white'
                  : 'bg-white/5 text-slate-600 cursor-not-allowed border border-white/5'
              }`}
            >
              <ShoppingCart size={14} />
              {added ? 'Added to Cart!' : plant.inStock ? 'Add to Cart' : 'Unavailable'}
            </button>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
