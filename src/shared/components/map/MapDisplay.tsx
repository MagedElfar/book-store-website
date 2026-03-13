// src/shared/components/map/MapDisplay.tsx
"use client";

import L from 'leaflet';
import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';

// استيراد الـ CSS ضروري جداً
import 'leaflet/dist/leaflet.css';

// حل مشكلة الأيقونات في Leaflet مع Next.js بشكل احترافي
const DefaultIcon = typeof window !== 'undefined' ? L.icon({
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
}) : null;

interface Props {
    lat: number;
    lng: number;
    height?: string | number;
}

export default function MapDisplayView({ lat, lng, height = 200 }: Props) {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setIsMounted(true);

        return () => {
            setIsMounted(false);
        };
    }, []);

    if (!isMounted) {
        return <div style={{ height, width: '100%' }} className="bg-muted animate-pulse rounded-lg" />;
    }

    return (
        <div
            className="w-full overflow-hidden border rounded-lg border-border"
            style={{ height: height }}
        >
            <MapContainer
                center={[lat, lng]}
                zoom={15}
                scrollWheelZoom={false}
                doubleClickZoom={false}
                dragging={false}
                zoomControl={false}
                attributionControl={false}
                className="w-full h-full z-0"
            >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {DefaultIcon && <Marker position={[lat, lng]} icon={DefaultIcon} />}
            </MapContainer>
        </div>
    );
}