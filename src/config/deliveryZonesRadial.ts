export type RadialZone = {
    maxKm: number
    price: number
    color: string
    label: string
}

// Ubicación del local
export const LOCAL_POSITION = { lat: -34.4280415, lng: -58.8840664 }

// Radio máximo de entrega
export const MAX_KM = 7.5

export const RADIAL_ZONES: RadialZone[] = [
    { maxKm: 1.5, price: 1500, color: '#d4b800', label: 'Zona Amarilla' },
    { maxKm: 3.0, price: 2000, color: '#3a78c4', label: 'Zona Azul' },
    { maxKm: 4.5, price: 2500, color: '#3a8f3a', label: 'Zona Verde' },
    { maxKm: 6.0, price: 3000, color: '#d47d00', label: 'Zona Naranja' },
    { maxKm: 7.5, price: 4000, color: '#c01a23', label: 'Zona Roja' },
]
