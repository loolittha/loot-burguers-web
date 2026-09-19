import Image from 'next/image'
import Navbar from '@/components/Navbar'
import MenuSection from '@/components/MenuSection'
import BurgerCarousel from '@/components/BurgerCarousel'

// ─── Checkered divider ────────────────────────────────────────────────────────
function CheckerStrip() {
  return (
    <div
      className="w-full h-5 z-20 relative shadow-sm"
      style={{
        backgroundImage: 'conic-gradient(#C1121F 90deg, #F5E6D3 90deg 180deg, #C1121F 180deg 270deg, #F5E6D3 270deg)',
        backgroundSize: '24px 24px'
      }}
      aria-hidden="true"
    />
  )
}

// ─── Hero — Img ───────────────
function Hero() {
  return (
    <section
      className="relative w-full overflow-hidden h-[450px] md:h-[650px]"
      aria-label="Foto principal Loot Burgers"
    >
      {/* Sombra sutil arriba para que el logo y el texto resalten */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent z-10 pointer-events-none" />

      <Image
        src="/Hero.jpg"
        alt="Hamburguesa Loot Burgers — jugosa y llena de sabor"
        fill
        priority
        quality={100}
        sizes="100vw"
        className="object-cover object-[center_40%] w-full h-full"
      />
    </section>
  )
}


// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer
      id="contacto"
      style={{ backgroundColor: 'var(--red)' }}
      className="py-10 px-6 flex flex-col items-center gap-4"
    >
      <Image
        src="/logo-loot.png"
        alt="Loot Burgers"
        width={120}
        height={120}
        className="object-contain"
        style={{ background: 'transparent' }}
      />
      <p
        className="text-white text-sm font-bold tracking-widest text-center"
        style={{ fontFamily: 'var(--font-montserrat)' }}
      >
        CONTACTO
      </p>
      <p
        className="text-white/70 text-xs text-center"
        style={{ fontFamily: 'var(--font-montserrat)' }}
      >
        © {new Date().getFullYear()} Loot Burgers. Todos los derechos reservados.
      </p>
    </footer>
  )
}

// ─── Page — Server Component ─────────────────────────────────────────────────────────────────
export default function Page() {
  return (
    <>
      {/* Navbar fixed — flota sobre todo el contenido */}
      <Navbar />

      <main>
        {/* 1. Hero — imagen full-width, el navbar glass queda encima */}
        <Hero />

        {/* 2. Franja ajedrezada */}
        <CheckerStrip />

        {/* 3. Carrusel "Nuestras Delicias" */}
        <BurgerCarousel />

        {/* 4. Franja ajedrezada */}
        <CheckerStrip />

        {/* 5. Menú interactivo con tabs */}
        <MenuSection />

        {/* 6. Franja ajedrezada */}
        <CheckerStrip />

        {/* 7. Footer */}
        <Footer />
      </main>
    </>
  )
}
