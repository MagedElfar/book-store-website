"use client";

import L, { type LatLngExpression } from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import { MapPin, Search, Loader2, Navigation } from "lucide-react";
import { useDebounce } from 'minimal-shared/hooks';
import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import { toast } from 'react-toastify';

import { Button } from "@/shared/components/shadcn/button";
import { Input } from "@/shared/components/shadcn/input";
// eslint-disable-next-line import/order
import { Label } from "@/shared/components/shadcn/label";

import 'leaflet/dist/leaflet.css';

import { cn } from '@/shared/lib/utils';

const DefaultIcon = L.icon({
    iconUrl: (markerIcon as any).src || markerIcon,
    shadowUrl: (markerShadow as any).src || markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
});

interface MapPickerFieldProps {
    nameLat: string;
    nameLng: string;
    label?: string;
}

interface SearchResult {
    display_name: string;
    lat: string;
    lon: string;
}

export default function MapPickerField({ nameLat, nameLng, label }: MapPickerFieldProps) {
    const { setValue, watch, formState: { errors } } = useFormContext();
    const [isLoading, setIsLoading] = useState(false);
    const [searchOptions, setSearchOptions] = useState<SearchResult[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [query, setQuery] = useState("");
    const debouncedQuery = useDebounce(query, 600);

    const lat = watch(nameLat);
    const lng = watch(nameLng);

    const defaultCenter: LatLngExpression = [30.0444, 31.2357];
    const currentCenter: LatLngExpression = lat && lng ? [lat, lng] : defaultCenter;

    // --- Search Logic ---
    useEffect(() => {
        const fetchResults = async () => {
            if (!debouncedQuery || debouncedQuery.length < 3) {
                setSearchOptions([]);
                return;
            }
            setIsSearching(true);
            try {
                const response = await fetch(
                    `https://nominatim.openstreetmap.org/search?format=jsonv2&q=${encodeURIComponent(debouncedQuery)}&accept-language=en&limit=5`
                );
                const data = await response.json();
                setSearchOptions(data);
            } catch (error) {
                console.error("Search failed", error);
            } finally {
                setIsSearching(false);
            }
        };
        fetchResults();
    }, [debouncedQuery]);

    const reverseGeocode = async (latitude: number, longitude: number) => {
        setIsLoading(true);
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}&accept-language=en`
            );
            const data = await response.json();
            if (data.address) {
                const { country, city, town, village, road, suburb, house_number, neighbourhood } = data.address;
                setValue("country", country || "", { shouldDirty: true, shouldValidate: true });
                const cityValue = city || town || village || "";
                setValue("city", cityValue, { shouldDirty: true, shouldValidate: true });
                const streetParts = [road, neighbourhood, suburb, house_number].filter(Boolean);
                setValue("street_address", streetParts.join(", "), { shouldDirty: true, shouldValidate: true });
            }
        } catch (error) {
            console.error("Geocoding failed:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const updatePosition = (latitude: number, longitude: number) => {
        setValue(nameLat, latitude, { shouldValidate: true, shouldDirty: true });
        setValue(nameLng, longitude, { shouldValidate: true, shouldDirty: true });
        reverseGeocode(latitude, longitude);
        setSearchOptions([]); // Clear search list after selection
    };

    function MapController() {
        const map = useMap();
        useMapEvents({
            click(e) { updatePosition(e.latlng.lat, e.latlng.lng); },
        });

        useEffect(() => {
            if (lat && lng) {
                map.flyTo([lat, lng], 15);
            }
        }, [lat, lng, map]);

        return (lat && lng) ? <Marker position={[lat, lng]} icon={DefaultIcon} /> : null;
    }

    const handleLocateMe = () => {
        if (!navigator.geolocation) return;
        navigator.geolocation.getCurrentPosition(
            (position) => updatePosition(position.coords.latitude, position.coords.longitude),
            () => toast.error("GPS Error")
        );
    };

    const hasError = !!errors[nameLat] || !!errors[nameLng];

    return (
        <div className="w-full space-y-3">
            {/* Header Area */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    {label && <Label className="text-sm font-bold">{label}</Label>}
                    {isLoading && <Loader2 className="w-4 h-4 animate-spin text-primary" />}
                </div>
                <Button
                    variant="outline"
                    size="sm"
                    type="button"
                    className="flex items-center gap-2 h-8"
                    onClick={handleLocateMe}
                    disabled={isLoading}
                >
                    <Navigation className="w-3.5 h-3.5" />
                    Locate Me
                </Button>
            </div>

            {/* Custom Search Box (بديلاً لـ MUI Autocomplete) */}
            <div className="relative z-50">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                        placeholder="Search for an area..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="pl-9 pr-9"
                    />
                    {isSearching && <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 animate-spin text-muted-foreground" />}
                </div>

                {/* Dropdown Results */}
                {searchOptions.length > 0 && (
                    <div className="absolute w-full mt-1 bg-popover border rounded-md shadow-lg overflow-hidden z-[9999]">
                        {searchOptions.map((option, idx) => (
                            <button
                                key={idx}
                                type="button"
                                className="w-full px-4 py-2 text-sm text-left hover:bg-accent flex items-start gap-2 border-b last:border-0"
                                onClick={() => {
                                    updatePosition(parseFloat(option.lat), parseFloat(option.lon));
                                    setQuery(option.display_name);
                                }}
                            >
                                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-muted-foreground" />
                                <span>{option.display_name}</span>
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Map Area */}
            <div
                className={cn(
                    "h-[350px] w-full rounded-lg overflow-hidden border relative z-0",
                    hasError ? "border-destructive" : "border-border"
                )}
            >
                <MapContainer center={currentCenter} zoom={13} style={{ height: '100%', width: '100%' }}>
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <MapController />
                </MapContainer>
            </div>

            {/* Error Message */}
            {hasError && (
                <p className="text-xs font-medium text-destructive px-1">
                    {String(errors[nameLat]?.message || errors[nameLng]?.message)}
                </p>
            )}
        </div>
    );
}