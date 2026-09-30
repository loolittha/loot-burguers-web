'use client'
//Panel de Nosotros
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'


export default function NosotrosSection() {
    const whatsappMessage = encodeURIComponent(
        '¡Hola Loot! ¿Cómo están? Quería consultar para cotizar un evento privado / catering de smash burgers.'
    )
    const whatsappUrl = `https://wa.me/5491178220054?text=${whatsappMessage}`

    const sectionRef = useRef<HTMLElement>(null)
    const [waveProgress, setWaveProgress] = useState(0)

    useEffect(() => {
        const section = sectionRef.current
        if (!section) return

        const onScroll = () => {
            const rect = section.getBoundingClientRect()
            const windowH = window.innerHeight
            const start = windowH * 0.9
            const end = windowH * 0.15
            const raw = 1 - (rect.top - end) / (start - end)
            setWaveProgress(Math.min(1, Math.max(0, raw)))
        }

        window.addEventListener('scroll', onScroll, { passive: true })
        onScroll()
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    // Panel crema entra desde abajo: empieza en translateY(+100%) y va a 0%
    const panelTranslateY = (1 - waveProgress) * 100

    return (
        <section
            id="nosotros"
            ref={sectionRef}
            className="relative overflow-hidden"
            style={{ backgroundColor: 'var(--red)', minHeight: '560px' }}
            aria-labelledby="nosotros-title"
        >

            {/* ── Panel crema con ola — entra desde abajo al scrollear ── */}
            <div
                className="absolute inset-x-0 bottom-0 z-10 pointer-events-none"
                style={{
                    height: '55%',
                    transform: `translateY(${panelTranslateY}%)`,
                    willChange: 'transform',
                }}
            >

                <svg
                    viewBox="0 0 1440 90"
                    preserveAspectRatio="none"
                    className="w-full"
                    style={{ display: 'block', height: '90px' }}
                    aria-hidden="true"
                >
                    <path
                        d="M0,55 C200,90 420,10 720,50 C1020,88 1260,15 1440,45 L1440,90 L0,90 Z"
                        fill="var(--cream)"
                    />
                </svg>
                <div style={{ backgroundColor: 'var(--cream)', height: 'calc(100% - 89px)', width: '100%' }} />
            </div>

            {/* ── Contenido principal ── */}
            <div className="relative z-20 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-28 items-center px-6 md:px-12 lg:px-20 py-16 md:py-24">

                {/* Columna Izquierda: Fotos y Video */}
                <div className="flex items-center justify-center gap-3 sm:gap-8 py-4 w-full">
                    <div className="relative w-36 sm:w-64 h-52 sm:h-96 rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl sm:shadow-2xl transform -rotate-4 hover:-rotate-2 transition-all duration-300 shrink-0 -translate-y-2 sm:-translate-y-4">
                        <Image
                            src="/PanelNosotros.jpg"
                            alt="Smash burger artesanal recién salida de la plancha"
                            fill
                            sizes="(max-width: 640px) 150px, 260px"
                            className="object-cover"
                        />
                    </div>
                    <div className="relative w-40 sm:w-72 h-56 sm:h-[420px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl sm:shadow-2xl transform rotate-4 hover:rotate-2 transition-all duration-300 shrink-0 translate-y-2 sm:translate-y-4 bg-black/5">
                        <video
                            autoPlay loop muted playsInline preload="auto"
                            src="/videos/PanelNosotrosHamburguesa.mp4"
                            className="w-full h-full object-cover"
                            aria-hidden="true"
                        >
                            <source src="/videos/PanelNosotrosHamburguesa.mp4" type="video/mp4" />
                        </video>
                    </div>
                </div>

                {/* Columna Derecha: Textos y Botón */}
                <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                    <h2
                        id="nosotros-title"
                        className="text-5xl sm:text-6xl md:text-7xl leading-[0.95] mb-6 tracking-tight"
                        style={{
                            fontFamily: 'var(--font-lilita)',
                            color: 'var(--cream)',
                            textShadow: '3px 3px 0px rgba(120,0,0,0.35), -1px -1px 0px rgba(120,0,0,0.2)',
                        }}
                    >
                        LLEVÁ LOOT A<br />TU FIESTA
                    </h2>

                    <div
                        className="space-y-4 text-base sm:text-lg leading-relaxed max-w-lg mb-8"
                        style={{ fontFamily: 'var(--font-montserrat)', color: '#3D3D3D' }}
                    >
                        <p>
                            Somos fanáticos del sabor simple pero bien hecho. En Loot nos enfocamos
                            en el detalle: carne seleccionada y recetas secretas que marcan la diferencia.
                        </p>
                        <p>
                            <strong>¿Tenés un cumpleaños o juntada?</strong> Llevamos todo nuestro equipamiento
                            para cocinar smash burgers en vivo para vos y tus invitados.
                        </p>
                    </div>

                    <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative inline-flex items-center gap-2.5 pl-5 pr-2 py-1.5 rounded-full text-white font-extrabold text-xs tracking-wider transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer shadow-lg hover:shadow-xl"
                        style={{ backgroundColor: 'var(--red)', fontFamily: 'var(--font-montserrat)' }}
                    >
                        <span>COTIZÁ TU EVENTO</span>
                        <span
                            className="w-7 h-7 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:rotate-45"
                            style={{ backgroundColor: 'var(--cream)', color: 'var(--red)' }}
                        >
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <line x1="7" y1="17" x2="17" y2="7" />
                                <polyline points="7 7 17 7 17 17" />
                            </svg>
                        </span>
                    </a>
                </div>

            </div>
        </section>
    )
}
