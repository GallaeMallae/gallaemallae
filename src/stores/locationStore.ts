import { create } from "zustand";
import { Coordinates } from "@/types/common";

interface LocationState {
  coords: Coordinates;
  isDefaultLocation: boolean; // 기본 위치 사용 여부
  isInitialized: boolean; // 사용자 위치 초기화 여부
  setLocation: (lat: number, lng: number, isDefault?: boolean) => void;
  setInitialized: () => void;
}

export const useLocationStore = create<LocationState>((set) => ({
  // 기본 위치 : 서울특별시청
  coords: {
    lat: 37.5663,
    lng: 126.9779,
  },
  isDefaultLocation: true,
  isInitialized: false,

  setLocation: (lat, lng, isDefault = true) =>
    set({
      coords: {
        lat,
        lng,
      },
      isDefaultLocation: isDefault,
      isInitialized: true,
    }),

  setInitialized: () =>
    set({
      isInitialized: true,
    }),
}));
