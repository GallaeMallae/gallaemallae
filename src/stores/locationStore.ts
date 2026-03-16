import { create } from "zustand";
import { Coordinates } from "@/types/common";

interface LocationState {
  coords: Coordinates;
  isDefaultLocation: boolean; // 기본 위치 사용 여부
  isInitialized: boolean; // 사용자 위치 초기화 여부
  setLocation: (
    latitude: number,
    longitude: number,
    isDefault?: boolean,
  ) => void;
  setInitialized: () => void;
}

export const useLocationStore = create<LocationState>((set) => ({
  // 기본 위치 : 서울특별시청
  coords: {
    latitude: 37.5663,
    longitude: 126.9779,
  },
  isDefaultLocation: true,
  isInitialized: false,

  setLocation: (latitude, longitude, isDefault = true) =>
    set({
      coords: {
        latitude,
        longitude,
      },
      isDefaultLocation: isDefault,
      isInitialized: true,
    }),

  setInitialized: () =>
    set({
      isInitialized: true,
    }),
}));
