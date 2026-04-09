import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    let mouseX = 0, mouseY = 0
    let ringX = 0, ringY = 0

    const onMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX - 6}px, ${mouseY - 6}px)`
      }
    }

    const onEnter = () => {
      if (dotRef.current) dotRef.current.style.transform += ' scale(2)'
      if (ringRef.current) ringRef.current.style.opacity = '1'
    }

    const onLeave = () => {
      if (ringRef.current) ringRef.current.style.opacity = '0.4'
    }

    // Smooth ring follow
    const animate = () => {
      ringX += (mouseX - ringX) * 0.12
      ringY += (mouseY - ringY) * 0.12
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX - 18}px, ${ringY - 18}px)`
      }
      requestAnimationFrame(animate)
    }

    document.addEventListener('mousemove', onMove)
    document.querySelectorAll('a, button').forEach(el => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })
    const raf = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  // Only on desktop
  if (typeof window !== 'undefined' && window.innerWidth < 768) return null

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-3 h-3 bg-green rounded-full pointer-events-none z-[9999] transition-transform duration-100"
        style={{ mixBlendMode: 'screen' }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-9 h-9 border border-green/60 rounded-full pointer-events-none z-[9998] opacity-50"
        style={{ transition: 'opacity 0.2s' }}
      />
    </>
  )
}
