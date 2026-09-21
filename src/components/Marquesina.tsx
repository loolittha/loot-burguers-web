'use client'

const PHRASES = [
    'CATERING & EVENTOS PRIVADOS',
    'SMASH EN VIVO',
    'CUMPLEAÑOS & JUNTADAS',
    'PAN DE PAPA ARTESANAL',
    'COTIZÁ TU EVENTO',
    '100% CARNE SELECCIONADA',
]

export default function Marquesina() {
    return (
        <div
            className="w-full overflow-hidden py-3 select-none flex items-center border-y border-red-700 shadow-inner"
            style={{ backgroundColor: 'var(--red)' }}
            aria-hidden="true"
        >
            {/* Contenedor con animación infinita */}
            <div className="flex shrink-0 animate-marquee items-center gap-6 whitespace-nowrap">
                {[...PHRASES, ...PHRASES, ...PHRASES].map((text, idx) => (
                    <div key={idx} className="flex items-center gap-6">
                        <span
                            className="text-xs sm:text-sm font-extrabold tracking-widest text-[#FDF8F0]"
                            style={{ fontFamily: 'var(--font-montserrat)' }}
                        >
                            {text}
                        </span>
                        <span className="text-[#FDF8F0]/70 text-xs">★</span>
                    </div>
                ))}
            </div>

            {/* Segundo bloque idéntico para que el bucle sea 100% fluido y no se corte */}
            <div
                className="flex shrink-0 animate-marquee items-center gap-6 whitespace-nowrap"
                aria-hidden="true"
            >
                {[...PHRASES, ...PHRASES, ...PHRASES].map((text, idx) => (
                    <div key={`dup-${idx}`} className="flex items-center gap-6">
                        <span
                            className="text-xs sm:text-sm font-extrabold tracking-widest text-[#FDF8F0]"
                            style={{ fontFamily: 'var(--font-montserrat)' }}
                        >
                            {text}
                        </span>
                        <span className="text-[#FDF8F0]/70 text-xs">★</span>
                    </div>
                ))}
            </div>
        </div>
    )
}