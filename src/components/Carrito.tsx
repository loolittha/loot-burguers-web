'use client'

import { useState, useEffect } from 'react'
import { useCart } from '@/context/CartContext'

export default function Carrito() {
    const [metodo, setMetodo] = useState<'envio' | 'retiro'>('envio')

    const { items, total, count, updateQuantity, isCartOpen, setIsCartOpen } = useCart()

    // Cierra el panel si el carrito queda vacío
    useEffect(() => {
        if (count === 0) setIsCartOpen(false)
    }, [count, setIsCartOpen])

    if (count === 0) return null

    const costoEnvio = 1800
    const totalFinal = metodo === 'envio' ? total + costoEnvio : total

    return (
        <>
            {/* ─── BARRA FLOTANTE INFERIOR ─── */}
            <div className={`fixed bottom-0 left-0 w-full bg-white border-t border-neutral-200 shadow-[0_-10px_30px_rgba(0,0,0,0.08)] z-40 px-6 py-4 flex justify-between items-center sm:px-10 ${isCartOpen ? 'hidden' : ''}`}>
                <div className="flex flex-col">
                    <span className="text-2xl sm:text-3xl leading-none tracking-wide" style={{ fontFamily: 'var(--font-lilita)', color: 'var(--red)' }}>
                        $ {total.toLocaleString('es-AR')}
                    </span>
                    <span className="text-xs sm:text-sm text-neutral-500 font-medium mt-1" style={{ fontFamily: 'var(--font-montserrat)' }}>
                        {count} {count === 1 ? 'producto' : 'productos'}
                    </span>
                </div>
                <button
                    onClick={() => setIsCartOpen(true)}
                    className="px-6 py-3 sm:px-8 sm:py-3.5 rounded-full font-black text-sm tracking-widest text-white transition-transform active:scale-95 shadow-md"
                    style={{ backgroundColor: 'var(--red)', fontFamily: 'var(--font-montserrat)' }}
                >
                    VER MI PEDIDO
                </button>
            </div>

            {/* ─── MODAL LATERAL ─── */}
            {isCartOpen && (
                <div className="fixed inset-0 z-50 flex items-end sm:items-stretch justify-end bg-black/40 backdrop-blur-sm transition-opacity" onClick={() => setIsCartOpen(false)}>
                    <div className="w-full sm:w-[450px] h-[92%] sm:h-full bg-white shadow-2xl flex flex-col rounded-tl-3xl rounded-tr-3xl sm:rounded-none" onClick={(e) => e.stopPropagation()}>
                        <CartPanel
                            metodo={metodo}
                            setMetodo={setMetodo}
                            items={items}
                            total={total}
                            costoEnvio={costoEnvio}
                            totalFinal={totalFinal}
                            updateQuantity={updateQuantity}
                            setIsCartOpen={setIsCartOpen}
                        />
                    </div>
                </div>
            )}
        </>
    )
}

