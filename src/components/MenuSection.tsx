'use client'
//Panel de menú
import { useState } from 'react'
import Image from 'next/image'
import { useCart } from '@/context/CartContext'

// ─── Types ────────────────────────────────────────────────────────────────────
type Category = 'Hamburguesas' | 'Combos' | 'Adicionales'

interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  category: Exclude<Category, 'Todo'>
  image: string
  badge?: string
}

// ─── Menu Data ────────────────────────────────────────────────────────────────
const MENU_ITEMS: MenuItem[] = [
  // ── Hamburguesas (sin papas) ────────────────────────────────────────────────
  {
    id: 'cheese-simple',
    name: 'Cheeseburger simple',
    description: 'Un medallón y doble cheddar.',
    price: 7000,
    category: 'Hamburguesas',
    image: '/CheeseSimple.png',
  },
  {
    id: 'cheese-doble',
    name: 'Cheeseburger doble',
    description: 'Doble medallón y triple cheddar.',
    price: 10000,
    category: 'Hamburguesas',
    image: '/CheeseDoble.jpg',
    badge: 'La más pedida',
  },
  {
    id: 'american-simple',
    name: 'American simple',
    description: 'Un medallón, doble cheddar, lechuga, tomate y cebolla grill.',
    price: 8000,
    category: 'Hamburguesas',
    image: '/AmericanSimple.png',
  },
  {
    id: 'american-doble',
    name: 'American doble',
    description: 'Doble medallón, triple cheddar, lechuga, tomate y cebolla grill.',
    price: 11000,
    category: 'Hamburguesas',
    image: '/AmericanDoble.jpg',
  },
  {
    id: 'crispy-simple',
    name: 'Crispy Bacon simple',
    description: 'Un medallón, doble cheddar, cebolla crispy y panceta ahumada.',
    price: 10000,
    category: 'Hamburguesas',
    image: '/CrispySimple.png',
  },
  {
    id: 'crispy-doble',
    name: 'Crispy Bacon doble',
    description: 'Doble medallón, triple cheddar, cebolla crispy y panceta ahumada.',
    price: 13000,
    category: 'Hamburguesas',
    image: '/CrispyDoble.jpg',
  },
  {
    id: 'triple-burger',
    name: 'La triple 🧀',
    description: 'Triple medallón, cuádruple queso y salsa loot.',
    price: 13000,
    category: 'Hamburguesas',
    image: '/SecretMenu.png',
    badge: 'Secret Menu',
  },
  // ── Combos (con papas) ──────────────────────────────────────────────────────
  {
    id: 'starter-pack',
    name: 'Starter Pack',
    description: '1 Cheese simple + 1 American simple + 1 Crispy Bacon simple + 1 porción de papas.',
    price: 27500,
    category: 'Combos',
    image: '/StarterPackSimple.png',
    badge: 'Para compartir',
  },
  {
    id: 'combo-cheese-simple',
    name: 'Combo Cheeseburger simple',
    description: 'Un medallón, doble cheddar + papas.',
    price: 9000,
    category: 'Combos',
    image: '/CheeseSimple.png',
  },
  {
    id: 'combo-cheese-doble',
    name: 'Combo Cheeseburger doble',
    description: 'Doble medallón, triple cheddar, salsa loot + papas.',
    price: 12000,
    category: 'Combos',
    image: '/CheeseDoble.jpg',
  },
  {
    id: 'combo-american-simple',
    name: 'Combo American simple',
    description: 'Un medallón, doble cheddar, lechuga, tomate, cebolla grill + papas.',
    price: 12000,
    category: 'Combos',
    image: '/AmericanSimple.png',
  },
  {
    id: 'combo-american-doble',
    name: 'Combo American doble',
    description: 'Doble medallón, triple cheddar, lechuga, tomate, cebolla grill + papas.',
    price: 15000,
    category: 'Combos',
    image: '/AmericanDoble.jpg',
  },
  {
    id: 'combo-crispy-simple',
    name: 'Combo Crispy Bacon simple',
    description: 'Un medallón, doble cheddar, cebolla crispy, panceta ahumada + papas.',
    price: 14000,
    category: 'Combos',
    image: '/CrispySimple.png',
  },
  {
    id: 'combo-crispy-doble',
    name: 'Combo Crispy Bacon doble',
    description: 'Doble medallón, triple cheddar, cebolla crispy, panceta ahumada + papas.',
    price: 17000,
    category: 'Combos',
    image: '/CrispyDoble.jpg',
  },
  {
    id: 'combo-triple',
    name: 'Combo La triple 🧀',
    description: 'Triple medallón, cuádruple cheddar, salsa loot + papas.',
    price: 17000,
    category: 'Combos',
    image: '/SecretMenu.png',
    badge: 'Secret Menu',
  },
  // ── Adicionales ─────────────────────────────────────────────────────────────
  {
    id: 'papas',
    name: 'Porción de papas',
    description: 'Papas fritas crocantes, perfectas para acompañar.',
    price: 4000,
    category: 'Adicionales',
    image: '/Papas.png',
  },
  {
    id: 'medallon',
    name: 'Un medallón de carne',
    description: 'Medallón de carne fresca, cocinado a la plancha.',
    price: 3000,
    category: 'Adicionales',
    image: '/MedallonCarne.png',
  },
  {
    id: 'cheddar',
    name: 'Una feta de cheddar',
    description: 'Cheddar americano fundido, el clásico de Loot.',
    price: 1000,
    category: 'Adicionales',
    image: '/FetaCheddar.jpg',
  },
  {
    id: 'panceta',
    name: 'Dos fetas de panceta ahumada',
    description: 'Panceta ahumada premium, crujiente y sabrosa.',
    price: 3000,
    category: 'Adicionales',
    image: '/FetasPanceta.png',
  },
  {
    id: 'salsa-loot',
    name: 'Dip salsa Loot (50cc)',
    description: 'Nuestra salsa secreta con pepinillos en conserva. Adictiva.',
    price: 600,
    category: 'Adicionales',
    image: '/SalsaLoot.png',
  },
]

