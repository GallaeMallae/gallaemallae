"use client";

import { Map, MapMarker, Circle } from "react-kakao-maps-sdk";
import { useEffect } from "react";
import KakaoMap from "@/components/common/KakaoMap";
import { MARKER_ICONS } from "@/lib/constants";
import { getDistance } from "@/utils/geo";
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
  const filteredMarkers =
    !center || radius === null
      ? markers
      : markers.filter(
          (m) => getDistance(center, { lat: m.lat, lng: m.lng }) <= radius,
        );

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
    <KakaoMap
      center={center ?? { lat: 37.49793, lng: 127.027596 }} // center로 바꾸면 됨
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
    </KakaoMap>
  );
}