// ─── Sub-componente con estado de formulario ───────────────────────────────────
function CartPanel({
    metodo, setMetodo, items, total, costoEnvio, totalFinal, updateQuantity, setIsCartOpen
}: {
    metodo: 'envio' | 'retiro'
    setMetodo: (m: 'envio' | 'retiro') => void
    items: { id: string; name: string; price: number; quantity: number }[]
    total: number
    costoEnvio: number
    totalFinal: number
    updateQuantity: (id: string, delta: number) => void
    setIsCartOpen: (v: boolean) => void
}) {
    const [nombre, setNombre] = useState('')
    const [direccion, setDireccion] = useState('')
    const [aclaraciones, setAclaraciones] = useState('')

    // Resetear dirección al cambiar de método
    const handleMetodo = (m: 'envio' | 'retiro') => {
        setMetodo(m)
        setDireccion('')
    }

    const canSubmit =
        metodo === 'envio'
            ? nombre.trim() !== '' && direccion.trim() !== ''
            : nombre.trim() !== ''

    return (
        <>
            <div className="flex items-center justify-between p-6 border-b border-neutral-100">
                <h2 className="text-3xl tracking-wide" style={{ fontFamily: 'var(--font-lilita)', color: 'var(--red)' }}>Tu pedido</h2>
                <button onClick={() => setIsCartOpen(false)} className="w-8 h-8 flex items-center justify-center bg-neutral-100 rounded-full text-neutral-600 hover:bg-neutral-200">
                    ✕
                </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-8" style={{ fontFamily: 'var(--font-montserrat)' }}>

                {/* Lista de productos */}
                <div className="space-y-4">
                    {items.map(item => (
                        <div key={item.id} className="flex justify-between items-center pb-4 border-b border-neutral-100">
                            <div>
                                <p className="font-bold text-neutral-900 text-sm">{item.name}</p>
                                <p className="text-neutral-500 text-sm mt-0.5">$ {item.price.toLocaleString('es-AR')}</p>
                            </div>
                            <div className="flex items-center gap-3 bg-neutral-50 px-2 py-1.5 rounded-full border border-neutral-200">
                                <button onClick={() => updateQuantity(item.id, -1)} className="w-6 h-6 flex items-center justify-center font-bold text-[var(--red)]">-</button>
                                <span className="font-bold text-sm text-neutral-800">{item.quantity}</span>
                                <button onClick={() => updateQuantity(item.id, 1)} className="w-6 h-6 flex items-center justify-center font-bold text-[var(--red)]">+</button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Selector Envío / Retiro */}
                <div>
                    <p className="font-bold text-sm mb-3 text-neutral-900">¿Cómo lo recibís?</p>
                    <div className="grid grid-cols-2 gap-3">
                        <button onClick={() => handleMetodo('envio')} className={`py-2.5 rounded-xl border-2 font-bold text-sm transition-all ${metodo === 'envio' ? 'border-[var(--red)] bg-red-50 text-[var(--red)]' : 'border-neutral-200 text-neutral-500'}`}>Envío</button>
                        <button onClick={() => handleMetodo('retiro')} className={`py-2.5 rounded-xl border-2 font-bold text-sm transition-all ${metodo === 'retiro' ? 'border-[var(--red)] bg-red-50 text-[var(--red)]' : 'border-neutral-200 text-neutral-500'}`}>Retiro</button>
                    </div>
                </div>

                {metodo === 'envio' && (
                    <div className="space-y-5 animate-fade-in">
                        <div>
                            <label className="block text-xs font-bold text-neutral-800 mb-1.5 uppercase">Tu nombre</label>
                            <input
                                type="text"
                                placeholder="Para saber de quién es el pedido"
                                value={nombre}
                                onChange={e => setNombre(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:border-[var(--red)] outline-none text-sm bg-white"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-neutral-800 mb-1.5 uppercase">Dirección</label>
                            <input
                                type="text"
                                placeholder="Calle, número, piso y depto"
                                value={direccion}
                                onChange={e => setDireccion(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:border-[var(--red)] outline-none text-sm bg-white"
                            />
                        </div>
                    </div>
                )}

                {metodo === 'retiro' && (
                    <div>
                        <label className="block text-xs font-bold text-neutral-800 mb-1.5 uppercase">Tu nombre</label>
                        <input
                            type="text"
                            placeholder="Para preparar tu pedido"
                            value={nombre}
                            onChange={e => setNombre(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:border-[var(--red)] outline-none text-sm bg-white"
                        />
                    </div>
                )}

                <div>
                    <label className="block text-xs font-bold text-neutral-800 mb-1.5 uppercase">Aclaraciones</label>
                    <textarea
                        placeholder="Sin cheddar, sin salsa, etc."
                        rows={2}
                        value={aclaraciones}
                        onChange={e => setAclaraciones(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-neutral-300 focus:border-[var(--red)] outline-none text-sm resize-none bg-white"
                    />
                </div>
            </div>

            <div className="p-6 border-t border-neutral-200 bg-neutral-50 pb-8">
                <div className="space-y-2 mb-5 text-sm font-medium" style={{ fontFamily: 'var(--font-montserrat)' }}>
                    <div className="flex justify-between text-neutral-600">
                        <span>Subtotal</span>
                        <span>$ {total.toLocaleString('es-AR')}</span>
                    </div>
                    {metodo === 'envio' && (
                        <div className="flex justify-between text-neutral-600">
                            <span>Envío</span>
                            <span>$ {costoEnvio.toLocaleString('es-AR')}</span>
                        </div>
                    )}
                    <div className="flex justify-between items-center pt-3 border-t border-neutral-200 mt-3">
                        <span className="text-2xl" style={{ fontFamily: 'var(--font-lilita)', color: 'var(--red)' }}>Total</span>
                        <span className="text-3xl" style={{ fontFamily: 'var(--font-lilita)', color: 'var(--red)' }}>$ {totalFinal.toLocaleString('es-AR')}</span>
                    </div>
                </div>

                {!canSubmit && (
                    <p className="text-center text-xs text-neutral-400 font-medium mb-3" style={{ fontFamily: 'var(--font-montserrat)' }}>
                        {metodo === 'envio'
                            ? 'Completá tu nombre y dirección para continuar'
                            : 'Completá tu nombre para continuar'}
                    </p>
                )}

                <button
                    disabled={!canSubmit}
                    className={`w-full py-4 rounded-full font-black text-sm text-white tracking-widest shadow-lg transition-all ${canSubmit
                            ? 'hover:scale-[1.02] cursor-pointer'
                            : 'opacity-40 cursor-not-allowed'
                        }`}
                    style={{ backgroundColor: 'var(--red)', fontFamily: 'var(--font-montserrat)' }}
                >
                    ENVIAR PEDIDO POR WHATSAPP
                </button>
            </div>
        </>
    )
}