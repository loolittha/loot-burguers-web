import Link from 'next/link'
import Navbar from '@/components/Navbar'
import MenuSection from '@/components/MenuSection'
import BurgerCarousel from '@/components/BurgerCarousel'
import Image from 'next/image'

// ─── Checkered divider ────────────────────────────────────────────────────────
function CheckerStrip() {
  return (
    <div
      className="w-full h-5 z-20 relative shadow-sm"
      style={{
        backgroundImage: 'conic-gradient(#C1121F 90deg, #F5E6D3 90deg 180deg, #C1121F 180deg 270deg, #F5E6D3 270deg)',
        backgroundSize: '24px 24px',
      }}
      aria-hidden="true"
    />
  )
}

// ─── Hero — dos columnas sobre fondo crema ────────────────────────────────────
function Hero() {
  return (
    <section
      className="w-full"
      aria-label="Loot Burgers — Smash burgers artesanales"
      style={{ backgroundColor: 'var(--cream)' }}
    >
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-20 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

        {/* ── Columna izquierda: textos ── */}
        <div>
          {/* Título principal */}
          <h1
            className="text-6xl sm:text-7xl md:text-8xl leading-[0.95] mb-6"
            style={{ fontFamily: 'var(--font-lilita)' }}
          >
            <span style={{ color: '#1E1E1E' }}>LO SIMPLE,</span>
            <br />
            <span style={{ color: 'var(--red)' }}>HECHO</span>
            <br />
            <span style={{ color: 'var(--red)' }}>INCREÍBLE.</span>
          </h1>

          {/* Descripción */}
          <p
            className="text-base md:text-lg leading-relaxed mb-8 max-w-sm"
            style={{
              fontFamily: 'var(--font-montserrat)',
              color: '#3D3D3D',
            }}
          >
            Loot ofrece Smash burgers de alta calidad utilizando ingredientes
            sofisticados. Salsas especiales y secretas.
          </p>

          {/* CTA */}
          <Link
            href="#menu"
            id="hero-cta-btn"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-lg font-extrabold text-sm tracking-widest text-white transition-all duration-200 hover:brightness-110 hover:scale-105 active:scale-95"
            style={{
              backgroundColor: 'var(--red)',
              fontFamily: 'var(--font-montserrat)',
              boxShadow: '0 4px 18px rgba(193,18,31,0.35)',
            }}
          >
            HACÉ TU PEDIDO
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* ── Columna derecha: video ── */}
        <div
          className="rounded-3xl overflow-hidden shadow-2xl w-full"
          style={{ aspectRatio: '4/3' }}
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
            aria-hidden="true"
          >
            <source src="/HeroVideo.mp4" type="video/mp4" />
          </video>
        </div>

      </div>
    </section>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer id="contacto" className="relative z-30 w-full" style={{ backgroundColor: 'var(--red)' }}>


      {/* Contenedor principal */}
      <div className="max-w-6xl mx-auto px-6 pt-6 pb-8">

        {/* Fila superior: Contacto - Logo flotante - Info */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-[#F5E6D3] text-center md:text-left">

          {/* Columna Izquierda: Contacto */}
          <div className="flex flex-col items-center md:items-start gap-2.5">
            <h4
              className="text-lg font-bold tracking-wide mb-1"
              style={{ fontFamily: 'var(--font-montserrat)' }}
            >
              Contacto
            </h4>
            <a
              href="https://www.instagram.com/loot.burgers"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm underline hover:opacity-80 transition-opacity"
              style={{ fontFamily: 'var(--font-montserrat)' }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
              @loot.burgers
            </a>
            <a
              href="https://wa.me/5491178220054"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm underline hover:opacity-80 transition-opacity"
              style={{ fontFamily: 'var(--font-montserrat)' }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              +5491178220054
            </a>
          </div>

          {/* Columna Centro: Logo sobresaliente hacia arriba */}
          <div className="flex flex-col items-center justify-center order-first md:order-none -mt-16 md:-mt-24 relative z-40">
            <Image
              src="/Lootsito.png"
              alt="Loot Burgers"
              width={160}
              height={160}
              priority
              className="w-36 md:w-48 h-auto object-contain drop-shadow-md"
              style={{ background: 'transparent' }}
            />
          </div>

          {/* Columna Derecha: Info */}
          <div className="flex flex-col items-center text-center md:items-end gap-1 text-sm" style={{ fontFamily: 'var(--font-montserrat)' }}>
            <h4 className="text-lg font-bold tracking-wide mb-1">
              Info
            </h4>
            <p className="font-medium text-white/95">
              Viernes – Sábado – Domingo
            </p>
            <p className="font-semibold text-white">
              Delivery &amp; TakeAway
            </p>
          </div>

        </div>

        {/* Separador sutil y Copyright */}
        <div className="mt-8 pt-4 flex flex-col items-center gap-3">
          <div className="w-24 h-[1px] bg-white/30" />
          <p
            className="text-white/80 text-xs tracking-wider text-center"
            style={{ fontFamily: 'var(--font-montserrat)' }}
          >
            © {new Date().getFullYear()} Loot Burgers · Pilar, Buenos Aires
          </p>
        </div>

      </div>
    </footer>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function Page() {
  return (
    <>
      {/* Navbar fixed — fondo crema */}
      <Navbar />

      {/* pt-16 md:pt-20 compensa la altura de la navbar fixed */}
      <main className="pt-16 md:pt-20">

        {/* 1. Hero — dos columnas, fondo crema */}
        <Hero />

        {/* 2. Franja ajedrezada */}
        <CheckerStrip />

        {/* 3. Carrusel "Nuestras Delicias" */}
        <BurgerCarousel />

        {/* 4. Franja ajedrezada */}
        <CheckerStrip />

        {/* 5. Menú interactivo */}
        <MenuSection />

        {/* 6. Franja ajedrezada */}
        <CheckerStrip />

        {/* 7. Footer */}
        <Footer />

      </main>
    </>
  )
}
