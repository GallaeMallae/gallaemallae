"use client";

import { Map, MapMarker, Circle } from "react-kakao-maps-sdk";
import { MARKER_ICONS } from "@/lib/constants";
import { getDistance } from "@/utils/getDistance";
import { Category } from "@/types/common";

type Position = { lat: number; lng: number };

type Marker = {
  id: number;
  lat: number;
  lng: number;
  category: Category;
};

export default function MapView({
  position,
  radius,
  markers,
  setLocate,
}: {
  position: Position | null;
  radius: number | null;
  markers: Marker[];
  setLocate: (map: kakao.maps.Map) => void;
}) {
  const filteredMarkers = position
    ? markers.filter(
        (m) =>
          radius === null ||
          getDistance(position.lat, position.lng, m.lat, m.lng) <= radius,
      )
    : [];

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
            key={m.id}
            position={{ lat: m.lat, lng: m.lng }}
            image={{
              src: MARKER_ICONS[markerCategory],
              size: { width: 40, height: 40 },
            }}
          />
        );
      })}
    </Map>
  );
}
