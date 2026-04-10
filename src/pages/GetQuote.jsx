// import { useState, useMemo } from 'react'
// import { motion, AnimatePresence } from 'framer-motion'
// import { Link } from 'react-router-dom'
// import {
//   ChevronRight, ChevronLeft, Check, Leaf, Plus, Minus,
//   User, Phone, Mail, MapPin, Building2, MessageSquare,
//   Package, Send, Star, Trash2, ShoppingBag, ArrowRight
// } from 'lucide-react'
// import Reveal from '../components/Reveal'
// import { plants } from '../data/plants'

// // ─── Quote taxonomy ────────────────────────────────────────────────────────────
// const primaryCategories = [
//   { id: 'residential', label: 'Residential', emoji: '🏠', desc: 'Home gardens, balconies, interiors' },
//   { id: 'commercial',  label: 'Commercial',  emoji: '🏢', desc: 'Offices, hotels, malls, restaurants' },
//   { id: 'landscape',   label: 'Landscaping', emoji: '🌳', desc: 'Parks, villas, large outdoor spaces' },
//   { id: 'gifting',     label: 'Gifting',     emoji: '🎁', desc: 'Bulk gifting, corporate gifts' },
//   { id: 'event',       label: 'Events',      emoji: '🎊', desc: 'Weddings, festivals, exhibitions' },
//   { id: 'nursery',     label: 'Nursery / Wholesale', emoji: '🌿', desc: 'Bulk nursery & wholesale orders' },
// ]

// const subCategories = {
//   residential: [
//     { id: 'balcony',   label: 'Balcony Garden' },
//     { id: 'terrace',   label: 'Terrace Garden' },
//     { id: 'interior',  label: 'Interior Décor' },
//     { id: 'courtyard', label: 'Courtyard / Front Yard' },
//     { id: 'kitchen',   label: 'Kitchen Garden' },
//   ],
//   commercial: [
//     { id: 'office',      label: 'Office Interior' },
//     { id: 'hotel',       label: 'Hotel / Resort' },
//     { id: 'restaurant',  label: 'Restaurant / Café' },
//     { id: 'mall',        label: 'Mall / Retail Space' },
//     { id: 'hospital',    label: 'Hospital / Clinic' },
//     { id: 'showroom',    label: 'Showroom / Gallery' },
//   ],
//   landscape: [
//     { id: 'villa',       label: 'Villa / Bungalow Garden' },
//     { id: 'park',        label: 'Park / Public Space' },
//     { id: 'highway',     label: 'Highway / Road Divider' },
//     { id: 'farmhouse',   label: 'Farmhouse' },
//     { id: 'apartment',   label: 'Apartment Society' },
//   ],
//   gifting: [
//     { id: 'corporate',   label: 'Corporate Gifting' },
//     { id: 'wedding',     label: 'Wedding Favours' },
//     { id: 'festive',     label: 'Festive Gifting (Diwali etc.)' },
//     { id: 'personal',    label: 'Personal Gifting' },
//   ],
//   event: [
//     { id: 'wedding',     label: 'Wedding / Reception' },
//     { id: 'festival',    label: 'Festival Decoration' },
//     { id: 'exhibition',  label: 'Exhibition / Trade Show' },
//     { id: 'corporate-event', label: 'Corporate Event' },
//   ],
//   nursery: [
//     { id: 'wholesale',   label: 'Wholesale Purchase' },
//     { id: 'reseller',    label: 'Reseller / Retailer' },
//     { id: 'contractor',  label: 'Landscape Contractor' },
//   ],
// }

// const plantCategories = [
//   'Indoor', 'Village', 'Flowering', 'Fruits', 'Bonsai',
//   'Palms', 'Ornamental', 'Bamboo', 'Grass', 'Succulents', 'Herbs'
// ]

// const potSizes = ['4 inch', '6 inch', '8 inch', '10 inch', '12 inch', '14 inch', '18 inch', 'Custom']
// const deliveryTimelines = ['ASAP (3–5 days)', '1 week', '2 weeks', '1 month', 'Flexible']
// const budgetRanges = ['Under ₹5,000', '₹5,000 – ₹15,000', '₹15,000 – ₹50,000', '₹50,000 – ₹1 Lakh', 'Above ₹1 Lakh', 'Custom / Open Budget']
// const indianStates = ['Telangana', 'Andhra Pradesh', 'Karnataka', 'Tamil Nadu', 'Maharashtra', 'Delhi', 'Gujarat', 'Rajasthan', 'Kerala', 'West Bengal', 'Other']

// // ─── Step indicator ────────────────────────────────────────────────────────────
// const STEPS = [
//   { num: 1, label: 'Purpose',     icon: Building2 },
//   { num: 2, label: 'Plants',      icon: Leaf },
//   { num: 3, label: 'Details',     icon: Package },
//   { num: 4, label: 'Your Info',   icon: User },
//   { num: 5, label: 'Confirm',     icon: Check },
// ]

