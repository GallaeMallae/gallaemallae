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
  categories: CategoryId[];
};

interface MapViewProps {
  center: Position | null;
  radius: number | null;
  markers: Marker[];
  selectedCategory: CategoryId[];
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

function getMarkerCategory(
  categories: CategoryId[],
  selected: CategoryId[],
): Exclude<CategoryId, "all"> {
  if (!categories.length) return "etc";

  const safeCategories = categories.filter((c) => c !== "all");

  if (selected.includes("all")) {
    return (safeCategories[0] ?? "etc") as Exclude<CategoryId, "all">;
  }

  const match = safeCategories.find((c) => selected.includes(c));
  return (match ?? safeCategories[0] ?? "etc") as Exclude<CategoryId, "all">;
}

export default function MapView({
  center,
  radius,
  markers,
  selectedCategory,
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

      <MarkerClusterer
        averageCenter={true}
        minLevel={6}
        styles={[
          {
            width: "36px",
            height: "36px",
            background: "var(--color-symbol-sky)",
            borderRadius: "50%",
            color: "#fff",
            textAlign: "center",
            lineHeight: "36px",
            fontSize: "14px",
            fontWeight: "600",
            boxShadow: `
              0 0 0 4px #ffffff,   
              0 0 0 7px var(--color-symbol-sky) 
            `,
          },
        ]}
      >
        {filteredMarkers.map((m) => {
          const markerCategory = getMarkerCategory(
            m.categories,
            selectedCategory,
          );

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
