'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'

// ─── Data ──────────────────────────────────────────────────────────────────────
const BURGERS = [
  {
    id: 'cheese',
    name: 'Cheeseburger',
    tagline: 'La clásica',
    description: 'Medallón jugoso con cheddar y nuestra salsa Loot. La que lo empezó todo.',
    price: 'desde $11.000',
    src: '/CheeseDoble.jpg',
  },
  {
    id: 'american',
    name: 'American',
    tagline: 'La completa',
    description: 'Lechuga fresca, tomate, cheddar, cebolla grill y salsa Loot. El sabor americano con identidad Loot.',
    price: 'desde $12.000',
    src: '/AmericanDoble.jpg',
  },
  {
    id: 'crispy',
    name: 'Crispy Bacon',
    tagline: 'La bestia',
    description: 'Medallón jugoso con cebolla crispy, panceta, cheddar y salsa Loot. Para los que no se conforman.',
    price: 'desde $14.000',
    src: '/CrispyDoble.jpg',
  },
]

// ─── BurgerCarousel ────────────────────────────────────────────────────────────
export default function BurgerCarousel() {
  const [current, setCurrent] = useState(0)
  const [animating, setAnimating] = useState(false)
  const [direction, setDirection] = useState<'next' | 'prev'>('next')
  const touchStartX = useRef<number | null>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const total = BURGERS.length

  // ── Navigate ────────────────────────────────────────────────────────────────
  const goTo = useCallback((index: number, dir: 'next' | 'prev' = 'next') => {
    if (animating) return
    setDirection(dir)
    setAnimating(true)
    setTimeout(() => {
      setCurrent(index)
      setAnimating(false)
    }, 350)
  }, [animating])

  const next = useCallback(() => goTo((current + 1) % total, 'next'), [current, goTo, total])
  const prev = useCallback(() => goTo((current - 1 + total) % total, 'prev'), [current, goTo, total])

  // ── Auto-play ───────────────────────────────────────────────────────────────
  const resetTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(next, 5000)
  }, [next])

  useEffect(() => {
    resetTimer()
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [current, resetTimer])

  // ── Touch / swipe ───────────────────────────────────────────────────────────
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return
    const delta = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(delta) > 50) {
      delta > 0 ? next() : prev()
      resetTimer()
    }
    touchStartX.current = null
  }

  const burger = BURGERS[current]

  return (
    <section
      id="nuestras-delicias"
      className="relative w-full overflow-hidden select-none"
      style={{ backgroundColor: 'var(--red)' }}
      aria-label="Nuestras hamburguesas especiales"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {/* ── Título sección ─────────────────────────────────────────────────── */}
      <div className="pt-10 pb-6 text-center px-4">
        <p
          className="text-xs uppercase tracking-[0.25em] font-semibold mb-1"
          style={{ color: 'rgba(245,230,211,0.7)', fontFamily: 'var(--font-montserrat)' }}
        >
          Nuestras especialidades
        </p>
        <h2
          className="text-4xl md:text-5xl"
          style={{ fontFamily: 'var(--font-lilita)', color: '#F5E6D3' }}
        >
          NUESTRAS DELICIAS
        </h2>
      </div>

      {/* ── Slide ─────────────────────────────────────────────────────────── */}
      <div
        className="relative flex flex-col md:flex-row items-stretch mx-4 md:mx-12 lg:mx-24 rounded-3xl overflow-hidden"
        style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.4)', minHeight: '360px' }}
      >
        {/* Imagen */}
        <div
          className="relative w-full md:w-[55%] flex-none"
          style={{ minHeight: '280px', height: 'clamp(280px, 50vw, 520px)' }}
        >
          <Image
            key={burger.src}
            src={burger.src}
            alt={burger.name}
            fill
            priority={current === 0}
            sizes="(max-width: 768px) 100vw, 55vw"
            quality={95}
            className={`object-cover transition-all duration-[350ms] ${animating
              ? direction === 'next'
                ? 'opacity-0 scale-[1.03]'
                : 'opacity-0 scale-[0.97]'
              : 'opacity-100 scale-100'
              }`}
          />
          {/* Gradiente desktop hacia el panel */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/40 hidden md:block" />
          {/* Gradiente mobile hacia el texto */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50 md:hidden" />
        </div>

        {/* Panel de texto */}
        <div
          className="flex-1 flex flex-col justify-center px-8 py-8 md:py-10 md:pl-10 md:pr-8"
          style={{ backgroundColor: '#1a0508' }}
        >
          {/* Tagline */}
          <span
            className={`inline-block text-xs uppercase tracking-[0.3em] font-bold mb-3 transition-all duration-300 ${animating ? 'opacity-0 translate-x-4' : 'opacity-100 translate-x-0'
              }`}
            style={{ color: '#F5E6D3', fontFamily: 'var(--font-montserrat)' }}
          >
            {burger.tagline}
          </span>

          {/* Nombre */}
          <h3
            className={`text-4xl md:text-5xl lg:text-6xl leading-none mb-4 transition-all duration-[350ms] delay-75 ${animating ? 'opacity-0 translate-y-3' : 'opacity-100 translate-y-0'
              }`}
            style={{ fontFamily: 'var(--font-lilita)', color: '#F5E6D3' }}
          >
            {burger.name}
          </h3>

          {/* Descripción */}
          <p
            className={`text-sm md:text-base leading-relaxed mb-6 transition-all duration-[350ms] delay-100 ${animating ? 'opacity-0 translate-y-3' : 'opacity-100 translate-y-0'
              }`}
            style={{ color: 'rgba(245,230,211,0.75)', fontFamily: 'var(--font-montserrat)', maxWidth: '360px' }}
          >
            {burger.description}
          </p>

          {/* Precio + CTA */}
          <div
            className={`flex items-center gap-4 flex-wrap transition-all duration-[350ms] delay-150 ${animating ? 'opacity-0 translate-y-3' : 'opacity-100 translate-y-0'
              }`}
          >
            <span
              className="text-2xl md:text-3xl font-extrabold"
              style={{ color: '#F5E6D3', fontFamily: 'var(--font-montserrat)' }}
            >
              {burger.price}
            </span>
            <Link
              href="#menu"
              className="px-6 py-2.5 rounded-full text-sm font-bold tracking-wide transition-all duration-200 hover:scale-105 active:scale-95"
              style={{
                backgroundColor: '#C1121F',
                color: '#F5E6D3',
                fontFamily: 'var(--font-montserrat)',
                boxShadow: '0 4px 16px rgba(193,18,31,0.5)',
              }}
            >
              Ver en el menú →
            </Link>
          </div>
        </div>
      </div>

      {/* ── Controles ──────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-center gap-6 py-7">

        {/* Botón prev */}
        <button
          onClick={() => { prev(); resetTimer() }}
          aria-label="Anterior hamburguesa"
          className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
          style={{ backgroundColor: 'rgba(245,230,211,0.15)', color: '#F5E6D3' }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* Dots */}
        <div className="flex items-center gap-2" role="tablist" aria-label="Seleccionar hamburguesa">
          {BURGERS.map((b, i) => (
            <button
              key={b.id}
              role="tab"
              aria-selected={i === current}
              aria-label={b.name}
              onClick={() => { goTo(i, i > current ? 'next' : 'prev'); resetTimer() }}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === current ? '28px' : '8px',
                height: '8px',
                backgroundColor: i === current ? '#F5E6D3' : 'rgba(245,230,211,0.35)',
              }}
            />
          ))}
        </div>

        {/* Botón next */}
        <button
          onClick={() => { next(); resetTimer() }}
          aria-label="Siguiente hamburguesa"
          className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
          style={{ backgroundColor: 'rgba(245,230,211,0.15)', color: '#F5E6D3' }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </section>
  )
}