// function StepBar({ current }) {
//   return (
//     <div className="flex items-center justify-center gap-0 mb-12">
//       {STEPS.map((step, i) => {
//         const done = current > step.num
//         const active = current === step.num
//         return (
//           <div key={step.num} className="flex items-center">
//             <div className="flex flex-col items-center">
//               <motion.div
//                 animate={{ scale: active ? 1.1 : 1 }}
//                 className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-all duration-400 ${
//                   done   ? 'bg-green border-green text-bg' :
//                   active ? 'bg-green/20 border-green text-green shadow-[0_0_20px_rgba(34,197,94,0.3)]' :
//                            'bg-white/5 border-white/10 text-slate-500'
//                 }`}
//               >
//                 {done ? <Check size={14} strokeWidth={3} /> : step.num}
//               </motion.div>
//               <span className={`text-[10px] mt-1.5 font-medium tracking-wide hidden sm:block ${active ? 'text-green' : done ? 'text-slate-400' : 'text-slate-600'}`}>
//                 {step.label}
//               </span>
//             </div>
//             {i < STEPS.length - 1 && (
//               <div className={`w-8 md:w-14 h-px mx-1 transition-colors duration-400 mb-4 ${done ? 'bg-green' : 'bg-white/10'}`} />
//             )}
//           </div>
//         )
//       })}
//     </div>
//   )
// }

// // ─── STEP 1: Purpose ──────────────────────────────────────────────────────────
// function Step1({ form, setForm }) {
//   return (
//     <div>
//       <h2 className="font-display text-2xl font-bold mb-2">What's the <em className="text-green italic">Purpose?</em></h2>
//       <p className="text-slate-400 text-sm mb-8">Select how you plan to use the plants.</p>

//       {/* Primary category */}
//       <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
//         {primaryCategories.map(cat => (
//           <motion.button
//             key={cat.id}
//             whileTap={{ scale: 0.97 }}
//             onClick={() => setForm(f => ({ ...f, primaryCategory: cat.id, subCategory: '' }))}
//             className={`flex flex-col items-start gap-2 p-4 rounded-2xl border transition-all duration-300 text-left ${
//               form.primaryCategory === cat.id
//                 ? 'bg-green/15 border-green/50 shadow-[0_0_20px_rgba(34,197,94,0.15)]'
//                 : 'bg-white/[0.03] border-white/8 hover:border-green/30 hover:bg-white/[0.05]'
//             }`}
//           >
//             <span className="text-2xl">{cat.emoji}</span>
//             <div>
//               <p className={`font-semibold text-sm ${form.primaryCategory === cat.id ? 'text-green' : 'text-white'}`}>{cat.label}</p>
//               <p className="text-slate-500 text-xs mt-0.5 leading-snug">{cat.desc}</p>
//             </div>
//           </motion.button>
//         ))}
//       </div>

//       {/* Sub category */}
//       <AnimatePresence>
//         {form.primaryCategory && (
//           <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
//             <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold mb-3">
//               Specify Location / Use Type
//             </p>
//             <div className="flex flex-wrap gap-2">
//               {(subCategories[form.primaryCategory] || []).map(sub => (
//                 <button
//                   key={sub.id}
//                   onClick={() => setForm(f => ({ ...f, subCategory: sub.id }))}
//                   className={`text-sm px-4 py-2 rounded-full border transition-all duration-200 font-medium ${
//                     form.subCategory === sub.id
//                       ? 'bg-green text-bg border-green'
//                       : 'border-white/10 text-slate-400 hover:border-green/40 hover:text-green'
//                   }`}
//                 >
//                   {sub.label}
//                 </button>
//               ))}
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   )
// }

// // ─── STEP 2: Plant Selection ───────────────────────────────────────────────────
// function Step2({ form, setForm }) {
//   const [activeCat, setActiveCat] = useState('Indoor')
//   const [search, setSearch] = useState('')

//   const filteredPlants = useMemo(() => {
//     let result = plants.filter(p => p.category === activeCat)
//     if (search) result = result.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
//     return result
//   }, [activeCat, search])

//   const addPlant = (plant) => {
//     setForm(f => {
//       const existing = f.selectedPlants.find(sp => sp.id === plant.id)
//       if (existing) {
//         return { ...f, selectedPlants: f.selectedPlants.map(sp => sp.id === plant.id ? { ...sp, qty: sp.qty + 1 } : sp) }
//       }
//       return { ...f, selectedPlants: [...f.selectedPlants, { ...plant, qty: 1, potSize: '6 inch' }] }
//     })
//   }

//   const updateQty = (id, delta) => {
//     setForm(f => ({
//       ...f,
//       selectedPlants: f.selectedPlants
//         .map(sp => sp.id === id ? { ...sp, qty: Math.max(0, sp.qty + delta) } : sp)
//         .filter(sp => sp.qty > 0)
//     }))
//   }

//   const updatePotSize = (id, potSize) => {
//     setForm(f => ({ ...f, selectedPlants: f.selectedPlants.map(sp => sp.id === id ? { ...sp, potSize } : sp) }))
//   }

//   const removePlant = (id) => {
//     setForm(f => ({ ...f, selectedPlants: f.selectedPlants.filter(sp => sp.id !== id) }))
//   }

//   const totalQty = form.selectedPlants.reduce((s, p) => s + p.qty, 0)
//   const estimatedTotal = form.selectedPlants.reduce((s, p) => s + p.price * p.qty, 0)

//   return (
//     <div>
//       <h2 className="font-display text-2xl font-bold mb-2">Select Your <em className="text-green italic">Plants</em></h2>
//       <p className="text-slate-400 text-sm mb-6">Browse by category, add plants and set quantities.</p>

//       <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
//         {/* Left: Browse */}
//         <div className="lg:col-span-3">
//           {/* Search */}
//           <input
//             type="text"
//             placeholder="🔍 Search plant name..."
//             value={search}
//             onChange={e => setSearch(e.target.value)}
//             className="input text-sm mb-4 w-full"
//           />

