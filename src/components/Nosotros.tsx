'use client'

export default function NosotrosSection() {
    const whatsappMessage = encodeURIComponent(
        '¡Hola Loot! ¿Cómo están? Quería consultar para cotizar un evento privado / catering de smash burgers.'
    )
    const whatsappUrl = `https://wa.me/5491178220054?text=${whatsappMessage}`

    return (
        <section
            id="nosotros"
            className="relative flex items-center justify-center overflow-hidden min-h-[85vh]"
            aria-labelledby="nosotros-title"
        >
            <video
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                src="/videos/Evento.mp4"
                className="absolute inset-0 w-full h-full object-cover z-0"
                aria-hidden="true"
            />

            <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] z-10" />

            <div className="absolute top-0 inset-x-0 z-20">
                <svg viewBox="0 0 1440 90" preserveAspectRatio="none" className="w-full h-10 md:h-16 block" aria-hidden="true">
                    <path d="M0,0 L1440,0 L1440,45 C1260,15 1020,88 720,50 C420,10 200,90 0,55 Z" fill="var(--cream)" />
                </svg>
            </div>

            <div className="absolute bottom-0 inset-x-0 z-20 transform rotate-180">
                <svg viewBox="0 0 1440 90" preserveAspectRatio="none" className="w-full h-10 md:h-16 block" aria-hidden="true">
                    <path d="M0,0 L1440,0 L1440,45 C1260,15 1020,88 720,50 C420,10 200,90 0,55 Z" fill="var(--cream)" />
                </svg>
            </div>

            <div className="relative z-30 max-w-4xl mx-auto px-6 py-24 text-center flex flex-col items-center">

                <span
                    className="mb-4 text-sm md:text-base font-bold tracking-[0.2em] uppercase"
                    style={{ color: 'var(--red)', fontFamily: 'var(--font-montserrat)' }}
                >
                    CONOCENOS
                </span>

                <h2
                    id="nosotros-title"
                    className="text-5xl sm:text-6xl md:text-7xl leading-[0.95] mb-6 tracking-tight drop-shadow-2xl"
                    style={{ fontFamily: 'var(--font-lilita)', color: '#F5E6D3' }}
                >
                    LOOT<br />BURGERS
                </h2>

                <div
                    className="space-y-4 text-base sm:text-lg leading-relaxed max-w-2xl mb-10 text-white/95 drop-shadow-md"
                    style={{ fontFamily: 'var(--font-montserrat)', color: '#F5E6D3' }}
                >
                    <p>
                        Un concepto que nace de nuestra pasión por lo auténtico.
                        Un producto sin vueltas, creado para disfrutar y compartir.
                    </p>
                    <p>
                        Con smash burgers hechas a la perfección y sabores simples,
                        diseñadas para acompañarte en cada juntada y en cada antojo.
                    </p>
                    <br />
                    <p
                        className="pt-4 font-bold text-lg"
                        style={{ color: 'var(--cream)' }}
                    >
                        ¿Tenés un evento especial?
                    </p>
                    <p>
                        Llevamos nuestra plancha y toda la experiencia Loot para conectar con tus invitados.
                    </p>
                </div>

                <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-8 py-3.5 rounded-full text-white font-extrabold text-sm tracking-wider transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
                    style={{ backgroundColor: 'var(--red)', fontFamily: 'var(--font-montserrat)' }}
                >
                    COTIZÁ TU EVENTO
                </a>
            </div>
        </section>
    )
}