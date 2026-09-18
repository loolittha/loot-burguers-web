'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

const NAV_LINKS = [
  { href: '#menu',     label: 'HACÉ TU PEDIDO' },
  { href: '#nosotros', label: 'NOSOTROS'        },
  { href: '#contacto', label: 'CONTACTO'        },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const close = () => setIsOpen(false)

  return (
    <>
      <header
        style={{ backgroundColor: 'var(--red)' }}
        aria-label="Encabezado principal"
        className="relative w-full h-16 md:h-20 flex items-center justify-center shadow-md z-40"
      >
        {/* ── Logo superpuesto (absolute, cuelga sobre el Hero) ── */}
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
          <span
            className="text-white text-[10px] md:text-[11px] tracking-widest leading-none mt-1"
            style={{ fontFamily: 'var(--font-lilita)' }}
          >
            LOOT BURGUERS
          </span>
        </Link>

        {/* ── Links desktop — columna central ── */}
        <nav aria-label="Navegación principal" className="hidden md:flex">
          <ul className="flex items-center justify-center gap-8" role="list">
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="nav-link text-white text-xs font-extrabold tracking-widest"
                  style={{ fontFamily: 'var(--font-montserrat)' }}
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
          className="md:hidden absolute right-4 text-white p-2 rounded-lg z-[60]"
          aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((v) => !v)}
        >
          {isOpen ? (
            /* ✕ */
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="4" y1="4" x2="20" y2="20" />
              <line x1="20" y1="4" x2="4"  y2="20" />
            </svg>
          ) : (
            /* ☰ */
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
        {/* Overlay oscuro */}
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={close}
        />

        {/* Panel */}
        <nav
          className={`absolute top-0 left-0 right-0 shadow-2xl transition-transform duration-300 ${
            isOpen ? 'translate-y-0' : '-translate-y-full'
          }`}
          style={{ backgroundColor: 'var(--red)' }}
          aria-label="Menú móvil"
        >
          {/* Espacio para el header */}
          <div className="h-16" />

          {/* Links centrados */}
          <ul
            className="flex flex-col items-center gap-0 pb-8"
            role="list"
          >
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href} className="w-full">
                <Link
                  href={href}
                  onClick={close}
                  className="flex items-center justify-center w-full py-5 text-white text-sm font-extrabold tracking-widest border-b border-white/10 active:bg-white/10"
                  style={{ fontFamily: 'var(--font-montserrat)' }}
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