//           {/* Category pills */}
//           <div className="flex flex-wrap gap-2 mb-4">
//             {plantCategories.map(cat => (
//               <button key={cat} onClick={() => setActiveCat(cat)}
//                 className={`text-xs px-3 py-1.5 rounded-full border font-medium transition-all ${
//                   activeCat === cat ? 'bg-green text-bg border-green' : 'border-white/10 text-slate-400 hover:border-green/40 hover:text-green'
//                 }`}
//               >
//                 {cat}
//               </button>
//             ))}
//           </div>

//           {/* Plant list */}
//           <div className="space-y-2 max-h-[380px] overflow-y-auto pr-1" style={{ scrollbarWidth: 'thin', scrollbarColor: '#16a34a #0b1120' }}>
//             {filteredPlants.map(plant => {
//               const inCart = form.selectedPlants.find(sp => sp.id === plant.id)
//               return (
//                 <motion.div
//                   key={plant.id}
//                   layout
//                   className={`flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer ${
//                     inCart ? 'bg-green/10 border-green/30' : 'bg-white/[0.02] border-white/5 hover:border-green/20 hover:bg-white/[0.04]'
//                   }`}
//                   onClick={() => addPlant(plant)}
//                 >
//                   <img src={plant.image} alt={plant.name} className="w-12 h-12 rounded-lg object-cover flex-shrink-0" />
//                   <div className="flex-1 min-w-0">
//                     <p className="text-white text-sm font-semibold truncate">{plant.name}</p>
//                     <div className="flex items-center gap-2 mt-0.5">
//                       <span className="text-slate-500 text-xs">{plant.category}</span>
//                       <span className="text-yellow-400 text-xs">★ {plant.rating}</span>
//                     </div>
//                   </div>
//                   <div className="text-right flex-shrink-0">
//                     <p className="text-green font-bold text-sm">₹{plant.price.toLocaleString()}</p>
//                     <button
//                       onClick={e => { e.stopPropagation(); addPlant(plant) }}
//                       className={`mt-1 text-xs px-2.5 py-1 rounded-full font-semibold transition-all ${
//                         inCart ? 'bg-green/20 text-green border border-green/30' : 'bg-green text-bg hover:bg-green-light'
//                       }`}
//                     >
//                       {inCart ? `Added (${inCart.qty})` : '+ Add'}
//                     </button>
//                   </div>
//                 </motion.div>
//               )
//             })}
//             {filteredPlants.length === 0 && (
//               <div className="text-center py-8 text-slate-500 text-sm">No plants found</div>
//             )}
//           </div>
//         </div>

//         {/* Right: Cart */}
//         <div className="lg:col-span-2">
//           <div className="bg-white/[0.03] border border-white/8 rounded-2xl p-4 sticky top-24">
//             <div className="flex items-center justify-between mb-4">
//               <h3 className="font-semibold text-white text-sm flex items-center gap-2">
//                 <ShoppingBag size={15} className="text-green" />
//                 Quote List
//               </h3>
//               <span className="bg-green text-bg text-xs font-bold px-2 py-0.5 rounded-full">{totalQty} plants</span>
//             </div>

//             {form.selectedPlants.length === 0 ? (
//               <div className="text-center py-8">
//                 <div className="text-4xl mb-2">🌱</div>
//                 <p className="text-slate-500 text-xs">Add plants from the left to build your quote</p>
//               </div>
//             ) : (
//               <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1" style={{ scrollbarWidth: 'thin', scrollbarColor: '#16a34a #0b1120' }}>
//                 {form.selectedPlants.map(sp => (
//                   <div key={sp.id} className="flex gap-2 p-2.5 bg-white/[0.03] rounded-xl border border-white/5">
//                     <img src={sp.image} alt={sp.name} className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
//                     <div className="flex-1 min-w-0">
//                       <p className="text-white text-xs font-semibold truncate">{sp.name}</p>
//                       {/* Pot size */}
//                       <select
//                         value={sp.potSize}
//                         onChange={e => { e.stopPropagation(); updatePotSize(sp.id, e.target.value) }}
//                         className="text-xs bg-white/5 border border-white/10 text-slate-300 rounded-md px-1.5 py-0.5 mt-1 w-full focus:outline-none focus:border-green/50 cursor-pointer"
//                         onClick={e => e.stopPropagation()}
//                       >
//                         {potSizes.map(s => <option key={s} value={s} className="bg-bg-2">{s}</option>)}
//                       </select>
//                       {/* Qty controls */}
//                       <div className="flex items-center gap-1.5 mt-1.5">
//                         <button onClick={() => updateQty(sp.id, -1)} className="w-5 h-5 bg-white/10 hover:bg-red-500/30 rounded flex items-center justify-center text-white text-xs transition-colors"><Minus size={10} /></button>
//                         <span className="text-white text-xs font-bold w-5 text-center">{sp.qty}</span>
//                         <button onClick={() => updateQty(sp.id, 1)} className="w-5 h-5 bg-white/10 hover:bg-green/30 rounded flex items-center justify-center text-white text-xs transition-colors"><Plus size={10} /></button>
//                         <span className="text-green text-xs ml-auto font-semibold">₹{(sp.price * sp.qty).toLocaleString()}</span>
//                         <button onClick={() => removePlant(sp.id)} className="text-slate-500 hover:text-red-400 transition-colors ml-1"><Trash2 size={11} /></button>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}

//             {form.selectedPlants.length > 0 && (
//               <div className="mt-3 pt-3 border-t border-white/10">
//                 <div className="flex justify-between text-xs mb-1">
//                   <span className="text-slate-400">Estimated Total</span>
//                   <span className="text-green font-bold">₹{estimatedTotal.toLocaleString()}</span>
//                 </div>
//                 <p className="text-slate-600 text-[10px]">* Final price confirmed in quotation</p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// // ─── STEP 3: Project Details ───────────────────────────────────────────────────
// function Step3({ form, setForm }) {
//   const set = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }))

