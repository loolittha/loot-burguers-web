'use client'

export default function Ubicacion() {
    return (
        <section
            id="ubicacion"
            className="py-16 sm:py-20 px-4 sm:px-6 md:px-8"
            style={{ backgroundColor: 'var(--cream)' }}
            aria-labelledby="ubicacion-title"
        >

            <div
                className="max-w-3xl mx-auto rounded-[32px] p-6 sm:p-10 md:p-12 shadow-2xl flex flex-col items-center text-center transition-all duration-300"
                style={{ backgroundColor: 'var(--red)' }}
            >

                <span
                    className="text-xs font-black tracking-widest uppercase mb-2 opacity-80"
                    style={{ color: 'var(--cream)', fontFamily: 'var(--font-montserrat)' }}
                >
                    Cobertura en Pilar
                </span>


                <h2
                    id="ubicacion-title"
                    className="text-4xl sm:text-5xl md:text-6xl tracking-tight mb-3"
                    style={{ fontFamily: 'var(--font-lilita)', color: 'var(--cream)' }}
                >
                    DÓNDE ESTAMOS
                </h2>

                <p
                    className="text-sm sm:text-base max-w-md mb-8 leading-relaxed opacity-90"
                    style={{ fontFamily: 'var(--font-montserrat)', color: 'var(--cream)' }}
                >
                    Pasá a buscar tu pedido o te lo llevamos con nuestro delivery.
                </p>


                <div
                    className="relative w-full max-w-md aspect-[4/5] sm:aspect-video rounded-2xl overflow-hidden shadow-2xl border-2 bg-neutral-100"
                    style={{ borderColor: 'rgba(253, 248, 240, 0.25)' }}
                >
                    <iframe
                        src="https://maps.google.com/maps?q=ENA%2C%20Chubut%201353%2C%20B1631%20Villa%20Rosa%2C%20Buenos%20Aires&t=&z=15&ie=UTF8&iwloc=&output=embed"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen={false}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Ubicación de Loot Burgers en Villa Rosa"
                    />
                </div>

                <div className="flex flex-col sm:flex-row gap-4 mt-8 w-full max-w-md justify-center">
                    <a
                        href="https://maps.google.com/maps?q=ENA%2C%20Chubut%201353%2C%20B1631%20Villa%20Rosa%2C%20Buenos%20Aires"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-full font-black text-xs tracking-wider transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg w-full sm:w-auto"
                        style={{
                            backgroundColor: 'transparent',
                            color: 'var(--cream)',
                            border: '2px solid var(--cream)',
                            fontFamily: 'var(--font-montserrat)',
                        }}
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                            <circle cx="12" cy="10" r="3"></circle>
                        </svg>
                        <span>CÓMO LLEGAR</span>
                    </a>

                    <a
                        href="#menu"
                        className="inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-full font-black text-xs tracking-wider transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg w-full sm:w-auto"
                        style={{
                            backgroundColor: 'var(--cream)',
                            color: 'var(--red)',
                            fontFamily: 'var(--font-montserrat)',
                        }}
                    >
                        <span>VER MENÚ</span>
                    </a>
                </div>
            </div>
        </section>
    )
}