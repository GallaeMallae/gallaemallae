import { useEffect } from "react";
import { useLocationStore } from "@/stores/locationStore";

// 기본 위치 : 서울특별시청
const DEFAULT_LOCATION = {
  latitude: 37.5663,
  longitude: 126.9779,
};

export function useInitLocation() {
  const { isInitialized, setLocation } = useLocationStore();

  useEffect(() => {
    if (isInitialized) return;
    if (!navigator.geolocation) {
      setLocation(DEFAULT_LOCATION.latitude, DEFAULT_LOCATION.longitude);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setLocation(latitude, longitude);
      },
      () => {
        setLocation(DEFAULT_LOCATION.latitude, DEFAULT_LOCATION.longitude);
      },
      {
        timeout: 5000,
      },
    );
  }, [isInitialized, setLocation]);
}