//   return (
//     <div>
//       <h2 className="font-display text-2xl font-bold mb-2">Project <em className="text-green italic">Details</em></h2>
//       <p className="text-slate-400 text-sm mb-8">Help us understand the scope and requirements.</p>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//         {/* Total quantity */}
//         <div>
//           <label className="block text-xs text-slate-400 font-semibold mb-2 uppercase tracking-widest">Total Plants Required</label>
//           <div className="flex items-center gap-3">
//             <button onClick={() => setForm(f => ({ ...f, totalUnits: Math.max(1, (f.totalUnits || 1) - 1) }))}
//               className="w-10 h-10 bg-white/5 border border-white/10 hover:border-green/40 rounded-xl flex items-center justify-center text-white transition-colors">
//               <Minus size={16} />
//             </button>
//             <input
//               type="number" min={1} max={10000}
//               value={form.totalUnits || ''}
//               onChange={set('totalUnits')}
//               placeholder="e.g. 50"
//               className="input text-center text-lg font-bold flex-1"
//             />
//             <button onClick={() => setForm(f => ({ ...f, totalUnits: (f.totalUnits || 0) + 1 }))}
//               className="w-10 h-10 bg-white/5 border border-white/10 hover:border-green/40 rounded-xl flex items-center justify-center text-white transition-colors">
//               <Plus size={16} />
//             </button>
//           </div>
//         </div>

//         {/* Budget */}
//         <div>
//           <label className="block text-xs text-slate-400 font-semibold mb-2 uppercase tracking-widest">Budget Range</label>
//           <select value={form.budget} onChange={set('budget')} className="input text-sm cursor-pointer w-full">
//             <option value="" className="bg-bg-2">Select budget range</option>
//             {budgetRanges.map(b => <option key={b} value={b} className="bg-bg-2">{b}</option>)}
//           </select>
//         </div>

//         {/* Delivery timeline */}
//         <div>
//           <label className="block text-xs text-slate-400 font-semibold mb-2 uppercase tracking-widest">Delivery Timeline</label>
//           <select value={form.timeline} onChange={set('timeline')} className="input text-sm cursor-pointer w-full">
//             <option value="" className="bg-bg-2">Select timeline</option>
//             {deliveryTimelines.map(t => <option key={t} value={t} className="bg-bg-2">{t}</option>)}
//           </select>
//         </div>

//         {/* Location */}
//         <div>
//           <label className="block text-xs text-slate-400 font-semibold mb-2 uppercase tracking-widest">Delivery State</label>
//           <select value={form.state} onChange={set('state')} className="input text-sm cursor-pointer w-full">
//             <option value="" className="bg-bg-2">Select state</option>
//             {indianStates.map(s => <option key={s} value={s} className="bg-bg-2">{s}</option>)}
//           </select>
//         </div>

//         {/* City */}
//         <div>
//           <label className="block text-xs text-slate-400 font-semibold mb-2 uppercase tracking-widest">City / Area</label>
//           <input type="text" placeholder="e.g. Hyderabad, Jubilee Hills" value={form.city} onChange={set('city')} className="input text-sm" />
//         </div>

//         {/* Planting space */}
//         <div>
//           <label className="block text-xs text-slate-400 font-semibold mb-2 uppercase tracking-widest">Space / Area (sq ft)</label>
//           <input type="text" placeholder="e.g. 500 sq ft balcony" value={form.spaceArea} onChange={set('spaceArea')} className="input text-sm" />
//         </div>

//         {/* Special requirements */}
//         <div className="md:col-span-2">
//           <label className="block text-xs text-slate-400 font-semibold mb-2 uppercase tracking-widest">Special Requirements</label>
//           <textarea
//             rows={4}
//             placeholder="E.g. Need drought-tolerant plants for full sun exposure. Prefer village-style flowering plants. Need plants with minimal maintenance for office..."
//             value={form.requirements}
//             onChange={set('requirements')}
//             className="input text-sm resize-none w-full"
//           />
//         </div>

//         {/* Installation */}
//         <div className="md:col-span-2">
//           <label className="block text-xs text-slate-400 font-semibold mb-2 uppercase tracking-widest">Additional Services Needed</label>
//           <div className="flex flex-wrap gap-2">
//             {['Planting & Installation', 'Pots & Planters', 'Soil & Fertilisers', 'Care Training', 'Maintenance Contract', 'Interior Design Consultation'].map(service => (
//               <button
//                 key={service}
//                 onClick={() => setForm(f => ({
//                   ...f,
//                   additionalServices: f.additionalServices?.includes(service)
//                     ? f.additionalServices.filter(s => s !== service)
//                     : [...(f.additionalServices || []), service]
//                 }))}
//                 className={`text-xs px-3.5 py-2 rounded-full border font-medium transition-all ${
//                   form.additionalServices?.includes(service)
//                     ? 'bg-green/20 text-green border-green/40'
//                     : 'border-white/10 text-slate-400 hover:border-green/30 hover:text-green'
//                 }`}
//               >
//                 {form.additionalServices?.includes(service) ? '✓ ' : ''}{service}
//               </button>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// // ─── STEP 4: Personal Info ─────────────────────────────────────────────────────
// function Step4({ form, setForm }) {
//   const set = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }))

