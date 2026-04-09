import { useEffect, useRef, useState } from 'react'

// Hook: returns ref + boolean (is in view?)
export function useInView(options = {}) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          // Optionally unobserve after first trigger
          if (options.once !== false) {
            observer.unobserve(entry.target)
          }
        }
      },
      { threshold: options.threshold || 0.15, ...options }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return [ref, inView]
}

// Hook: scroll position
export function useScroll() {
  const [scrolled, setScrolled] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      setScrollY(window.scrollY)
      setScrolled(window.scrollY > 60)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return { scrolled, scrollY }
}
