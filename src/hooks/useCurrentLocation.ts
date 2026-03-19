import { useLocationStore } from "@/stores/locationStore";

export function useCurrentLocation() {
  const position = useLocationStore((state) => state.coords);

  const moveCurrentLocation = (map: kakao.maps.Map | null) => {
    if (!map) return;

    const center = new window.kakao.maps.LatLng(position.lat, position.lng);

    map.setCenter(center);
  };

  return { position, moveCurrentLocation };
}
