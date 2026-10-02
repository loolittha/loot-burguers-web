'use client'
import { useState } from 'react'
import Image from 'next/image'
import { useCart } from '@/context/CartContext'

type Category = 'Hamburguesas' | 'Combos' | 'Adicionales'

interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  category: Category
  image: string
  badge?: string
  group?: string
  size?: string
}

const MENU_ITEMS: MenuItem[] = [
  //Hamburguesas (sin papas) 
  {
    id: 'cheese-simple',
    name: 'Cheeseburger simple',
    description: 'Un medallón y doble cheddar.',
    price: 8000,
    category: 'Hamburguesas',
    image: '/menu/CheeseSimple.png',
  },
  {
    id: 'cheese-doble',
    name: 'Cheeseburger doble',
    description: 'Doble medallón y triple cheddar.',
    price: 11000,
    category: 'Hamburguesas',
    image: '/menu/CheeseDoble.jpg',
  },
  {
    id: 'american-simple',
    name: 'American simple',
    description: 'Un medallón, doble cheddar, lechuga, tomate y cebolla grill.',
    price: 9500,
    category: 'Hamburguesas',
    image: '/menu/AmericanSimple.png',
  },
  {
    id: 'american-doble',
    name: 'American doble',
    description: 'Doble medallón, triple cheddar, lechuga, tomate y cebolla grill.',
    price: 12500,
    category: 'Hamburguesas',
    image: '/menu/AmericanDoble.jpg',
    badge: 'La más pedida',
  },
  {
    id: 'crispy-simple',
    name: 'Crispy Bacon simple',
    description: 'Un medallón, doble cheddar, cebolla crispy y panceta ahumada.',
    price: 12000,
    category: 'Hamburguesas',
    image: '/menu/CrispySimple.png',
  },
  {
    id: 'crispy-doble',
    name: 'Crispy Bacon doble',
    description: 'Doble medallón, triple cheddar, cebolla crispy y panceta ahumada.',
    price: 15000,
    category: 'Hamburguesas',
    image: '/menu/CrispyDoble.jpg',
  },
  {
    id: 'triple-burger',
    name: 'La Triple',
    description: 'Triple medallón, cuádruple queso y salsa Loot.',
    price: 14000,
    category: 'Hamburguesas',
    image: '/menu/SecretMenu.png',
    badge: 'Secret Menu',
  },
  //Combos (con papas)
  {
    id: 'starter-pack',
    name: 'Starter Pack',
    description:
      '1 Cheese simple + 1 American simple + 1 Crispy Bacon simple + 1 porción de papas + gaseosa a elección.',
    price: 30000,
    category: 'Combos',
    image: '/menu/StarterPackSimple.png',
    badge: 'Para compartir',
  },
  {
    id: 'combo-cheese-simple',
    name: 'Combo Cheeseburger simple',
    description: 'Un medallón, doble cheddar + papas.',
    price: 12000,
    category: 'Combos',
    image: '/menu/CheeseSimple.png',
  },
  {
    id: 'combo-cheese-doble',
    name: 'Combo Cheeseburger doble',
    description: 'Doble medallón, triple cheddar, salsa Loot + papas.',
    price: 15000,
    category: 'Combos',
    image: '/menu/CheeseDoble.jpg',
  },
  {
    id: 'combo-american-simple',
    name: 'Combo American simple',
    description: 'Un medallón, doble cheddar, lechuga, tomate, cebolla grill + papas.',
    price: 13500,
    category: 'Combos',
    image: '/menu/AmericanSimple.png',
  },
  {
    id: 'combo-american-doble',
    name: 'Combo American doble',
    description: 'Doble medallón, triple cheddar, lechuga, tomate, cebolla grill + papas.',
    price: 16500,
    category: 'Combos',
    image: '/menu/AmericanDoble.jpg',
  },
  {
    id: 'combo-crispy-simple',
    name: 'Combo Crispy Bacon simple',
    description: 'Un medallón, doble cheddar, cebolla crispy, panceta ahumada + papas.',
    price: 16000,
    category: 'Combos',
    image: '/menu/CrispySimple.png',
  },
  {
    id: 'combo-crispy-doble',
    name: 'Combo Crispy Bacon doble',
    description: 'Doble medallón, triple cheddar, cebolla crispy, panceta ahumada + papas.',
    price: 19000,
    category: 'Combos',
    image: '/menu/CrispyDoble.jpg',
  },
  {
    id: 'combo-triple',
    name: 'Combo La Triple',
    description: 'Triple medallón, cuádruple cheddar, salsa Loot + papas.',
    price: 18000,
    category: 'Combos',
    image: '/menu/SecretMenu.png',
    badge: 'Secret Menu',
  },
  //Adicionales 
  {
    id: 'coca-cola',
    name: 'Coca Cola',
    description: 'Lata 354ml. El clásico acompañante de una buena burger.',
    price: 2700,
    category: 'Adicionales',
    image: '/menu/CocaComun.png',
    badge: 'Nuevo',
  },
  {
    id: 'coca-zero',
    name: 'Coca Cola Zero',
    description: 'Lata 354ml. El clásico acompañante de una buena burger.',
    price: 2700,
    category: 'Adicionales',
    image: '/menu/CocaZero.png',
    badge: 'Nuevo',
  },
  {
    id: 'papas',
    name: 'Porción de papas',
    description: 'Papas fritas crocantes, perfectas para acompañar.',
    price: 4000,
    category: 'Adicionales',
    image: '/menu/Papas.png',
  },
  {
    id: 'medallon',
    name: 'Un medallón de carne',
    description: 'Medallón de carne fresca, cocinado a la plancha.',
    price: 3000,
    category: 'Adicionales',
    image: '/menu/MedallonCarne.png',
  },
  {
    id: 'cheddar',
    name: 'Una feta de cheddar',
    description: 'Cheddar americano fundido, el clásico de Loot.',
    price: 1000,
    category: 'Adicionales',
    image: '/menu/FetaCheddar.jpg',
  },
  {
    id: 'panceta',
    name: 'Dos fetas de panceta ahumada',
    description: 'Panceta ahumada premium, crujiente y sabrosa.',
    price: 3000,
    category: 'Adicionales',
    image: '/menu/FetasPanceta.png',
  },
  {
    id: 'salsa-loot',
    name: 'Dip salsa Loot (50cc)',
    description: 'Nuestra salsa secreta con pepinillos en conserva. Adictiva.',
    price: 600,
    category: 'Adicionales',
    image: '/menu/SalsaLoot.png',
  },
]