//   return (
//     <div>
//       <h2 className="font-display text-2xl font-bold mb-2">Your <em className="text-green italic">Details</em></h2>
//       <p className="text-slate-400 text-sm mb-8">We'll send the quotation to your email and WhatsApp within 2 hours.</p>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//         {/* Name */}
//         <div>
//           <label className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold mb-2 uppercase tracking-widest">
//             <User size={12} className="text-green" /> Full Name *
//           </label>
//           <input type="text" placeholder="Ananya Iyer" required value={form.name} onChange={set('name')} className="input text-sm" />
//         </div>

//         {/* Email */}
//         <div>
//           <label className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold mb-2 uppercase tracking-widest">
//             <Mail size={12} className="text-green" /> Email Address *
//           </label>
//           <input type="email" placeholder="ananya@example.com" required value={form.email} onChange={set('email')} className="input text-sm" />
//         </div>

//         {/* Phone */}
//         <div>
//           <label className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold mb-2 uppercase tracking-widest">
//             <Phone size={12} className="text-green" /> WhatsApp / Phone *
//           </label>
//           <div className="flex gap-2">
//             <span className="input w-14 text-sm text-center flex-shrink-0 flex items-center justify-center text-slate-400">+91</span>
//             <input type="tel" placeholder="98765 43210" required value={form.phone} onChange={set('phone')} className="input text-sm flex-1" />
//           </div>
//         </div>

//         {/* Organisation */}
//         <div>
//           <label className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold mb-2 uppercase tracking-widest">
//             <Building2 size={12} className="text-green" /> Company / Organisation (optional)
//           </label>
//           <input type="text" placeholder="e.g. Green Hotels Pvt Ltd" value={form.company} onChange={set('company')} className="input text-sm" />
//         </div>

//         {/* Full address */}
//         <div className="md:col-span-2">
//           <label className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold mb-2 uppercase tracking-widest">
//             <MapPin size={12} className="text-green" /> Delivery Address
//           </label>
//           <input type="text" placeholder="Flat / House No., Street, Area, City, PIN" value={form.address} onChange={set('address')} className="input text-sm" />
//         </div>

//         {/* How did you hear */}
//         <div>
//           <label className="block text-xs text-slate-400 font-semibold mb-2 uppercase tracking-widest">How did you find us?</label>
//           <select value={form.referral} onChange={set('referral')} className="input text-sm cursor-pointer w-full">
//             <option value="" className="bg-bg-2">Select source</option>
//             {['Google Search', 'Instagram', 'Facebook', 'Friend / Word of Mouth', 'WhatsApp', 'YouTube', 'Other'].map(s => (
//               <option key={s} value={s} className="bg-bg-2">{s}</option>
//             ))}
//           </select>
//         </div>

//         {/* Preferred contact */}
//         <div>
//           <label className="block text-xs text-slate-400 font-semibold mb-2 uppercase tracking-widest">Preferred Contact Method</label>
//           <div className="flex gap-2">
//             {['Email', 'WhatsApp', 'Phone Call'].map(method => (
//               <button
//                 key={method}
//                 onClick={() => setForm(f => ({ ...f, contactMethod: method }))}
//                 className={`flex-1 text-xs py-2.5 rounded-xl border font-semibold transition-all ${
//                   form.contactMethod === method ? 'bg-green/20 text-green border-green/40' : 'border-white/10 text-slate-400 hover:border-green/30'
//                 }`}
//               >
//                 {method}
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Message */}
//         <div className="md:col-span-2">
//           <label className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold mb-2 uppercase tracking-widest">
//             <MessageSquare size={12} className="text-green" /> Any Message / Instructions
//           </label>
//           <textarea rows={3} placeholder="Any specific instructions, questions, or notes for our team..." value={form.message} onChange={set('message')} className="input text-sm resize-none w-full" />
//         </div>
//       </div>
//     </div>
//   )
// }

// // ─── STEP 5: Confirm ──────────────────────────────────────────────────────────
// function Step5({ form }) {
//   const totalQty  = form.selectedPlants.reduce((s, p) => s + p.qty, 0)
//   const totalCost = form.selectedPlants.reduce((s, p) => s + p.price * p.qty, 0)
//   const primaryLabel = primaryCategories.find(c => c.id === form.primaryCategory)?.label || '—'
//   const subLabel = (subCategories[form.primaryCategory] || []).find(s => s.id === form.subCategory)?.label || '—'

//   const rows = [
//     { label: 'Purpose', value: `${primaryLabel} › ${subLabel}` },
//     { label: 'Total Plants', value: `${totalQty} plants` },
//     { label: 'Estimated Value', value: `₹${totalCost.toLocaleString()}` },
//     { label: 'Budget Range', value: form.budget || 'Not specified' },
//     { label: 'Delivery Timeline', value: form.timeline || 'Not specified' },
//     { label: 'Location', value: [form.city, form.state].filter(Boolean).join(', ') || 'Not specified' },
//     { label: 'Space Area', value: form.spaceArea || 'Not specified' },
//     { label: 'Name', value: form.name || '—' },
//     { label: 'Email', value: form.email || '—' },
//     { label: 'Phone', value: form.phone ? `+91 ${form.phone}` : '—' },
//     { label: 'Company', value: form.company || 'Individual' },
//     { label: 'Contact Via', value: form.contactMethod || 'Email' },
//   ]

