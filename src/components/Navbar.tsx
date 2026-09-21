'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'

const NAV_LINKS = [
  { href: '#menu', label: 'BURGERS' },
  { href: '#nosotros', label: 'NOSOTROS' },
  { href: '#ubicacion', label: 'UBICACIÓN' },
  { href: '#contacto', label: 'CONTACTO' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const close = () => setIsOpen(false)

  // Sombra sutil al hacer scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header
        aria-label="Encabezado principal"
        className={`
          fixed top-0 left-0 right-0 z-40
          w-full h-16 md:h-20
          flex items-center justify-between
          px-6 md:px-20
          transition-shadow duration-300
          ${scrolled ? 'shadow-md' : ''}
        `}
        style={{ backgroundColor: 'var(--cream)' }}
      >
        {/* ── Logo izquierda ── */}
        <Link
          href="/"
          onClick={(e) => {
            close?.()
            // Si estoy en la home, hacemos scroll y borramos "#menu"
            if (window.location.pathname === '/' || window.location.pathname === '') {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: 'smooth' })
              window.history.pushState(null, '', window.location.pathname)
            }
          }}
          aria-label="Inicio Loot Burgers"
          className="flex items-center shrink-0 z-10 relative cursor-pointer"
        >
          <Image
            src="/LogoLootMuñeco.png"
            alt="Loot Burgers"
            width={180}
            height={64}
            priority
            className="h-11 md:h-13 w-auto object-contain"
          />
        </Link>

        {/* ── Links desktop — centro/derecha ── */}
        <nav aria-label="Navegación principal" className="hidden md:flex absolute inset-0 items-center justify-center pointer-events-none">
          <ul className="flex items-center gap-10 pointer-events-auto" role="list">
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <a
                  href={href}
                  onClick={(e) => {
                    e.preventDefault()
                    const targetId = href.replace('#', '')
                    document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' })
                    window.history.pushState(null, '', href)
                  }}
                  className="nav-link text-xs font-extrabold tracking-widest cursor-pointer"
                  style={{
                    fontFamily: 'var(--font-montserrat)',
                    color: 'var(--red)',
                  }}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* ── Botón hamburguesa celular ── */}
        <button
          id="mobile-menu-btn"
          className="md:hidden p-2 rounded-lg z-[60]"
          style={{ color: 'var(--red)' }}
          aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((v) => !v)}
        >
          {isOpen ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="4" y1="4" x2="20" y2="20" />
              <line x1="20" y1="4" x2="4" y2="20" />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>
      </header>

      {/* ── Menú móvil desplegable ── */}
      <div
        className={`md:hidden fixed inset-0 z-50 transition-all duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        aria-hidden={!isOpen}
      >
        {/* Overlay */}
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          onClick={close}
        />

        {/* Panel crema con links rojos */}
        <nav
          className={`absolute top-0 left-0 right-0 shadow-xl transition-transform duration-300 ${isOpen ? 'translate-y-0' : '-translate-y-full'
            }`}
          style={{ backgroundColor: 'var(--cream)' }}
          aria-label="Menú móvil"
        >
          {/* Barra superior con botón X */}
          <div className="h-16 flex items-center justify-end px-6">
            <button
              onClick={close}
              aria-label="Cerrar menú"
              className="w-9 h-9 flex items-center justify-center rounded-full transition-colors active:opacity-70"
              style={{ backgroundColor: 'rgba(193,18,31,0.1)', color: 'var(--red)' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round">
                <line x1="4" y1="4" x2="20" y2="20" />
                <line x1="20" y1="4" x2="4" y2="20" />
              </svg>
            </button>
          </div>
          <ul className="flex flex-col items-center gap-0 pb-8" role="list">
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href} className="w-full">
                <a
                  href={href}
                  onClick={(e) => {
                    e.preventDefault()
                    close()
                    const targetId = href.replace('#', '')
                    document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' })
                    window.history.pushState(null, '', href)
                  }}
                  className="flex items-center justify-center w-full py-5 text-sm font-extrabold tracking-widest border-b transition-colors active:opacity-70 cursor-pointer"
                  style={{
                    fontFamily: 'var(--font-montserrat)',
                    color: 'var(--red)',
                    borderColor: 'rgba(193,18,31,0.12)',
                  }}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  )
}
