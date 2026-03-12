"use client";

import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import { StaticImageData } from 'next/image';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';

const DefaultIcon = L.icon({
    iconUrl: (markerIcon as StaticImageData).src || (markerIcon as unknown as string),
    shadowUrl: (markerShadow as StaticImageData).src || (markerShadow as unknown as string),
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

interface Props {
    lat: number;
    lng: number;
    height?: string | number;
}

export default function MapDisplayView({ lat, lng, height = 200 }: Props) {
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
                <Marker position={[lat, lng]} icon={DefaultIcon} />
            </MapContainer>
        </div>
    );
}