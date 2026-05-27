"use client";

import {
  Waves,
  Wifi,
  Wind,
  Utensils,
  Coffee,
  Tv,
  Car,
  Flame,
  Sun,
  Sparkles,
  Dumbbell,
  Bath,
  Trees,
  Mountain,
  PawPrint,
  Wine,
  ChefHat,
  Headphones,
  Music,
  ShowerHead,
  Home,
  type LucideIcon,
} from "lucide-react";

const map: Record<string, LucideIcon> = {
  pool: Waves,
  infinity: Waves,
  plunge: Waves,
  cantilevered: Waves,
  sea: Mountain,
  view: Mountain,
  panoramic: Mountain,
  wifi: Wifi,
  air: Wind,
  conditioning: Wind,
  chef: ChefHat,
  dining: Utensils,
  bbq: Flame,
  fireplace: Flame,
  coffee: Coffee,
  tv: Tv,
  smart: Tv,
  cinema: Tv,
  parking: Car,
  sun: Sun,
  loungers: Sun,
  sauna: Bath,
  bath: Bath,
  shower: ShowerHead,
  garden: Trees,
  grove: Trees,
  beach: Waves,
  pet: PawPrint,
  wine: Wine,
  gym: Dumbbell,
  housekeeping: Sparkles,
  concierge: Sparkles,
  music: Music,
  hammock: Headphones,
};

export function getAmenityIcon(label: string): LucideIcon {
  const lower = label.toLowerCase();
  for (const key of Object.keys(map)) {
    if (lower.includes(key)) return map[key];
  }
  return Home;
}

export default function AmenityIcon({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  const Icon = getAmenityIcon(label);
  return <Icon className={className} />;
}
