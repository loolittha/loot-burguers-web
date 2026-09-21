import type { Metadata } from 'next'
import { Lilita_One, Montserrat } from 'next/font/google'
import './globals.css'
import WhatsAppFloat from '@/components/WhatsAppFloat'

// Fuentes
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

// Metadata 
export const metadata: Metadata = {
  title: 'Loot Burgers',
  description:
    'Loot Burgers: smash burgers artesanales con medallones de carne, doble cheddar y la mejor salsa Loot. Pedí tu combo ahora.',
  keywords: ['hamburguesas', 'smash burger', 'loot burgers', 'combos', 'delivery'],
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

// Layout
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
        <WhatsAppFloat />
      </body>
    </html>
  )
}
