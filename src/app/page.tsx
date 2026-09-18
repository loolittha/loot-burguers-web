import Image from 'next/image'
import Navbar from '@/components/Navbar'
import MenuSection from '@/components/MenuSection'

// ─── Checkered divider ────────────────────────────────────────────────────────
function CheckerStrip() {
  return <div className="checker-strip w-full" aria-hidden="true" />
}

// ─── Hero — solo imagen, navbar ya está fuera como flujo normal ───────────────
function Hero() {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ height: 'clamp(320px, 50vh, 560px)' }}
      aria-label="Foto principal Loot Burgers"
    >
      <Image
        src="/Hero.jpg"
        alt="Hamburguesa Loot Burgers — jugosa y llena de sabor"
        fill
        priority={true}
        sizes="100vw"
        quality={100}
        className="object-cover object-center w-full h-full"
      />
    </section>
  )
}

// ─── Nuestras Delicias — showcase visual de 3 burgers ─────────────────────────
function NuestrasDelicias() {
  const burgers = [
    { src: '/CheeseDoble.jpg', alt: 'Cheeseburger doble', rotate: '-6deg', scale: '0.88' },
    { src: '/CrispyDoble.jpg', alt: 'Crispy Bacon doble', rotate: '0deg', scale: '1' },
    { src: '/AmericanDoble.jpg', alt: 'American doble', rotate: '6deg', scale: '0.88' },
  ]

  return (
    <section
      className="py-14 px-4 md:px-16"
      style={{ backgroundColor: 'var(--cream)' }}
      aria-labelledby="delicias-heading"
    >
      {/* Título */}
      <h2
        id="delicias-heading"
        className="text-center text-4xl md:text-5xl mb-12"
        style={{ fontFamily: 'var(--font-lilita)', color: 'var(--red)' }}
      >
        NUESTRAS DELICIAS
      </h2>

      {/* Grid de 3 fotos con efecto fotográfico inclinado */}
      <div className="flex items-center justify-center gap-4 md:gap-8">
        {burgers.map(({ src, alt, rotate, scale }) => (
          <div
            key={src}
            className="relative overflow-hidden rounded-2xl shadow-xl transition-transform duration-300 hover:scale-105 hover:z-10 hover:shadow-2xl"
            style={{
              transform: `rotate(${rotate}) scale(${scale})`,
              width: 'clamp(180px, 28vw, 340px)',
              height: 'clamp(220px, 34vw, 420px)',
              flexShrink: 0,
            }}
          >
            <Image
              src={src}
              alt={alt}
              fill
              sizes="(max-width: 768px) 50vw, 30vw"
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

      {/* 5. Franja ajedrezada */}
      <CheckerStrip />

      {/* 6. Menú interactivo con tabs */}
      <MenuSection />

      {/* 7. Franja ajedrezada */}
      <CheckerStrip />

      {/* 8. Footer */}
      <Footer />
    </main>
  )
}
