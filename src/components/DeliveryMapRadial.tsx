'use client'

// ─────────────────────────────────────────────────────────────────────────────
//  DeliveryMapRadial.tsx
//  Mapa de envíos con zonas RADIALES (círculos concéntricos desde el local).
//
//  Sistema alternativo a DeliveryMap.tsx (polígonos por barrio).
//  Activo en Carrito.tsx. Para volver al sistema de polígonos, reemplazá
//  el import en Carrito.tsx:
//    import DeliveryMapRadial → import DeliveryMap
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useCallback, useRef } from 'react'
import {
    GoogleMap,
    useJsApiLoader,
    Circle,
    Marker,
    Autocomplete,
} from '@react-google-maps/api'
import { RADIAL_ZONES, LOCAL_POSITION, MAX_KM } from '@/config/deliveryZonesRadial'

// ─── Haversine: distancia real entre dos puntos en la Tierra (en km) ──────────
function haversineKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
    const R = 6371
    const dLat = ((lat2 - lat1) * Math.PI) / 180
    const dLng = ((lng2 - lng1) * Math.PI) / 180
    const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLng / 2) ** 2
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

// Busca la zona correspondiente según distancia (de menor a mayor)
function getZoneByDistance(distKm: number) {
    for (const z of RADIAL_ZONES) {
        if (distKm <= z.maxKm) return z
    }
    return null // fuera del radio máximo
}

// ─── Constantes del mapa ──────────────────────────────────────────────────────
// Fuera del componente para evitar el warning de @react-google-maps/api
const LIBRARIES: ('places')[] = ['places']

