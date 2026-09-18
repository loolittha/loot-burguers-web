import Image from 'next/image'
import Link from 'next/link'

// Server Component — barra roja compacta con nav perfectamente centrada
export default function Navbar() {
  return (
    <header
      style={{ backgroundColor: 'var(--red)' }}
      aria-label="Encabezado principal"
    >
      {/* Grid de 3 columnas: logo | nav centrada | espacio derecho */}
      <nav
        className="grid grid-cols-3 items-center px-6 md:px-10 py-2"
        aria-label="Navegación principal"
      >
        {/* Columna 1 — Logo + nombre */}
        <Link
          href="/"
          aria-label="Inicio Loot Burgers"
          className="flex flex-col items-center w-fit"
        >
          <Image
            src="/logo-loot.png"
            alt="Loot Burgers logo"
            width={72}
            height={72}
            priority
            className="object-contain"
            style={{ background: 'transparent' }}
          />
          <span
            className="text-white text-[11px] tracking-widest leading-none mt-0.5"
            style={{ fontFamily: 'var(--font-lilita)' }}
          >
            LOOT BURGUERS
          </span>
        </Link>

        {/* Columna 2 — Nav links, perfectamente centrados */}
        <ul
          className="hidden md:flex items-center justify-center gap-8"
          role="list"
        >
          {[
            { href: '#menu',     label: 'HACÉ TU PEDIDO' },
            { href: '#nosotros', label: 'NOSOTROS'        },
            { href: '#contacto', label: 'CONTACTO'        },
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
              <line x1="3" y1="6"  x2="21" y2="6"  />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
      </nav>
    </header>
  )
}
