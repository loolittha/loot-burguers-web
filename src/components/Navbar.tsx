'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'

const NAV_LINKS = [
  { href: '#menu',     label: 'HACÉ TU PEDIDO' },
  { href: '#nosotros', label: 'NOSOTROS'        },
  { href: '#contacto', label: 'CONTACTO'        },
]

export default function Navbar() {
  const [isOpen,   setIsOpen]   = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const close = () => setIsOpen(false)

  // ── Detectar scroll: glass sobre Hero → crema sólido al bajar ────────────
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // ── Colores según estado ───────────────────────────────────────────────────
  // Glass (sobre Hero oscuro): texto blanco  
  // Scrolled (crema):          texto rojo, línea hover roja
  const linkColor = scrolled ? 'var(--red)' : '#ffffff'

  return (
    <>
      <header
        aria-label="Encabezado principal"
        className={`
          fixed top-0 left-0 right-0
          w-full h-16 md:h-20
          flex items-center justify-center
          z-40
          transition-all duration-500
          ${scrolled ? 'shadow-sm' : 'border-b border-white/10'}
        `}
        style={
          scrolled
            ? { backgroundColor: 'var(--cream)' }
            : {
                backgroundColor: 'rgba(30, 4, 6, 0.30)',
                backdropFilter:       'blur(14px)',
                WebkitBackdropFilter: 'blur(14px)',
              }
        }
      >
        {/* ── Logo superpuesto ── */}
        <Link
          href="/"
          onClick={close}
          aria-label="Inicio Loot Burgers"
          className="absolute left-4 md:left-12 top-2 z-[60] flex flex-col items-center"
        >
          <Image
            src="/logo-loot.png"
            alt="Loot Burgers logo"
            width={200}
            height={200}
            priority
            className="object-contain w-28 md:w-48 h-auto drop-shadow-xl"
            style={{ background: 'transparent' }}
          />
        </Link>

        {/* ── Links desktop ── */}
        <nav aria-label="Navegación principal" className="hidden md:flex">
          <ul className="flex items-center justify-center gap-8" role="list">
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="nav-link text-xs font-extrabold tracking-widest transition-colors duration-500"
                  style={{
                    fontFamily: 'var(--font-montserrat)',
                    color: linkColor,
                  }}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* ── Botón hamburguesa mobile ── */}
        <button
          id="mobile-menu-btn"
          className="md:hidden absolute right-4 p-2 rounded-lg z-[60] transition-colors duration-500"
          style={{ color: linkColor }}
          aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((v) => !v)}
        >
          {isOpen ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="4" y1="4" x2="20" y2="20" />
              <line x1="20" y1="4" x2="4"  y2="20" />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="3" y1="6"  x2="21" y2="6"  />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>
      </header>

      {/* ── Menú móvil desplegable ── */}
      <div
        className={`md:hidden fixed inset-0 z-50 transition-all duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!isOpen}
      >
        {/* Overlay */}
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={close}
        />

        {/* Panel — crema con links en rojo */}
        <nav
          className={`absolute top-0 left-0 right-0 shadow-2xl transition-transform duration-300 ${
            isOpen ? 'translate-y-0' : '-translate-y-full'
          }`}
          style={{ backgroundColor: 'var(--cream)' }}
          aria-label="Menú móvil"
        >
          <div className="h-16" />
          <ul className="flex flex-col items-center gap-0 pb-8" role="list">
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href} className="w-full">
                <Link
                  href={href}
                  onClick={close}
                  className="flex items-center justify-center w-full py-5 text-sm font-extrabold tracking-widest border-b active:opacity-70 transition-opacity"
                  style={{
                    fontFamily:      'var(--font-montserrat)',
                    color:           'var(--red)',
                    borderColor:     'rgba(192,26,35,0.15)',
                  }}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  )
}