const CATEGORIES: Category[] = ['Hamburguesas', 'Combos', 'Adicionales']

// ─── Helpers ──────────────────────────────────────────────────────────────────
function formatPrice(price: number): string {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

// ─── MenuCard ─────────────────────────────────────────────────────────────────
function MenuCard({ item, onAdd }: { item: MenuItem; onAdd: () => void }) {
  return (
    <article
      className="card-hover flex flex-col rounded-2xl overflow-hidden bg-white"
      style={{ boxShadow: 'var(--shadow-md)' }}
      aria-label={item.name}
    >
      {/* Image */}
      <div className="relative w-full h-52 overflow-hidden">
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          quality={95}
          className="object-cover transition-transform duration-500 hover:scale-105"
        />
        {/* Badge */}
        {item.badge && (
          <span
            className="absolute top-3 left-3 text-xs font-bold text-white px-3 py-1 rounded-full"
            style={{ backgroundColor: 'var(--red)', fontFamily: 'var(--font-montserrat)' }}
          >
            {item.badge}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 gap-2">
        {/* Name + Price */}
        <div className="flex items-start justify-between gap-2">
          <h3
            className="text-lg leading-tight"
            style={{ fontFamily: 'var(--font-lilita)', color: 'var(--brown)' }}
          >
            {item.name}
          </h3>
          <span
            className="text-base font-bold shrink-0"
            style={{ color: 'var(--red)', fontFamily: 'var(--font-montserrat)' }}
          >
            {formatPrice(item.price)}
          </span>
        </div>

        {/* Description */}
        <p
          className="text-sm leading-relaxed flex-1"
          style={{ color: 'var(--gray-text)', fontFamily: 'var(--font-montserrat)' }}
        >
          {item.description}
        </p>

        {/* CTA Button */}
        <button
          id={`btn-add-${item.id}`}
          onClick={onAdd}
          className="btn-pill mt-2 mx-4 mb-4 py-2.5 text-sm font-bold tracking-wide cursor-pointer"
          style={{ fontFamily: 'var(--font-montserrat)' }}
          aria-label={`Agregar ${item.name} al pedido`}
        >
          + Agregar al pedido
        </button>
      </div>
    </article>
  )
}

// ─── MenuSection (Client) ─────────────────────────────────────────────────────
export default function MenuSection() {
  const [activeCategory, setActiveCategory] = useState<Category>('Hamburguesas')
  const { addToCart } = useCart()

  const filtered = MENU_ITEMS.filter((item) => item.category === activeCategory)

  return (
    <section
      id="menu"
      className="py-14 px-4 md:px-10 lg:px-20"
      style={{ backgroundColor: 'var(--cream)' }}
      aria-labelledby="menu-heading"
    >
      {/* Section header */}
      <div className="flex flex-col items-center text-center mb-8 mt-2">
        <p
          className="text-sm uppercase tracking-widest font-semibold mb-2"
          style={{ color: 'var(--red)', fontFamily: 'var(--font-montserrat)' }}
        >
          Nuestro menú
        </p>
        <h2
          className="text-4xl md:text-5xl"
          style={{ fontFamily: 'var(--font-lilita)', color: '#1e1e1e' }}
        >
          ¡Vení a Lootear!
        </h2>
      </div>

      {/* Category Tabs */}
      <div
        className="flex flex-wrap justify-center gap-3 mb-10"
        role="tablist"
        aria-label="Filtrar por categoría"
      >
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            id={`tab-${cat.toLowerCase()}`}
            role="tab"
            aria-selected={activeCategory === cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-200 cursor-pointer ${activeCategory === cat ? 'tab-active' : 'tab-inactive'
              }`}
            style={{ fontFamily: 'var(--font-montserrat)' }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/*Subtítulo según categoría */}
      {activeCategory === 'Hamburguesas' && (
        <p
          className="text-center text-sm text-neutral-600 -mt-6 mb-8"
          style={{ fontFamily: 'var(--font-montserrat)' }}
        >
          <strong>No se adicionan papas fritas</strong>
        </p>
      )}
      {activeCategory === 'Combos' && (
        <p
          className="text-center text-sm text-neutral-600 -mt-6 mb-8"
          style={{ fontFamily: 'var(--font-montserrat)' }}
        >
          <strong>Todos los combos traen papas fritas</strong>
        </p>
      )}

      {/* Grid */}
      <div className="max-w-5xl mx-auto">
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          role="tabpanel"
          aria-label={`Productos: ${activeCategory}`}
        >
          {filtered.map((item) => (
            <MenuCard
              key={item.id}
              item={item}
              onAdd={() => addToCart(item)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
