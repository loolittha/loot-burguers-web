import Image from 'next/image'
import Link from 'next/link'

// Server Component — barra roja compacta con nav perfectamente centrada
export default function Navbar() {
  return (
    <header
      style={{ backgroundColor: 'var(--red)' }}
      aria-label="Encabezado principal"
      className="relative w-full h-16 md:h-20 flex items-center justify-center shadow-md z-40"
    >
      {/* Grid de 3 columnas: logo | nav centrada | espacio derecho */}
      <nav
        className="grid grid-cols-3 items-center px-6 md:px-10 py-2"
        aria-label="Navegación principal"
      >
        {/* Columna 1 — Logo + nombre (absolute para sobresalir del navbar) */}
        <Link
          href="/"
          aria-label="Inicio Loot Burgers"
          className="absolute left-4 md:left-12 top-2 z-[60] flex flex-col items-center"
        >
          <Image
            src="/logo-loot.png"
            alt="Loot Burgers logo"
            width={250}
            height={250}
            priority
            className="object-contain w-32 md:w-48 h-auto drop-shadow-xl"
            style={{ background: 'transparent' }}
          />
          <span
            className="text-white text-[28px] tracking-widest leading-none mt-1"
            style={{ fontFamily: 'var(--font-lilita)' }}
          >
            LOOT BURGUERS
          </span>
        </Link>

        {/* Columna 2 — Nav links, perfectamente centrados */}
        <ul
          className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center justify-center gap-8"
          role="list"
        >
          {[
            { href: '#menu', label: 'HACÉ TU PEDIDO' },
            { href: '#nosotros', label: 'NOSOTROS' },
            { href: '#contacto', label: 'CONTACTO' },
          ].map(({ href, label }) => (
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

        {/* Columna 3 — Botón hamburguesa mobile (se empuja a la derecha) */}
        <div className="flex justify-end">
          <button
            id="mobile-menu-btn"
            className="md:hidden text-white p-2 rounded-lg"
            aria-label="Abrir menú"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
      </nav>
    </header>
  )
}
