import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import { AuthProvider, CartProvider } from './context/AppContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Cursor from './components/Cursor'
import LoadingScreen from './components/LoadingScreen'

// Lazy-loaded pages
const Home       = lazy(() => import('./pages/Home'))
const Shop       = lazy(() => import('./pages/Shop'))
const PlantDetail= lazy(() => import('./pages/PlantDetail'))
const About      = lazy(() => import('./pages/About'))
const Blog       = lazy(() => import('./pages/Blog'))
const Contact    = lazy(() => import('./pages/Contact'))
const GetQuote   = lazy(() => import('./pages/GetQuote'))
const Cart       = lazy(() => import('./pages/Cart'))
const Checkout   = lazy(() => import('./pages/CheckOut'))
const Profile    = lazy(() => import('./pages/Profile'))

// ─── Layout wrapper (needs Router context for Navbar links) ───────────────────
function AppLayout() {
  return (
    <>
      <Cursor />
      <Navbar />
      <Suspense fallback={<LoadingScreen />}>
        <Routes>
          <Route path="/"          element={<Home />} />
          <Route path="/shop"      element={<Shop />} />
          <Route path="/shop/:id"  element={<PlantDetail />} />
          <Route path="/about"     element={<About />} />
          <Route path="/blog"      element={<Blog />} />
          <Route path="/contact"   element={<Contact />} />
          <Route path="/get-quote" element={<GetQuote />} />
          <Route path="/cart"      element={<Cart />} />
          <Route path="/checkout"  element={<Checkout />} />
          <Route path="/profile"   element={<Profile />} />
        </Routes>
      </Suspense>
      <Footer />
    </>
  )
}

// ─── Root: BrowserRouter → AuthProvider → CartProvider → Layout ──────────────
// BrowserRouter is outermost so all hooks (useLocation, useNavigate)
// AND context hooks (useAuth, useCart) work everywhere including Navbar.
export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <AppLayout />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}