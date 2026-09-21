'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

type Product = {
    id: string
    name: string
    price: number
}

type CartItem = Product & { quantity: number }

type CartContextType = {
    items: CartItem[]
    addToCart: (product: Product) => void
    updateQuantity: (id: string, amount: number) => void
    total: number
    count: number
    isCartOpen: boolean
    setIsCartOpen: (open: boolean) => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([])
    const [isCartOpen, setIsCartOpen] = useState(false)

    const addToCart = (product: Product) => {
        setItems(prev => {
            const existing = prev.find(item => item.id === product.id)
            if (existing) {
                return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
            }
            return [...prev, { ...product, quantity: 1 }]
        })
    }

    const updateQuantity = (id: string, amount: number) => {
        setItems(prev => prev.map(item => {
            if (item.id === id) {
                const newQuantity = item.quantity + amount
                return { ...item, quantity: newQuantity }
            }
            return item
        }).filter(item => item.quantity > 0))
    }

    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const count = items.reduce((sum, item) => sum + item.quantity, 0)

    return (
        <CartContext.Provider value={{ items, addToCart, updateQuantity, total, count, isCartOpen, setIsCartOpen }}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => {
    const context = useContext(CartContext)
    if (!context) throw new Error('useCart debe usarse dentro de un CartProvider')
    return context
}