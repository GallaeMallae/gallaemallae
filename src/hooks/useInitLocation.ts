"use client";

import { useEffect } from "react";
import { useLocationStore } from "@/stores/locationStore";

export function useInitLocation() {
  const { isInitialized, setLocation, setInitialized } = useLocationStore();

  useEffect(() => {
    if (isInitialized) return;
    if (!navigator.geolocation) {
      setInitialized();
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setLocation(latitude, longitude, false);
      },
      () => {
        // 실패하면 기본 위치 그대로 사용
        setInitialized();
      },
      {
        timeout: 5000,
      },
    );
  }, [isInitialized, setLocation, setInitialized]);
}