//   return (
//     <div>
//       <h2 className="font-display text-2xl font-bold mb-2">Review Your <em className="text-green italic">Quote Request</em></h2>
//       <p className="text-slate-400 text-sm mb-8">Check all details before submitting. We'll respond within 2 hours.</p>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
//         {/* Summary table */}
//         <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-5">
//           <h3 className="text-white font-semibold text-sm mb-4 flex items-center gap-2"><Package size={14} className="text-green" /> Quote Summary</h3>
//           <div className="space-y-2.5">
//             {rows.slice(0, 7).map(({ label, value }) => (
//               <div key={label} className="flex justify-between gap-4">
//                 <span className="text-slate-500 text-xs flex-shrink-0">{label}</span>
//                 <span className="text-slate-200 text-xs font-medium text-right">{value}</span>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Personal info */}
//         <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-5">
//           <h3 className="text-white font-semibold text-sm mb-4 flex items-center gap-2"><User size={14} className="text-green" /> Your Details</h3>
//           <div className="space-y-2.5">
//             {rows.slice(7).map(({ label, value }) => (
//               <div key={label} className="flex justify-between gap-4">
//                 <span className="text-slate-500 text-xs flex-shrink-0">{label}</span>
//                 <span className="text-slate-200 text-xs font-medium text-right break-all">{value}</span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Plant list */}
//       {form.selectedPlants.length > 0 && (
//         <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-5 mb-6">
//           <h3 className="text-white font-semibold text-sm mb-4 flex items-center gap-2"><Leaf size={14} className="text-green" /> Selected Plants ({totalQty} units)</h3>
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
//             {form.selectedPlants.map(sp => (
//               <div key={sp.id} className="flex items-center gap-3 p-2.5 bg-white/[0.03] rounded-xl border border-white/5">
//                 <img src={sp.image} alt={sp.name} className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
//                 <div className="flex-1 min-w-0">
//                   <p className="text-white text-xs font-semibold truncate">{sp.name}</p>
//                   <p className="text-slate-500 text-[10px]">{sp.potSize} · Qty: {sp.qty}</p>
//                 </div>
//                 <span className="text-green text-xs font-bold flex-shrink-0">₹{(sp.price * sp.qty).toLocaleString()}</span>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Additional services */}
//       {form.additionalServices?.length > 0 && (
//         <div className="bg-green/5 border border-green/20 rounded-2xl px-5 py-3 mb-4">
//           <p className="text-green text-xs font-semibold mb-2">Additional Services Requested</p>
//           <div className="flex flex-wrap gap-2">
//             {form.additionalServices.map(s => <span key={s} className="text-xs text-slate-300 bg-white/5 border border-white/10 px-2.5 py-1 rounded-full">{s}</span>)}
//           </div>
//         </div>
//       )}

//       <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-4 text-amber-300 text-xs leading-relaxed">
//         ⚡ Our team will prepare a detailed, itemised quotation and contact you via <strong>{form.contactMethod || 'Email'}</strong> within <strong>2 business hours</strong>. The quotation is free with no obligation.
//       </div>
//     </div>
//   )
// }

// // ─── SUCCESS SCREEN ───────────────────────────────────────────────────────────
// function SuccessScreen({ form }) {
//   const quoteId = `GCO-${Date.now().toString().slice(-6)}`
//   return (
//     <motion.div
//       initial={{ opacity: 0, scale: 0.95 }}
//       animate={{ opacity: 1, scale: 1 }}
//       className="text-center py-10 max-w-lg mx-auto"
//     >
//       <motion.div
//         initial={{ scale: 0 }}
//         animate={{ scale: 1 }}
//         transition={{ type: 'spring', delay: 0.2 }}
//         className="w-20 h-20 bg-green/20 border border-green/40 rounded-full flex items-center justify-center mx-auto mb-6"
//       >
//         <Check size={36} className="text-green" strokeWidth={2.5} />
//       </motion.div>
//       <h2 className="font-display text-3xl font-black mb-3">
//         Quote Request <em className="text-green italic">Submitted!</em>
//       </h2>
//       <p className="text-slate-400 mb-2">
//         Thank you, <strong className="text-white">{form.name || 'there'}</strong>! Your quote request has been received.
//       </p>
//       <div className="inline-flex items-center gap-2 bg-green/10 border border-green/30 text-green text-sm font-semibold px-4 py-2 rounded-full mb-6">
//         Quote ID: {quoteId}
//       </div>
//       <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-5 text-left mb-8 space-y-2">
//         <p className="text-white font-semibold text-sm mb-3">What happens next?</p>
//         {[
//           { icon: '📧', text: `Confirmation sent to ${form.email || 'your email'}` },
//           { icon: '📱', text: `WhatsApp notification to +91 ${form.phone || 'your number'}` },
//           { icon: '⏱️', text: 'Detailed quote prepared within 2 business hours' },
//           { icon: '🤝', text: 'Our botanist will call to discuss your requirements' },
//         ].map(({ icon, text }) => (
//           <div key={text} className="flex items-start gap-3 text-slate-300 text-sm">
//             <span>{icon}</span>{text}
//           </div>
//         ))}
//       </div>
//       <div className="flex flex-col sm:flex-row gap-3 justify-center">
//         <Link to="/" className="btn-primary">
//           Back to Home <ArrowRight size={16} />
//         </Link>
//         <Link to="/shop" className="btn-outline">
//           Browse More Plants
//         </Link>
//       </div>
//     </motion.div>
//   )
// }

// // ─── MAIN GetQuote page ────────────────────────────────────────────────────────
// const INITIAL_FORM = {
//   primaryCategory: '', subCategory: '',
//   selectedPlants: [],
//   totalUnits: '', budget: '', timeline: '', state: '', city: '', spaceArea: '',
//   requirements: '', additionalServices: [],
//   name: '', email: '', phone: '', company: '', address: '',
//   referral: '', contactMethod: 'Email', message: '',
// }