const CATEGORIES: Category[] = ['Hamburguesas', 'Combos', 'Adicionales']

const CATEGORY_NOTES: Record<Category, React.ReactNode> = {
  Hamburguesas: <>Las burgers van solas. Para sumar papas, elegí un <strong>combo</strong> o agregalas en <strong>Adicionales</strong>.</>,
  Combos: <>Todos los combos traen <strong>papas fritas</strong>.</>,
  Adicionales: <>Ahora sumamos <strong>bebidas</strong>.</>,
}

function useMenuCart() {
  const { items, addToCart, updateQuantity } = useCart()

  return {
    getQuantity: (id: string) => items.find((i) => i.id === id)?.quantity ?? 0,
    add: (item: MenuItem) => addToCart(item),
    remove: (id: string) => updateQuantity(id, -1),
  }
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

function groupItems(items: MenuItem[]): MenuItem[][] {
  const map = new Map<string, MenuItem[]>()
  for (const item of items) {
    const key = item.group ?? item.id
    map.set(key, [...(map.get(key) ?? []), item])
  }
  return Array.from(map.values())
}

//Icons 
const iconProps = {
  viewBox: '0 0 24 24',
  className: 'h-5 w-5',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 3,
  strokeLinecap: 'round' as const,
  'aria-hidden': true,
}

function PlusIcon() {
  return (
    <svg {...iconProps}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  )
}

function MinusIcon() {
  return (
    <svg {...iconProps}>
      <path d="M5 12h14" />
    </svg>
  )
}

//Estilos
const CARD_BG = 'bg-[color-mix(in_srgb,var(--cream)_45%,white)]'
const HARD_SHADOW = 'shadow-[2px_2px_0_var(--brown)]'

//MenuRow
interface MenuRowProps {
  variants: MenuItem[]
  index: number
  getQuantity: (id: string) => number
  onAdd: (item: MenuItem) => void
  onRemove: (id: string) => void
}

function MenuRow({ variants, index, getQuantity, onAdd, onRemove }: MenuRowProps) {
  const [selectedIndex, setSelectedIndex] = useState(() => {
    const featured = variants.findIndex((v) => v.badge)
    return featured >= 0 ? featured : 0
  })

  const item = variants[selectedIndex]
  const quantity = getQuantity(item.id)
  const title = item.group ?? item.name
  const hasSizes = variants.length > 1
  const isSecret = item.badge === 'Secret Menu'

  const titleColor = isSecret ? 'var(--cream)' : 'var(--brown)'
  const descColor = isSecret ? 'color-mix(in srgb, var(--cream) 80%, transparent)' : 'var(--gray-text)'
  const priceColor = isSecret ? 'var(--cream)' : 'var(--red)'
  const borderClass = isSecret
    ? 'border-2 border-[color:var(--brown)]'
    : 'border border-[color:color-mix(in_srgb,var(--brown)_18%,transparent)]'

  const restShadow = isSecret
    ? 'shadow-[4px_4px_0_var(--red)]'
    : 'shadow-[0_8px_20px_-10px_color-mix(in_srgb,var(--brown)_40%,transparent)]'

  const hoverShadowColor = isSecret ? 'var(--red)' : 'var(--brown)'

  return (
    <li
      className={`menu-card menu-card-enter flex gap-3 rounded-3xl p-3 md:gap-4 md:p-4 ${borderClass} ${restShadow} ${isSecret ? 'bg-[var(--brown)]' : CARD_BG}`}
      style={{ animationDelay: `${index * 60}ms`, '--card-shadow': hoverShadowColor } as React.CSSProperties}
    >
      <div className="flex min-w-0 flex-1 flex-col">
        <h3 className="text-xl md:text-2xl leading-tight" style={{ fontFamily: 'var(--font-lilita)', color: titleColor }}>
          {title}
        </h3>

        <p className="mt-1 text-base leading-snug" style={{ fontFamily: 'var(--font-montserrat)', color: descColor }}>
          {item.description}
        </p>

        {/* Selector de tamaño: solo aparece si los ítems tienen `group` */}
        {hasSizes && (
          <div
            role="radiogroup"
            aria-label={`Tamaño de ${title}`}
            className="mt-2 inline-flex self-start rounded-full border-2 border-[color:var(--brown)] p-0.5 text-xs font-bold"
            style={{ fontFamily: 'var(--font-montserrat)' }}
          >
            {variants.map((v, i) => (
              <button
                key={v.id}
                type="button"
                role="radio"
                aria-checked={i === selectedIndex}
                onClick={() => setSelectedIndex(i)}
                className={`rounded-full px-3 py-1.5 transition-colors ${i === selectedIndex ? 'bg-[var(--red)] text-white' : 'text-[color:var(--brown)]'
                  }`}
              >
                {v.size}
              </button>
            ))}
          </div>
        )}

        <p className="mt-auto pt-2 text-lg font-bold" style={{ fontFamily: 'var(--font-montserrat)', color: priceColor }}>
          {formatPrice(item.price)}
        </p>
      </div>

      <div className="relative h-32 w-32 shrink-0 self-start md:h-40 md:w-40">
        <div className="relative h-full w-full overflow-hidden rounded-2xl bg-[var(--cream)]">
          <Image key={item.id} src={item.image} alt={item.name} fill sizes="(max-width: 768px) 224px, 256px" quality={95} className="menu-card-img object-cover" />
        </div>

        {item.badge && (
          <span
            className="absolute -left-2 -top-2 -rotate-3 rounded-full border-2 border-[color:var(--brown)] px-2 py-0.5 text-[11px] font-bold text-white"
            style={{ backgroundColor: 'var(--red)', fontFamily: 'var(--font-montserrat)' }}
          >
            {item.badge}
          </span>
        )}

        {quantity === 0 ? (
          <button
            id={`btn-add-${item.id}`}
            type="button"
            onClick={() => onAdd(item)}
            aria-label={`Agregar ${item.name} al pedido`}
            className={`absolute -bottom-2 -right-2 grid h-11 w-11 cursor-pointer place-items-center rounded-full border-2 border-[color:var(--brown)] bg-[var(--red)] text-white ${HARD_SHADOW} transition-transform active:translate-x-0.5 active:translate-y-0.5 active:shadow-none`}
          >
            <PlusIcon />
          </button>
        ) : (
          <div
            className={`absolute -bottom-2 -right-2 flex h-11 items-center rounded-full border-2 border-[color:var(--brown)] bg-[var(--red)] text-white ${HARD_SHADOW}`}
          >
            <button
              type="button"
              onClick={() => onRemove(item.id)}
              aria-label={quantity === 1 ? `Quitar ${item.name} del pedido` : `Sacar una unidad de ${item.name}`}
              className="grid h-full w-10 cursor-pointer place-items-center rounded-l-full transition-colors active:bg-[var(--brown)]/30"
            >
              <MinusIcon />
            </button>
            <span
              aria-live="polite"
              className="min-w-5 text-center text-lg leading-none"
              style={{ fontFamily: 'var(--font-lilita)' }}
            >
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => onAdd(item)}
              aria-label={`Agregar otra unidad de ${item.name}`}
              className="grid h-full w-10 cursor-pointer place-items-center rounded-r-full transition-colors active:bg-[var(--brown)]/30"
            >
              <PlusIcon />
            </button>
          </div>
        )}
      </div>
    </li>
  )
}

