"use client";

import { Map, MapMarker, Circle } from "react-kakao-maps-sdk";
import { getDistance } from "@/utils/getDistance";

type Position = { lat: number; lng: number };

type Marker = {
  id: number;
  lat: number;
  lng: number;
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

      {filteredMarkers.map((m) => (
        <MapMarker key={m.id} position={{ lat: m.lat, lng: m.lng }} />
      ))}
    </Map>
  );
}