// export default function GetQuote() {
//   const [step, setStep] = useState(1)
//   const [form, setForm] = useState(INITIAL_FORM)
//   const [submitted, setSubmitted] = useState(false)
//   const [submitting, setSubmitting] = useState(false)

//   const canProceed = () => {
//     if (step === 1) return !!form.primaryCategory
//     if (step === 2) return form.selectedPlants.length > 0
//     if (step === 3) return !!form.totalUnits
//     if (step === 4) return !!form.name && !!form.email && !!form.phone
//     return true
//   }

//   const handleSubmit = async () => {
//     setSubmitting(true)
//     await new Promise(r => setTimeout(r, 2000))
//     setSubmitting(false)
//     setSubmitted(true)
//   }

//   const next = () => { if (canProceed()) setStep(s => Math.min(5, s + 1)) }
//   const back = () => setStep(s => Math.max(1, s - 1))

//   const stepComponents = { 1: Step1, 2: Step2, 3: Step3, 4: Step4, 5: Step5 }
//   const StepComponent = stepComponents[step]

//   return (
//     <main className="min-h-screen bg-bg pt-24 pb-20">
//       {/* Hero header */}
//       <div className="relative bg-bg-3 border-b border-white/5 py-14 px-[5%] overflow-hidden">
//         <div className="orb w-80 h-80 bg-green/8 top-[-120px] right-0 animate-float" />
//         <div className="orb w-60 h-60 bg-green/5 bottom-[-80px] left-[-40px] animate-float-slow" />
//         <div className="max-w-7xl mx-auto relative z-10">
//           <Reveal>
//             <div className="inline-flex items-center gap-2 bg-green/10 border border-green/30 text-green text-xs font-semibold px-4 py-2 rounded-full mb-4 tracking-widest uppercase">
//               <span className="w-1.5 h-1.5 bg-green rounded-full animate-pulse" />
//               Free — No Obligation
//             </div>
//             <h1 className="font-display text-4xl md:text-5xl font-black mb-3">
//               Get Your Custom <em className="text-green italic">Plant Quote</em>
//             </h1>
//             <p className="text-slate-400 max-w-xl text-sm md:text-base">
//               Tell us your requirements — residential, commercial, events, or bulk. Our botanists will prepare a detailed, personalised quotation within 2 hours.
//             </p>
//           </Reveal>

//           {/* Trust badges */}
//           <div className="flex flex-wrap gap-3 mt-6">
//             {['✅ Free Consultation', '⚡ 2-Hour Response', '🌿 Expert Botanists', '📦 Nationwide Delivery', '💯 No Obligation'].map(badge => (
//               <span key={badge} className="text-xs text-slate-400 bg-white/5 border border-white/8 px-3 py-1.5 rounded-full">{badge}</span>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Form */}
//       <div className="max-w-5xl mx-auto px-[5%] py-12">
//         {!submitted ? (
//           <>
//             <StepBar current={step} />

//             <AnimatePresence mode="wait">
//               <motion.div
//                 key={step}
//                 initial={{ opacity: 0, x: 30 }}
//                 animate={{ opacity: 1, x: 0 }}
//                 exit={{ opacity: 0, x: -30 }}
//                 transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
//                 className="bg-white/[0.02] border border-white/5 rounded-3xl p-6 md:p-10 mb-8"
//               >
//                 <StepComponent form={form} setForm={setForm} />
//               </motion.div>
//             </AnimatePresence>

//             {/* Navigation */}
//             <div className="flex items-center justify-between">
//               <button
//                 onClick={back}
//                 disabled={step === 1}
//                 className={`flex items-center gap-2 px-6 py-3 rounded-xl border font-semibold text-sm transition-all ${
//                   step === 1 ? 'opacity-0 pointer-events-none' : 'border-white/10 text-slate-400 hover:border-green/40 hover:text-green'
//                 }`}
//               >
//                 <ChevronLeft size={16} /> Back
//               </button>

//               <div className="text-xs text-slate-500">
//                 Step {step} of {STEPS.length}
//               </div>

//               {step < 5 ? (
//                 <button
//                   onClick={next}
//                   disabled={!canProceed()}
//                   className={`flex items-center gap-2 px-7 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
//                     canProceed()
//                       ? 'bg-green text-bg hover:bg-green-light hover:shadow-[0_0_25px_rgba(34,197,94,0.4)] hover:-translate-y-0.5'
//                       : 'bg-white/5 text-slate-600 cursor-not-allowed border border-white/5'
//                   }`}
//                 >
//                   Continue <ChevronRight size={16} />
//                 </button>
//               ) : (
//                 <button
//                   onClick={handleSubmit}
//                   disabled={submitting}
//                   className="flex items-center gap-2 px-8 py-3 rounded-xl bg-green text-bg font-bold text-sm hover:bg-green-light hover:shadow-[0_0_25px_rgba(34,197,94,0.4)] transition-all duration-300 hover:-translate-y-0.5"
//                 >
//                   {submitting ? (
//                     <><div className="w-4 h-4 border-2 border-bg/30 border-t-bg rounded-full animate-spin" /> Submitting...</>
//                   ) : (
//                     <><Send size={15} /> Submit Quote Request</>
//                   )}
//                 </button>
//               )}
//             </div>
//           </>
//         ) : (
//           <SuccessScreen form={form} />
//         )}
//       </div>

