import { motion } from 'framer-motion'

export default function LoadingScreen() {
  return (
    <div className="min-h-screen bg-bg flex items-center justify-center">
      <motion.div
        className="flex flex-col items-center gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="relative w-16 h-16">
          <div className="w-16 h-16 rounded-full border-2 border-white/10 animate-spin border-t-green" />
          <div className="absolute inset-0 flex items-center justify-center text-2xl">🌿</div>
        </div>
        <p className="text-slate-400 text-sm tracking-widest uppercase">Loading</p>
      </motion.div>
    </div>
  )
}
