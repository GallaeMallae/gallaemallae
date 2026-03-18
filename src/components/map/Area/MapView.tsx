"use client";

import { Map, MapMarker, Circle } from "react-kakao-maps-sdk";
import { useEffect } from "react";
import { MARKER_ICONS } from "@/lib/constants";
import { getDistance } from "@/utils/map/getDistance";
import { Category } from "@/types/common";

type Position = { lat: number; lng: number };

type Marker = {
  id: number | string;
  lat: number;
  lng: number;
  category: Category;
};

interface MapViewProps {
  position: Position | null;
  radius: number | null;
  markers: Marker[];
  setLocate: (map: kakao.maps.Map) => void;
  onMarkerClick: (id: string) => void;

  locate: kakao.maps.Map | null;
  onSelectCarousel:
    | {
        id: string;
        latitude: number | null;
        longitude: number | null;
      }
    | undefined;
}

export default function MapView({
  position,
  radius,
  markers,
  setLocate,
  onMarkerClick,
  locate,
  onSelectCarousel,
}: MapViewProps) {
  const filteredMarkers = position
    ? markers.filter(
        (m) =>
          radius === null ||
          getDistance(position.lat, position.lng, m.lat, m.lng) <= radius,
      )
    : [];

  useEffect(() => {
    if (!locate) return;
    if (!onSelectCarousel) return;

    if (onSelectCarousel.latitude == null || onSelectCarousel.longitude == null)
      return;

    const moveLatLng = new kakao.maps.LatLng(
      onSelectCarousel.latitude,
      onSelectCarousel.longitude,
    );

    locate.panTo(moveLatLng);
  }, [locate, onSelectCarousel]);

  return (
    <Map
      center={position ?? { lat: 37.49793, lng: 127.027596 }}
      style={{ width: "100%", height: "100%" }}
      level={3}
      onCreate={setLocate}
    >
      {position && <MapMarker position={position} />}

      {position && radius !== null && (
        <Circle
          center={position}
          radius={radius}
          strokeWeight={8}
          strokeColor="#0da3e4"
        />
      )}

      {filteredMarkers.map((m) => {
        const markerCategory = m.category === "all" ? "other" : m.category;

        return (
          <MapMarker
            key={`marker-${m.id}`}
            position={{ lat: m.lat, lng: m.lng }}
            image={{
              src: MARKER_ICONS[markerCategory],
              size: { width: 40, height: 40 },
            }}
            onClick={() => {
              onMarkerClick(String(m.id));
            }}
          />
        );
      })}
    </Map>
  );
}
