'use client'
//Panel de Zonas de entregas
import Image from 'next/image'

export default function Ubicacion() {
    return (
        <section
            id="ubicacion"
            className="py-16 sm:py-20 px-4 sm:px-6 md:px-8"
            style={{ backgroundColor: 'var(--cream)' }}
            aria-labelledby="ubicacion-title"
        >
            {/* Tarjeta Roja */}
            <div
                className="max-w-3xl mx-auto rounded-[32px] p-6 sm:p-10 md:p-12 shadow-2xl flex flex-col items-center text-center transition-all duration-300"
                style={{ backgroundColor: 'var(--red)' }}
            >
                {/* Subtítulo / Tagline en crema */}
                <span
                    className="text-xs font-black tracking-widest uppercase mb-2 opacity-80"
                    style={{ color: 'var(--cream)', fontFamily: 'var(--font-montserrat)' }}
                >
                    Cobertura en Pilar
                </span>

                {/* Título en crema */}
                <h2
                    id="ubicacion-title"
                    className="text-4xl sm:text-5xl md:text-6xl tracking-tight mb-3"
                    style={{ fontFamily: 'var(--font-lilita)', color: 'var(--cream)' }}
                >
                    ZONAS DE ENTREGA
                </h2>

                {/* Párrafo descriptivo en crema */}
                <p
                    className="text-sm sm:text-base max-w-md mb-8 leading-relaxed opacity-90"
                    style={{ fontFamily: 'var(--font-montserrat)', color: 'var(--cream)' }}
                >
                    Repartimos en las zonas marcadas en el mapa. Al momento de <strong>confirmar tu pedido</strong> vas a poder indicar tu punto exacto.
                </p>

                {/* Mapa con borde sutil en crema */}
                <div
                    className="relative w-full max-w-md aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border-2 bg-neutral-100"
                    style={{ borderColor: 'rgba(253, 248, 240, 0.25)' }}
                >
                    <Image
                        src="/MapaCalor.jpg"
                        alt="Zonas de entrega Loot Burgers"
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 90vw, 450px"
                    />
                </div>

                {/* Botón Píldora invertido (Fondo crema, texto rojo) */}
                <a
                    href="#menu"
                    className="mt-8 inline-flex items-center gap-2.5 px-6 py-3 rounded-full font-black text-xs tracking-wider transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg"
                    style={{
                        backgroundColor: 'var(--cream)',
                        color: 'var(--red)',
                        fontFamily: 'var(--font-montserrat)',
                    }}
                >
                    <span>VER EL MENÚ Y PEDIR</span>
                </a>
            </div>
        </section>
    )
}