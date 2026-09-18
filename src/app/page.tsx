import Image from 'next/image'
import Navbar from '@/components/Navbar'
import MenuSection from '@/components/MenuSection'

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

// ─── Nuestras Delicias — showcase visual de 3 burgers ─────────────────────────
function NuestrasDelicias() {
  const burgers = [
    { src: '/CheeseLOOT.jpg',   alt: 'Cheeseburger doble', rotate: '-6deg', scale: '0.88' },
    { src: '/AmericanLOOT.jpg', alt: 'American doble',     rotate: '0deg',  scale: '1'    },
    { src: '/CrispyLOOT.jpg',  alt: 'Crispy Bacon doble', rotate: '6deg',  scale: '0.88' },
  ]

  return (
    <section
      className="py-10 md:py-14 px-0 md:px-16"
      style={{ backgroundColor: 'var(--cream)' }}
      aria-labelledby="delicias-heading"
    >
      {/* Título */}
      <h2
        id="delicias-heading"
        className="text-center text-3xl md:text-5xl mb-8 md:mb-12 px-4"
        style={{ fontFamily: 'var(--font-lilita)', color: 'var(--red)' }}
      >
        NUESTRAS DELICIAS
      </h2>

      {/* Mobile: scroll horizontal sin rotación */}
      <div className="flex md:hidden overflow-x-auto gap-4 px-4 pb-4 snap-x snap-mandatory scrollbar-hide">
        {burgers.map(({ src, alt }) => (
          <div
            key={src}
            className="relative overflow-hidden rounded-2xl shadow-xl flex-none snap-center"
            style={{ width: '72vw', height: '56vw', minWidth: '220px', minHeight: '170px' }}
          >
            <Image
              src={src}
              alt={alt}
              fill
              sizes="72vw"
              quality={90}
              className="object-cover"
            />
          </div>
        ))}
      </div>

      {/* Desktop: efecto inclinado original */}
      <div className="hidden md:flex items-center justify-center gap-8">
        {burgers.map(({ src, alt, rotate, scale }) => (
          <div
            key={src}
            className="relative overflow-hidden rounded-2xl shadow-xl transition-transform duration-300 hover:scale-105 hover:z-10 hover:shadow-2xl"
            style={{
              transform: `rotate(${rotate}) scale(${scale})`,
              width: 'clamp(180px, 28vw, 340px)',
              height: 'clamp(220px, 34vw, 445px)',
              flexShrink: 0,
            }}
          >
            <Image
              src={src}
              alt={alt}
              fill
              sizes="30vw"
              quality={95}
              className="object-cover"
            />
          </div>
        ))}
      </div>
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

// ─── Page — Server Component ──────────────────────────────────────────────────
export default function Page() {
  return (
    <main>
      {/* 1. Barra de navegación roja */}
      <Navbar />

      {/* 2. Hero — imagen full-width */}
      <Hero />

      {/* 3. Franja ajedrezada */}
      <CheckerStrip />

      {/* 4. Showcase "Nuestras Delicias" */}
      <NuestrasDelicias />

      {/* 6. Menú interactivo con tabs */}
      <MenuSection />

      {/* 7. Franja ajedrezada */}
      <CheckerStrip />

      {/* 8. Footer */}
      <Footer />
    </main>
  )
}
