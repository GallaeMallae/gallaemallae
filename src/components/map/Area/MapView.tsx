"use client";

import { MapMarker, Circle, MarkerClusterer } from "react-kakao-maps-sdk";
import { useEffect, useRef } from "react";
import KakaoMap from "@/components/common/KakaoMap";
import { MARKER_ICONS } from "@/lib/constants";
import { CategoryId } from "@/types/common";

type Position = { lat: number; lng: number };

type Marker = {
  id: number | string;
  lat: number;
  lng: number;
  category: CategoryId;
};

interface MapViewProps {
  center: Position | null;
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
  center,
  radius,
  markers,
  setLocate,
  onMarkerClick,
  locate,
  onSelectCarousel,
}: MapViewProps) {
  const filteredMarkers = markers;
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (!locate) return;
    if (!onSelectCarousel) return;

    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (onSelectCarousel.latitude == null || onSelectCarousel.longitude == null)
      return;

    const moveLatLng = new kakao.maps.LatLng(
      onSelectCarousel.latitude,
      onSelectCarousel.longitude,
    );

    locate.panTo(moveLatLng);
  }, [locate, onSelectCarousel]);

  return (
    <KakaoMap
      center={center ?? { lat: 37.49793, lng: 127.027596 }}
      level={7}
      onCreate={setLocate}
    >
      {center && <MapMarker position={center} />}

      {center && radius !== null && (
        <Circle
          center={center}
          radius={radius}
          strokeWeight={8}
          strokeColor="#0da3e4"
        />
      )}
      <MarkerClusterer averageCenter={true} minLevel={6}>
        {filteredMarkers.map((m) => {
          const markerCategory = m.category === "all" ? "etc" : m.category;

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
      </MarkerClusterer>
    </KakaoMap>
  );
}