//       {/* Side info */}
//       {!submitted && (
//         <div className="max-w-5xl mx-auto px-[5%]">
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//             {[
//               { emoji: '🌿', title: 'Expert Curation', desc: 'Our botanists hand-pick every plant to match your space and climate.' },
//               { emoji: '⚡', title: 'Fast Turnaround', desc: 'Detailed quote with itemised pricing delivered within 2 business hours.' },
//               { emoji: '🤝', title: 'Dedicated Support', desc: 'A dedicated plant consultant guides you from quote to delivery.' },
//             ].map(({ emoji, title, desc }) => (
//               <div key={title} className="flex gap-3 bg-white/[0.02] border border-white/5 rounded-2xl p-4">
//                 <span className="text-2xl flex-shrink-0">{emoji}</span>
//                 <div>
//                   <p className="text-white font-semibold text-sm">{title}</p>
//                   <p className="text-slate-500 text-xs leading-relaxed mt-0.5">{desc}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </main>
//   )
// }


import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const plantCategories = [
  'Avenue plants', 'Palms', 'Flowers', 'Creepers', 'Fruit Plants', 
  'Cactus Varieties', 'Adeniums', 'Aquatic Plants', 'Hangings', 
  'Ornamental plants', 'Topiaries', 'Outdoor Plants', 'Indoor Plants', 
  'Ground Covers', 'Bonsai plants', 'Mango Varieties', 'Bamboo Varieties', 
  'Coconut Varieties', 'Olives Trees', 'Bougainvillea'
];

const plantVarieties = {
  'Avenue plants': ['Lagerstroemia', 'Cadamba', 'Silver Hook', 'Filicium Decipiens', 'Elaeocarpus Rudraksha'],
  'Palms': ['Royal Palm', 'Bottle Palm', 'Areca Palm', 'Date Palm', 'Fan Palm'],
  // Add more categories and varieties as needed
};

export default function GetQuote() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    city: '',
    state: '',
    pinCode: '',
    phone: '',
    email: '',
    plantCategory: '',
    plantVariety: '',
    quantity: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log(form);
    alert('Quote request submitted! We will contact you soon.');
  };

  return (
    <main className="min-h-screen bg-bg pt-24 pb-20 px-[5%]">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-display text-3xl md:text-4xl font-black mb-3">
            Get Your <em className="text-green italic">Plant Quote</em>
          </h1>
          <p className="text-slate-400 max-w-xl mx-auto">
            Please fill the order details below and you will get a quotation
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-bg-2 border border-white/5 rounded-2xl p-8">
          {/* Personal Details */}
          <div className="mb-8">
            <h2 className="font-semibold text-white text-lg mb-4">Personal Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-slate-400 font-semibold mb-2 uppercase tracking-widest">*First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  required
                  className="input w-full"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 font-semibold mb-2 uppercase tracking-widest">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  className="input w-full"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 font-semibold mb-2 uppercase tracking-widest">*City</label>
                <input
                  type="text"
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  required
                  className="input w-full"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 font-semibold mb-2 uppercase tracking-widest">*State</label>
                <select
                  name="state"
                  value={form.state}
                  onChange={handleChange}
                  required
                  className="input w-full"
                >
                  <option value="">Select State</option>
                  <option value="Telangana">Telangana</option>
                  <option value="Andhra Pradesh">Andhra Pradesh</option>
                  {/* Add more states */}
                </select>
              </div>
              <div>
                <label className="block text-xs text-slate-400 font-semibold mb-2 uppercase tracking-widest">*Pin Code</label>
                <input
                  type="text"
                  name="pinCode"
                  value={form.pinCode}
                  onChange={handleChange}
                  required
                  className="input w-full"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 font-semibold mb-2 uppercase tracking-widest">*Phone</label>
                <div className="flex">
                  <span className="input w-14 text-center flex-shrink-0 flex items-center justify-center text-slate-400">+91</span>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    required
                    className="input flex-1 rounded-l-none"
                  />
                </div>
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs text-slate-400 font-semibold mb-2 uppercase tracking-widest">*Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="input w-full"
                />
              </div>
            </div>
          </div>

          {/* Plants Order Details */}
          <div className="mb-8">
            <h2 className="font-semibold text-white text-lg mb-4">Plants Order Details</h2>
            <p className="text-slate-500 text-sm mb-4">Plants minimum order 1 ton weightage (only bulk order)</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-slate-400 font-semibold mb-2 uppercase tracking-widest">Plant Category</label>
                <select
                  name="plantCategory"
                  value={form.plantCategory}
                  onChange={handleChange}
                  className="input w-full"
                >
                  <option value="">Select Category</option>
                  {plantCategories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs text-slate-400 font-semibold mb-2 uppercase tracking-widest">Plant Variety</label>
                <select
                  name="plantVariety"
                  value={form.plantVariety}
                  onChange={handleChange}
                  disabled={!form.plantCategory}
                  className="input w-full disabled:bg-white/5"
                >
                  <option value="">Select Variety</option>
                  {form.plantCategory && plantVarieties[form.plantCategory]?.map(variety => (
                    <option key={variety} value={variety}>{variety}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs text-slate-400 font-semibold mb-2 uppercase tracking-widest">Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  value={form.quantity}
                  onChange={handleChange}
                  placeholder="Enter quantity"
                  className="input w-full"
                />
              </div>
            </div>
          </div>

          {/* Message */}
          <div className="mb-8">
            <label className="block text-xs text-slate-400 font-semibold mb-2 uppercase tracking-widest">Your Message</label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              rows={4}
              className="input w-full"
              placeholder="Any special instructions or additional information..."
            ></textarea>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              className="btn-outline"
            >
              Reset
            </button>
            <button
              type="submit"
              className="btn-primary"
            >
              Submit <ArrowRight size={16} />
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}