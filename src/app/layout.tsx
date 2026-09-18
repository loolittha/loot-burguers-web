import type { Metadata } from 'next'
import { Lilita_One, Montserrat } from 'next/font/google'
import './globals.css'

// ─── Fonts ────────────────────────────────────────────────────────────────────
const lilitaOne = Lilita_One({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-lilita',
  display: 'swap',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
})

// ─── Metadata ─────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: 'Loot Burgers — Las mejores hamburguesas de la zona',
  description:
    'Loot Burgers: smash burgers artesanales con medallones de carne, doble cheddar y la mejor salsa Loot. Pedí tu combo ahora.',
  keywords: ['hamburguesas', 'smash burger', 'loot burgers', 'combos', 'delivery'],
}

// ─── Layout ───────────────────────────────────────────────────────────────────
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="es"
      className={`${lilitaOne.variable} ${montserrat.variable}`}
    >
      <body className="min-h-screen antialiased">
        {children}
      </body>
    </html>
  )
}