const MAP_OPTIONS: google.maps.MapOptions = {
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false,
    zoomControl: true,
    clickableIcons: false,
    styles: [
        { featureType: 'poi', stylers: [{ visibility: 'off' }] },
        { featureType: 'transit', stylers: [{ visibility: 'off' }] },
        { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#f5f5f5' }] },
        { featureType: 'water', stylers: [{ color: '#c9e8f5' }] },
    ],
}

// Props  
interface DeliveryMapRadialProps {
    onAddressChange: (address: string, deliveryCost: number | null, outOfRange: boolean) => void
}

// Componente 
export default function DeliveryMapRadial({ onAddressChange }: DeliveryMapRadialProps) {
    const [userMarker, setUserMarker] = useState<{ lat: number; lng: number } | null>(null)
    const [selectedZone, setSelectedZone] = useState<typeof RADIAL_ZONES[0] | null>(null)
    const [distKm, setDistKm] = useState<number | null>(null)
    const [outOfRange, setOutOfRange] = useState(false)
    const [hasSelection, setHasSelection] = useState(false)

    const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null)
    const inputRef = useRef<HTMLInputElement | null>(null)
    const mapRef = useRef<google.maps.Map | null>(null)

    const { isLoaded, loadError } = useJsApiLoader({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? '',
        libraries: LIBRARIES,
        language: 'es',
        region: 'AR',
    })

    // Calcular distancia y asignar zona 
    const detectZone = useCallback((lat: number, lng: number, address: string) => {
        setUserMarker({ lat, lng })
        setHasSelection(true)
        mapRef.current?.panTo({ lat, lng })

        const dist = haversineKm(LOCAL_POSITION.lat, LOCAL_POSITION.lng, lat, lng)
        setDistKm(dist)

        const zone = getZoneByDistance(dist)
        if (zone) {
            setSelectedZone(zone)
            setOutOfRange(false)
            onAddressChange(address, zone.price, false)
        } else {
            setSelectedZone(null)
            setOutOfRange(true)
            onAddressChange(address, null, true)
        }
    }, [onAddressChange])

    // Autocomplado 
    const handlePlaceChanged = useCallback(() => {
        const place = autocompleteRef.current?.getPlace()
        if (!place?.geometry?.location) return
        const lat = place.geometry.location.lat()
        const lng = place.geometry.location.lng()
        const address = place.formatted_address ?? inputRef.current?.value ?? ''
        detectZone(lat, lng, address)
    }, [detectZone])

    // Click en el mapa: geocoding inverso 
    const handleMapClick = useCallback((e: google.maps.MapMouseEvent) => {
        if (!e.latLng) return
        const lat = e.latLng.lat()
        const lng = e.latLng.lng()

        const geocoder = new window.google.maps.Geocoder()
        geocoder.geocode(
            { location: { lat, lng }, region: 'ar' },
            (results: google.maps.GeocoderResult[] | null, status: string) => {
                const addr = status === 'OK' && results?.[0]
                    ? results[0].formatted_address
                    : `${lat.toFixed(5)}, ${lng.toFixed(5)}`
                if (inputRef.current) inputRef.current.value = addr
                detectZone(lat, lng, addr)
            }
        )
    }, [detectZone])

    // Limpiar selección 
    const handleClear = useCallback(() => {
        setUserMarker(null)
        setSelectedZone(null)
        setDistKm(null)
        setOutOfRange(false)
        setHasSelection(false)
        if (inputRef.current) inputRef.current.value = ''
        onAddressChange('', null, false)
    }, [onAddressChange])

    // Estados de carga/error
    if (loadError) {
        return (
            <div
                className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 text-center"
                style={{ fontFamily: 'var(--font-montserrat)' }}
            >
                No se pudo cargar Google Maps.
                <br />
                <span className="text-xs font-normal text-red-500">
                    Verificá tu API Key y que hayas agregado <code>localhost:3000</code> a las URLs permitidas en Google Cloud Console.
                </span>
            </div>
        )
    }

    if (!isLoaded) {
        return (
            <div
                className="w-full rounded-xl bg-neutral-100 flex flex-col items-center justify-center gap-2"
                style={{ height: '240px' }}
            >
                <div className="w-8 h-8 border-4 border-[var(--red)] border-t-transparent rounded-full animate-spin" />
                <span className="text-xs text-neutral-400" style={{ fontFamily: 'var(--font-montserrat)' }}>
                    Cargando mapa...
                </span>
            </div>
        )
    }

    // Render 
    return (
        <div className="space-y-3">

            {/* Campo de búsqueda con Autocomplado */}
            <Autocomplete
                onLoad={ac => { autocompleteRef.current = ac }}
                onPlaceChanged={handlePlaceChanged}
                options={{
                    componentRestrictions: { country: 'ar' },
                    fields: ['geometry', 'formatted_address'],
                }}
            >
                <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 text-base pointer-events-none">
                        📍
                    </span>
                    <input
                        ref={inputRef}
                        id="delivery-address-input"
                        type="text"
                        placeholder="Escribí tu dirección..."
                        className="w-full pl-9 pr-9 py-3 rounded-xl border border-neutral-300 focus:border-[var(--red)] outline-none text-sm bg-white"
                        style={{ fontFamily: 'var(--font-montserrat)' }}
                        onChange={e => { if (e.target.value === '') handleClear() }}
                    />
                    {hasSelection && (
                        <button
                            onClick={handleClear}
                            aria-label="Borrar dirección"
                            className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center text-neutral-400 hover:text-neutral-700 text-lg leading-none"
                        >
                            ×
                        </button>
                    )}
                </div>
            </Autocomplete>

            {/* Mapa con círculos */}
            <div className="rounded-xl overflow-hidden border border-neutral-200" style={{ height: '240px' }}>
                <GoogleMap
                    mapContainerStyle={{ width: '100%', height: '100%' }}
                    center={LOCAL_POSITION}
                    zoom={12}
                    options={MAP_OPTIONS}
                    onLoad={map => { mapRef.current = map }}
                    onClick={handleMapClick}
                >
                    {/* Círculos de zona — de mayor a menor */}
                    {[...RADIAL_ZONES].reverse().map(zone => (
                        <Circle
                            key={zone.maxKm}
                            center={LOCAL_POSITION}
                            radius={zone.maxKm * 1000}
                            options={{
                                fillColor: zone.color,
                                fillOpacity: 0.15,
                                strokeColor: zone.color,
                                strokeOpacity: 0.75,
                                strokeWeight: 2,
                                clickable: false,
                            }}
                        />
                    ))}

                    {/* Marcador del local*/}
                    <Marker
                        position={LOCAL_POSITION}
                        title="Loot Burguers"
                        zIndex={10}
                        icon={{
                            url:
                                'data:image/svg+xml;charset=UTF-8,' +
                                encodeURIComponent(`
                                    <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36">
                                        <circle cx="18" cy="18" r="16" fill="#c01a23" stroke="white" stroke-width="2"/>
                                        <text x="18" y="23" text-anchor="middle" fill="white" font-size="18">🍔</text>
                                    </svg>`),
                            scaledSize: new window.google.maps.Size(36, 36),
                        }}
                    />

                    {/* Marcador del cliente */}
                    {userMarker && (
                        <Marker
                            position={userMarker}
                            zIndex={9}
                            icon={{
                                url:
                                    'data:image/svg+xml;charset=UTF-8,' +
                                    encodeURIComponent(`
                                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="40" viewBox="0 0 28 40">
                                            <path d="M14 0C6.27 0 0 6.27 0 14c0 10.5 14 26 14 26S28 24.5 28 14C28 6.27 21.73 0 14 0z" fill="#c01a23"/>
                                            <circle cx="14" cy="14" r="6" fill="white"/>
                                        </svg>`),
                                scaledSize: new window.google.maps.Size(28, 40),
                                anchor: new window.google.maps.Point(14, 40),
                            }}
                        />
                    )}
                </GoogleMap>
            </div>

            {/* Leyenda de zonas */}
            {!hasSelection && (
                <div className="space-y-1">
                    <p
                        className="text-xs text-neutral-400 text-center"
                        style={{ fontFamily: 'var(--font-montserrat)' }}
                    >
                        Tocá el mapa o escribí tu dirección para ver el costo de envío
                    </p>
                    <div className="flex flex-wrap justify-center gap-2 pt-1">
                        {RADIAL_ZONES.map(z => (
                            <span
                                key={z.maxKm}
                                className="text-xs px-2 py-0.5 rounded-full font-medium"
                                style={{
                                    backgroundColor: z.color + '22',
                                    color: z.color,
                                    border: `1px solid ${z.color}55`,
                                    fontFamily: 'var(--font-montserrat)',
                                }}
                            >
                                {z.label} · ${z.price.toLocaleString('es-AR')}
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {/* Zona detectada */}
            {hasSelection && !outOfRange && selectedZone && (
                <div
                    className="flex items-center justify-between rounded-xl px-4 py-3 text-sm font-bold"
                    style={{
                        backgroundColor: selectedZone.color + '22',
                        border: `1.5px solid ${selectedZone.color}88`,
                        fontFamily: 'var(--font-montserrat)',
                        color: '#333',
                    }}
                >
                    <span>
                        <span style={{ color: selectedZone.color }}>●</span>
                        {' '}{selectedZone.label}
                        {distKm !== null && (
                            <span className="font-normal text-neutral-500 ml-1">
                                ({distKm.toFixed(1)} km)
                            </span>
                        )}
                    </span>
                    <span style={{ color: selectedZone.color }}>
                        Envío: ${selectedZone.price.toLocaleString('es-AR')}
                    </span>
                </div>
            )}

            {/* Fuera de zona */}
            {hasSelection && outOfRange && (
                <div
                    className="rounded-xl px-4 py-3 text-sm text-center"
                    style={{
                        backgroundColor: '#fff0f0',
                        border: '1.5px solid #f5b8bb',
                        fontFamily: 'var(--font-montserrat)',
                        color: '#c01a23',
                        fontWeight: 600,
                    }}
                >
                    Tu dirección queda a {distKm?.toFixed(1)} km fuera de nuestra cobertura.
                    <br />
                    <span className="font-normal text-xs text-neutral-500">
                        Realizamos envíos hasta {MAX_KM} km desde el local (Villa Rosa).
                    </span>
                </div>
            )}
        </div>
    )
}
