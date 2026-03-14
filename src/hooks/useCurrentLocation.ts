import { useState, useEffect } from "react";

type Position = { lat: number; lng: number };

export function useCurrentLocation() {
  const [position, setPosition] = useState<Position | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      // 현재 위치 받을 수 없으면 서울 시청으로 이동
      (error) => {
        console.warn("Geolocation error:", error.message);
        setPosition({ lat: 37.566295, lng: 126.977945 });
      },
    );
  }, []);

  const moveCurrentLocation = (map: kakao.maps.Map | null) => {
    if (!navigator.geolocation || !map) return;

    if (typeof window === "undefined" || !window.kakao?.maps) {
      console.error("Kakao Maps SDK not loaded");
      return;
    }

    navigator.geolocation.getCurrentPosition((p) => {
      const newPosition = {
        lat: p.coords.latitude,
        lng: p.coords.longitude,
      };
      setPosition(newPosition);
      map.setCenter(
        new window.kakao.maps.LatLng(newPosition.lat, newPosition.lng),
      );
    });
  };
  return { position, moveCurrentLocation };
}