export default function MenuSection() {
  const [activeCategory, setActiveCategory] = useState<Category>('Hamburguesas')
  const { getQuantity, add, remove } = useMenuCart()

  const groups = groupItems(MENU_ITEMS.filter((item) => item.category === activeCategory))

  return (
    <section
      id="menu"
      className="px-4 pr-6 pb-28 pt-8 md:px-10 md:pb-28 md:pt-14 lg:px-20"
      style={{ backgroundColor: 'var(--cream)' }}
      aria-labelledby="menu-heading"
    >
      <div className="mx-auto max-w-5xl">
        <h2
          id="menu-heading"
          className="mb-2 text-center text-3xl md:mb-6 md:text-5xl"
          style={{ fontFamily: 'var(--font-lilita)', color: '#1e1e1e' }}
        >
          ¡Vení a Lootear!
        </h2>

        <div
          className="sticky z-20 -mx-4 -mr-6 px-4 py-2 md:mx-0 md:mr-0 md:px-0"
          style={{ top: 'var(--header-h, 64px)', backgroundColor: 'var(--cream)' }}
        >
          <div
            role="tablist"
            aria-label="Filtrar por categoría"
            className="flex justify-center gap-2 p-1"
          >
            {CATEGORIES.map((cat) => {
              const active = activeCategory === cat
              return (
                <button
                  key={cat}
                  id={`tab-${cat.toLowerCase()}`}
                  role="tab"
                  aria-selected={active}
                  aria-controls="menu-panel"
                  onClick={() => setActiveCategory(cat)}
                  className={`relative flex-1 md:flex-none cursor-pointer whitespace-nowrap rounded-full px-4 py-2 text-sm font-bold transition-colors duration-200 ${active ? 'tab-active' : 'tab-inactive'
                    }`}
                  style={{ fontFamily: 'var(--font-montserrat)' }}
                >
                  {cat}
                  {cat === 'Adicionales' && (
                    <span
                      aria-hidden="true"
                      className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full border-2"
                      style={{ backgroundColor: 'var(--red)', borderColor: 'var(--cream)' }}
                    />
                  )}
                </button>
              )
            })}
          </div>
        </div>

        <p
          className="mb-1 mt-2 text-center text-sm md:mb-4"
          style={{ fontFamily: 'var(--font-montserrat)', color: 'var(--gray-text)' }}
        >
          {CATEGORY_NOTES[activeCategory]}
        </p>

        <div id="menu-panel" role="tabpanel" aria-labelledby={`tab-${activeCategory.toLowerCase()}`}>
          <ul className="flex flex-col gap-4 md:grid md:grid-cols-2 md:gap-6">
            {groups.map((variants, i) => (
              <MenuRow
                key={variants[0].group ?? variants[0].id}
                variants={variants}
                index={i}
                getQuantity={getQuantity}
                onAdd={add}
                onRemove={remove}
              />
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}